(function() {
  angular.module('plodab')
    .service('bubbleDataService', function() {

    this.getBubbleData = function(callback, data) {
      var topicsStore = {};
      topicsStore.subjects = [];
      topicsStore.materials = [];
      topicsStore.techniques = [];
      topicsStore.place_of_publication = [];

      var materialsStore = {};
      var techniquesStore = {};
      var placeOfPublicationStore = {};
      var subjectsStore = {};

      var promise = new Promise(
        function(resolve, reject) {
          makeBubbleData(data);
          resolve(topicsStore);
        }
      );
      callback(promise);

      function compileTopics(store) {
        if (store[Object.keys(store)[0]].topic === "Subjects") {
          Object.keys(store).forEach( function(key) {
            topicsStore.subjects.push(store[key]);
          });
        } else if (store[Object.keys(store)[0]].topic === "Materials") {
          Object.keys(store).forEach( function(key) {
            topicsStore.materials.push(store[key]);
          });
        } else if (store[Object.keys(store)[0]].topic === "Techniques") {
          Object.keys(store).forEach( function(key) {
            topicsStore.techniques.push(store[key]);
          });
        } else if (store[Object.keys(store)[0]].topic === "Place of Publication") {
          Object.keys(store).forEach( function(key) {
            topicsStore.place_of_publication.push(store[key]);
          });
        }
      }

      function makeBubbleData(data) {
        Object.keys(data).forEach(logTopics);
        [subjectsStore, materialsStore, techniquesStore, placeOfPublicationStore].forEach(compileTopics);
      }

      function logTopics(key) {
        logMaterials(data[key].materials);
        logPlaceOfPublication(data[key].place_of_publication);
        logSubjects(data[key].subjects);
        logTechniques(data[key].techniques);
      }

      function logMaterials(arr) {
        arr.forEach( function(el) {
          if (materialsStore[el]) {
            materialsStore[el].count = materialsStore[el].count + 1;
          } else {
            materialsStore[el] = {topic: "Materials", name: el, count: 1};
          }
        });
      }

      function logPlaceOfPublication(arr) {
        arr.forEach( function(el) {
          if (placeOfPublicationStore[el]) {
            placeOfPublicationStore[el].count = placeOfPublicationStore[el].count + 1;
          } else {
            placeOfPublicationStore[el] = {topic: "Place of Publication", name: el, count: 1};
          }
        });
      }

      function logSubjects(arr) {
        arr.forEach( function(el) {
          if (subjectsStore[el]) {
            subjectsStore[el].count = subjectsStore[el].count + 1;
          } else {
            subjectsStore[el] = {topic: "Subjects", name: el, count: 1};
          }
        });
      }

      function logTechniques(arr) {
        arr.forEach( function(el) {
          if (techniquesStore[el]) {
            techniquesStore[el].count = techniquesStore[el].count + 1;
          } else {
            techniquesStore[el] = {topic: "Techniques", name: el, count: 1};
          }
        });
      }


    };

  });


})();
