(function() {
  angular.module('plodab')
    .service('dataService', function() {

    var filePath = "/lib/data/2016.04.05_RDF_COMPLETE_EM_edits.xml";

    this.getData = function(callback) {
      var RDF = $rdf.Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
      var VRA = $rdf.Namespace("http://purl.org/vra/");
      var RDFS = $rdf.Namespace("http://www.w3.org/2000/01/rdf-schema#");
      var DC = $rdf.Namespace("http://purl.org/dc/terms/");

      var artifacts = {};
      var allKeys = [];

      var uri = "";

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            var promise = new Promise(
              function(resolve, reject) {
                parseData(xhttp);
                resolve(artifacts);
              }
            );
            callback(promise);
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
                if (location && location.object) {
                  var locName = store.statementsMatching($rdf.sym(location.object.uri), undefined , undefined);
                  var placeName = locName[1].object.value;
                  if (placeName[0] === "[") {
                    artifacts[key].place_of_publication.push(placeName.slice(1,placeName.length -1));
                  } else {
                    artifacts[key].place_of_publication.push(placeName);
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
              }
          }

          function logMaterial(element, index, array) {
            if (element.object.value) {
              var upcaseMaterial = capitalizeFirstLetter(element.object.value);
              if (!artifacts[this.key].materials.includes(upcaseMaterial)) {
                artifacts[this.key].materials.push(upcaseMaterial);
              }
            }
          }

          function logSubject(element, index, array) {
            if (element.object.value) {
              var upcaseSubject = capitalizeFirstLetter(element.object.value);
              if (!artifacts[this.key].subjects.includes(upcaseSubject)) {
                artifacts[this.key].subjects.push(upcaseSubject);
              }
            }
          }

          function logTechnique(element, index, array) {
            if (element.object.value) {
              var upcaseTechnique = capitalizeFirstLetter(element.object.value);
              if (!artifacts[this.key].techniques.includes(upcaseTechnique)) {
                artifacts[this.key].techniques.push(upcaseTechnique);
              }
            }
          }

        allKeys.forEach(fetchAgents);
        allKeys.forEach(fetchCulturalContext);
        allKeys.forEach(fetchDescriptions);
        allKeys.forEach(fetchLocations);
        allKeys.forEach(fetchMaterials);
        allKeys.forEach(fetchSubjects);
        allKeys.forEach(fetchTechniques);
        allKeys.forEach(fetchTitles);
        allKeys.forEach(fetchYears);
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
    };

  });


})();
