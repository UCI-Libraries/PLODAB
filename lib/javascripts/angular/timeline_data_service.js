(function() {
  angular.module('plodab')
    .service('timelineDataService', function() {

    this.getTimelineData = function(callback, data) {
      var timelineStore = {};
      var timelineData = [];

      var promise = new Promise(
        function(resolve, reject) {
          makeTimelineData(data);
          resolve(timelineData);
        }
      );
      callback(promise);


      function makeTimelineData(data) {
        var earliestYear, latestYear;
        var keys = Object.keys(data);
        earliestYear = Number(getEarliestYear(keys, data));
        latestYear = Number(getLatestYear(keys, data));
        for (var i = earliestYear; i <= latestYear; i++) {
          timelineStore[i] = {year: i};
        }
        placeArtifactsOnTimeline(data, keys);
        Object.keys(timelineStore).forEach(pushTimelineToChart);
      }

      function pushTimelineToChart(key) {
        timelineData.push(timelineStore[key]);
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

    };

  });


})();
