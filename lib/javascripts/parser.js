
var RDF = $rdf.Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
var VRA = $rdf.Namespace("http://purl.org/vra/");
var RDFS = $rdf.Namespace("http://www.w3.org/2000/01/rdf-schema#");
var DC = $rdf.Namespace("http://purl.org/dc/terms/");
// var XSD = $rdf.Namespace("http://www.w3.org/2001/XMLSchema#");

var artifacts = {};
var allKeys = [];
var subjectsStore = {};
var agentsStore = {};
var techniquesStore = {};
var materialsStore = {};
var placeOfPublicationStore = {};
var culturalContextStore = {};
var timelineStore = {};

var filePath = "/lib/data/2016.04.05_RDF_COMPLETE_EM_edits.xml";
var uri = "";

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var p = new Promise(
        function(resolve, reject) {
          parseData(xhttp);
          resolve(artifacts);
        });
        p.then(
            function(val) {
              console.log("Data parsed");
              makeTimelineData(val);
            })
            .catch(
                function(reason) {
                console.log(reason);
                });

    }
};
xhttp.open("GET", filePath, true);
xhttp.send();

function parseData(xml) {
  var body = xml.responseText;
  var mimeType = 'application/rdf+xml';
  var store = $rdf.graph();

  try {
      $rdf.parse(body, store, uri, mimeType);
  } catch (err) {
      console.log(err);
  }


  var agentClasses = ["activists", "artists' collectives", "artists (visual artists)", "authors", "bookbinders", "contributors", "illustrators",  "photographers", "printers (people)", "publishers","repositories (institutions)", "sponsors", "translators"];

  // returns all the Calisphere keys and corresponding images
  var books = store.statementsMatching(undefined, VRA("imageOf"), undefined);

  // seed for artifact store
  for (var m=0; m < books.length; m++) {
      book = books[m];
      var key = book.object.uri;
      artifacts[key] = {};
      artifacts[key].agents = {};
      artifacts[key].calisphereUri = key;
      artifacts[key].culturalContext = [];
      artifacts[key].dateCreated = "undefined";
      artifacts[key].descriptions = [];
      artifacts[key].imageURI = book.subject.uri;
      artifacts[key].materials = [];
      artifacts[key].place_of_publication = [];
      artifacts[key].subjects = [];
      artifacts[key].techniques = [];
      artifacts[key].titles = [];
      allKeys.push(key);
  }


  // fetchAgents relies on a local store of all of the agentClasses that are contained in the metadata collection. It's possible that if the collection was ordered differently this method would entirely breakdown.

  // TODO: make the store of agent classes agnostic by compiling that list by querying the store directly to pull in roles/
  function fetchAgents(key) {
    var resourceAgent = store.statementsMatching($rdf.sym(key), VRA("creator") , undefined);
    var agentCount = 0;
    for (var i=0; i < resourceAgent.length; i++) {
        res = resourceAgent[i];
        var agentsName = store.statementsMatching($rdf.sym(res.object.uri), VRA("name"), undefined);
        if (agentsName[0]) {
          if (!agentClasses.includes(agentsName[0].object.value)) {
            agentCount = agentCount + 1;
            artifacts[key].agents[agentCount] = {};
            artifacts[key].agents[agentCount].agent = agentsName[0].object.value;
            artifacts[key].agents[agentCount].agentType = [];
          } else {
            artifacts[key].agents[agentCount].agentType.push(agentsName[0].object.value);
          }
        }
      }
  }

  function fetchCulturalContext(key) {
    var resource = store.statementsMatching($rdf.sym(key), VRA("culturalContext") , undefined);
    for (var i=0; i < resource.length; i++) {
        res = resource[i];
        var locName = store.statementsMatching($rdf.sym(res.object.uri), undefined, undefined);
        if (locName.length > 0) {
          artifacts[key].culturalContext.push(locName[0].object.value);
          logCulturalContext(locName[0].object.value);
        }
      }
  }

  function fetchDescriptions(key) {
    var resource = store.statementsMatching($rdf.sym(key), VRA("description") , undefined);
    for (var i=0; i < resource.length; i++) {
        res = resource[i];
        artifacts[key].descriptions.push(res.object.value);
      }
  }

  function fetchLocations(key) {
    var resource = store.statementsMatching($rdf.sym(key), VRA("placeOfPublication") , undefined);
    // console.log(resource);
    for (var i=0; i < resource.length; i++) {
        res = resource[i];
        var locDetail = store.statementsMatching($rdf.sym(res.object.uri), VRA("containedIn") , undefined);
        for (var j=0; j < resource.length; j++) {
          var location = locDetail[j];
          // console.log(location, locDetail, j);
          if (location && location.object) {
            var locName = store.statementsMatching($rdf.sym(location.object.uri), undefined , undefined);
            var placeName = locName[1].object.value;
            // console.log(locName[1].object.value, key);
            artifacts[key].place_of_publication.push(placeName);
            if (placeOfPublicationStore[placeName]) {
              placeOfPublicationStore[placeName].count = placeOfPublicationStore[placeName].count + 1;
            } else {
              placeOfPublicationStore[placeName] = {topic: "PlaceOfPublication", name: placeName, count: 1};
            }
          }
        }
      }
  }

  function fetchMaterials(key) {
    var resource = store.statementsMatching($rdf.sym(key), VRA("material") , undefined);
    for (var i=0; i < resource.length; i++) {
        res = resource[i];
        var materialsDetail = store.statementsMatching($rdf.sym(res.object.uri), undefined, undefined);
        this.key = key;
        materialsDetail.forEach(logMaterial, this);
      }
  }

  function fetchSubjects(key) {
    var resource = store.statementsMatching($rdf.sym(key), VRA("about") , undefined);
    for (var i=0; i < resource.length; i++) {

        res = resource[i];
        var subjectsDetail = store.statementsMatching($rdf.sym(res.object.uri), undefined, undefined);
        this.key = key;
        subjectsDetail.forEach(logSubject, this);
      }
    }

    function fetchTechniques(key) {
      var resource = store.statementsMatching($rdf.sym(key), VRA("hasTechnique") , undefined);
      for (var i=0; i < resource.length; i++) {

          res = resource[i];

          // each detail is a collection that includes a literal and statements from various ontologies describing what that literal represents.
          var techniquesDetail = store.statementsMatching($rdf.sym(res.object.uri), undefined, undefined);
          this.key = key;
          techniquesDetail.forEach(logTechnique, this);
        }
    }

    function fetchTitles(key) {
      var titles = store.statementsMatching($rdf.sym(key), VRA("name") , undefined);
      for (var l=0; l < titles.length; l++) {
          title = titles[l].object.value;
          artifacts[key].titles.push(title);
      }
    }

    function fetchYears(key) {
      var resource = store.statementsMatching($rdf.sym(key), VRA("dateCreated") , undefined);
      for (var i=0; i < resource.length; i++) {
          res = resource[i];
          var year = res.object.value;
          artifacts[key].dateCreated = year;
          // console.log(artifacts[key].dateCreated);
        }
    }

    function logCulturalContext(value) {
      var upcaseCulturalContext = capitalizeFirstLetter(value);
      if (culturalContextStore[upcaseCulturalContext]) {
        culturalContextStore[upcaseCulturalContext].count = culturalContextStore[upcaseCulturalContext].count + 1;
      } else {
        culturalContextStore[upcaseCulturalContext] = {topic: "place_of_publicationç", name: upcaseCulturalContext, count: 1};
      }
    }

    function logMaterial(element, index, array) {
      if (element.object.value) {
        var upcaseMaterial = capitalizeFirstLetter(element.object.value);
        if (!artifacts[this.key].materials.includes(upcaseMaterial)) {
          artifacts[this.key].materials.push(upcaseMaterial);
          if (materialsStore[upcaseMaterial]) {
            materialsStore[upcaseMaterial].count = materialsStore[upcaseMaterial].count + 1;
          } else {
            materialsStore[upcaseMaterial] = {topic: "Materials", name: upcaseMaterial, count: 1};
          }
        }
      }
    }

    function logSubject(element, index, array) {
      if (element.object.value) {
        var upcaseSubject = capitalizeFirstLetter(element.object.value);
        if (!artifacts[this.key].subjects.includes(upcaseSubject)) {
          artifacts[this.key].subjects.push(upcaseSubject);
          if (subjectsStore[upcaseSubject]) {
            subjectsStore[upcaseSubject].count = subjectsStore[upcaseSubject].count + 1;
          } else {
            subjectsStore[upcaseSubject] = {topic: "Subjects", name: upcaseSubject, count: 1};
          }
        }
      }
    }

    function logTechnique(element, index, array) {
      if (element.object.value) {
        var upcaseTechnique = capitalizeFirstLetter(element.object.value);
        if (!artifacts[this.key].techniques.includes(upcaseTechnique)) {
          artifacts[this.key].techniques.push(upcaseTechnique);
          if (techniquesStore[upcaseTechnique]) {
            techniquesStore[upcaseTechnique].count = techniquesStore[upcaseTechnique].count + 1;
          } else {
            techniquesStore[upcaseTechnique] = {topic: "Techniques", name: upcaseTechnique, count: 1};
          }
        }
      }
    }



  // TODO: generalize these methods - they're the same with one variable.
  allKeys.forEach(fetchSubjects);
  // allKeys.forEach(fetchTechniques);
  allKeys.forEach(fetchMaterials);

  allKeys.forEach(fetchLocations);

  // self contained methods that compile records without relying on other log functions
  allKeys.forEach(fetchAgents);
  allKeys.forEach(fetchCulturalContext);
  allKeys.forEach(fetchDescriptions);
  allKeys.forEach(fetchTitles);
  allKeys.forEach(fetchYears);

    var p1 = new Promise(
      // The resolver function is called with the ability to resolve or
      // reject the promise
      function(resolve, reject) {
        allKeys.forEach(fetchTechniques);
        resolve(techniquesStore);
      });
      p1.then(
          // Log the fulfillment value
          function(val) {
              Object.keys(val).forEach(makeTechniquesBubbleChartData);
          })
          .catch(
              function(reason) {
              console.log(reason);
              });

  Object.keys(subjectsStore).forEach(makeSubjectsBubbleChartData);
  Object.keys(materialsStore).forEach(makeMaterialsBubbleChartData);
  Object.keys(placeOfPublicationStore).forEach(makePlaceOfPublicationBubbleChartData);

  function makeSubjectsBubbleChartData(key, store) {
    // TODO: set this part up to run on page load
    dataSets.subjects.push(subjectsStore[key]);
  }

  function makeTechniquesBubbleChartData(key, store) {
    // TODO: set this part up to run on page load
    // console.log(dataSets);
    dataSets.techniques.push(techniquesStore[key]);
  }

  function makeMaterialsBubbleChartData(key, store) {
    // TODO: set this part up to run on page load
    // console.log(dataSets);
    // console.log(materialsStore[key]);

    dataSets.materials.push(materialsStore[key]);
  }

  function makePlaceOfPublicationBubbleChartData(key, store) {
    // TODO: set this part up to run on page load
    dataSets.place_of_publication.push(placeOfPublicationStore[key]);
  }

}

