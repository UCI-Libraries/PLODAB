(function() {
  angular.module('plodab')
    .service('dataService', function() {

    var filePath = "lib/data/2016.04.05_RDF_COMPLETE.xml";

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

        var subjectsLibrary = {
          "Cultural geography": ["Chiapas", "Chile", "Chinatown", "Hispanic American", "Latin America", "Maya", "Modern Latin American", "New York", "Oakland", "Oakland", "(Calif.)", "San Francisco Bay", "Tzotzil", "Tzotzil Indians--Mexico--Chiapas--Music", "Tzotzil women", "United States", "Washington"],

          "Culture": ["Address (culture-related concept)", "Birthday cards", "Birthdays", "Folklore in art", "Folktales"],

          "Environmental concepts": ["Aves (class)", "Bays (bodies of water)", "Birds in art", "Coastal environments", "Flower (motif)", "Fossil fuel", "Herbs", "Marine environments", "Marine pollution", "Mercury", "Mercury--Environmental aspects", "Oil spills--California--San Francisco Bay", "Panthera onca (species)", "Pollution", "Pollution in art", "Tankers (cargo vessels)"],

          "Experience": ["Daughters", "Johnson, Linda K. (Linda Karol)", "Journeys", "King, Susan Elizabeth, 1947-", "Left", "Melhorn-Boe, Lise, 1955-", "Milman, Barbara, 1941-", "Mothers", "Right", "Romero, Derli", "Telephone calls", "Telephones"],

          "Gender issues": ["Dresses (garments)", "Androgyny (Psychology)", "Art museums (institutions)", "Body image in art", "Children", "Children--Attitudes", "Clothing", "Clothing and dress in art", "Dress accessories--Pictorial works", "Fashion", "Fashion (concept)", "Feminism", "Feminism and the arts", "Gender identity in education", "Gender issues", "Girls", "Human behavior", "Identity", "Identity (Psychology) in children", "Lingerie", "Lingerie in art", "Mothers and daughters", "People by gender", "Perception", "Philosophical concepts and attitudes", "Picture postcards", "Postcards", "Postcards in art", "Pregnancy", "Pregnancy in art", "Pregnancy--Pictorial works", "Self-esteem in children", "Sex (biological characteristic)", "Sex differences (Psychology)", "Sex differences in education", "Sex discrimination", "Sex role", "T-shirts--Pictorial works", "Underwear", "Underwear and accessories for shaping and supporting", "Women", "Women (female humans)", "Women artists", "Women's clothing--Pictorial works"],

          "Language": ["Alphabet in art", "Aphorisms and apothegms", "Dialogues", "Epigrams", "Mayan language", "Sexism in language", "Structure (attributes)", "Words", "Words in art"],

          "Magic": ["Animals, Mythical, in art", "Charms", "Divination", "Incantations", "Magic", "Shamans", "Tarot", "Tarot in art", "Women shamans--Mexico--Chiapas"],

          "Music (performing arts)": ["Bands (ensembles)", "Ensembles (musical groups)", "Folk music--Mexico--Chiapas", "Marching bands--Mexico--Pictorial works", "Music in art"],

          "Politics": ["Activists", "America--History--Pictorial works", "Anti-war poetry", "Battles", "Battles in art", "Bombs (explosive weapons)", "Border art", "Border patrols", "Borderlands", "Borders (boundaries)", "Borders inspection stations", "Bush, George W. (George Walker), 1946-", "Capitalism", "Citizenship", "Civil rights", "Combat", "Credit", "Credit cards", "Crime prevention", "Death", "Deaths", "Dictators", "Dictatorships", "Disease", "Economic concepts", "Economic ideologies", "Economics", "Economy", "Emigration", "Emigration and immigration in art.", "Emigration and immigration--Political aspects.", "Executions (events)", "Freedom", "Globalism", "Government (political concept)", "HIV infections", "Hồ, Chí Minh,1890-1969.", "Human rights--Chile--History--20th century", "Humanism", "Immigration", "Imprisonment", "Income distribution", "Martyrs", "Memorials (monuments)", "Memorials--New York (State)--New York.", "Memorials--Washington (D.C.)", "Mexico--History--Pictorial works", "Migration (function)", "Military uniforms", "Military uniforms in art", "Money", "Nuclear bombs", "Nuclear warfare in art", "Nuclear wars", "Peace in art", "Pinochet Ugarte, Augusto.", "Police cars", "Police communication systems", "Police officers", "Police patrol--Surveillance operations", "Police-community relations", "Political art", "Political concepts", "Political participation--United States", "President. Executive Office of the President of the United States", "Protest movements--United States--History--21st century", "Protests", "Public opinion polls", "Public opinion--United States", "Shrapnel", "Southern Africa", "State of Palestine", "Stock exchanges", "Suicide bombers", "Suicides", "Surveillance cameras", "Terrorism", "War in art", "Wealth", "World politics--Poetry"],

          "Religions (belief systems, cultures)": ["Alms", "Beggars", "Buddhism (main entry)", "Gratitude in art", "Monks", "Saints"],

          "Violence": ["Family violence--Poetry", "Psychological abuse--Poetry", "Rape--Poetry.", "Violence"]
        };

        var agentClasses = ["activists", "artists' collectives", "artists (visual artists)", "authors", "bookbinders", "contributors", "illustrators",  "photographers", "printers (people)", "publishers","repositories (institutions)", "sponsors", "translators"];

        // returns all the Calisphere keys and corresponding images
        var books = store.statementsMatching(undefined, VRA("imageOf"), undefined);

        // seed for artifact store
        for (var m=0; m < books.length; m++) {
            book = books[m];
            var key = book.object.uri;
            artifacts[key] = {};
            artifacts[key].agents = {};
            artifacts[key].artifactKey = key;
            artifacts[key].culturalContext = [];
            artifacts[key].dateCreated = "undefined";
            artifacts[key].descriptions = [];
            artifacts[key].imageURI = "";
            artifacts[key].materials = [];
            artifacts[key].place_of_publication = [];
            artifacts[key].subjects = [];
            artifacts[key].techniques = [];
            artifacts[key].titles = [];
            allKeys.push(key);
        }


        // fetchAgents relies on a local store of all of the agentClasses that are contained in the metadata collection. It's possible that if the collection was ordered differently this method would entirely breakdown.

        // TODO: make the store of agent classes agnostic by compiling that list by querying the store directly to pull in roles /
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

        function fetchImageURI(key) {
          var resource = store.any($rdf.sym(key), VRA("copyOf") , undefined);
          artifacts[key].imageURI = resource.uri.slice(15,40);
        }

        function fetchLocations(key) {
          var resource = store.statementsMatching($rdf.sym(key), VRA("placeOfPublication") , undefined);
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
              var filteredSubject = sortedSubject(upcaseSubject);
              if (!artifacts[this.key].subjects.includes(filteredSubject)) {
                artifacts[this.key].subjects.push(filteredSubject);
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

          function sortedSubject(subject) {
            var subjectKeys = Object.keys(subjectsLibrary);
            var filteredSubject = subject;
            subjectKeys.forEach( function(superSubject) {
              if (subjectsLibrary[superSubject].includes(subject)) {
                filteredSubject = superSubject;
              }
            });
            return filteredSubject;
          }

        allKeys.forEach(fetchAgents);
        allKeys.forEach(fetchCulturalContext);
        allKeys.forEach(fetchDescriptions);
        allKeys.forEach(fetchImageURI);
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
