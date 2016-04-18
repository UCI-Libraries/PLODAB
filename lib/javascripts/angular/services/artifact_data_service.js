(function() {
  angular.module('plodab')
    .service('artifactDataService', function() {

    this.getArtifactData = function(callback, data) {
      console.log("in artifact service");
      var artifactStore = {};

      var promise = new Promise(
        function(resolve, reject) {
          makeArtifactData(data);
          resolve(artifactStore);
        }
      );
      callback(promise);


      function makeArtifactData(data) {
        var keys = Object.keys(data);
        keys.forEach( function(key) {
          console.log(key, data[key]);
        });
      }

      function placeArtifactsOnTimeline(artifacts, keys) {
        for (var i = 0; i < keys.length; i++) {
          var book = artifacts[keys[i]];
          var year = Number(artifacts[keys[i]].dateCreated.slice(0,4));
          var booknum = "book" + Object.keys(timelineStore[year]).length;
          timelineStore[year][booknum] = {
            name: book.titles[0],
            year: year,
            desc: book.descriptions[0],
            artist: book.agents[1].agent,
            subjects: book.subjects,
            materials: book.materials,
            techniques:book.techniques,
            calisphereUri: book.calisphereUri,
            imageURI: book.imageURI,
            place_of_publication: book.place_of_publication,
            img: "",
            key: "",
            selected: "false"
          };
        }
      }

    };

  });


})();