function makeTimelineData(artifacts) {
  var earliestYear, latestYear;
  var keys = Object.keys(artifacts);
  // console.log("in here", artifacts, keys);
  earliestYear = Number(getEarliestYear(keys, artifacts));
  latestYear = Number(getLatestYear(keys, artifacts));
  for (var i = earliestYear; i <= latestYear; i++) {
    timelineStore[i] = {year: i};
  }
  placeArtifactsOnTimeline(artifacts, keys);
  dataSets.timeline = [];
  Object.keys(timelineStore).forEach(pushTimelineToChart);
}

function pushTimelineToChart(key) {
  // TODO: set this part up to run on page load
  dataSets.timeline.push(timelineStore[key]);
}


function getLatestYear(keys, artifacts) {
  var latestYear = 2015;
  for ( var i=0; i < keys.length; i++) {
    // year is clipped to a 4 char element, because some of the "dateCreated" fields come in as a range, and we only want the object be represented on the timeline in one place.
    var year = artifacts[keys[i]].dateCreated.slice(0,4);
    if (latestYear < year) {
      latestYear = year;
    }
  }
  return latestYear;
}

function getEarliestYear(keys, artifacts) {
  var earliestYear = 1981;
  for ( var i=0; i < keys.length; i++) {
    // year is clipped to a 4 char element, because some of the "dateCreated" fields come in as a range, and we only want the object be represented on the timeline in one place.
    var year = artifacts[keys[i]].dateCreated.slice(0,4);
    if (earliestYear > year) {
      earliestYear = year;
    }
  }
  return earliestYear;
}

function placeArtifactsOnTimeline(artifacts, keys) {
  for (var i = 0; i < keys.length; i++) {
    var book = artifacts[keys[i]];
    var year = Number(artifacts[keys[i]].dateCreated.slice(0,4));
    var booknum = "book" + Object.keys(timelineStore[year]).length;
    // console.log(book);
    timelineStore[year][booknum] = {
      name: book.titles[0],
      desc: book.descriptions[0],
      artist: book.agents[1].agent,
      img: "",
      key: "",
      selected: "false"
    };
  }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

includes = function(k) {
  for(var i=0; i < this.length; i++){
    if( this[i] === k || ( this[i] !== this[i] && k !== k ) ){
      return true;
    }
  }
  return false;
};

Array.prototype.includes = includes;
