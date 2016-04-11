(function() {
  angular.module('plodab')
    .service('bubbleDataService', function() {

    this.getBubbleData = function(callback, data) {
      console.log("this exists");

      var subjectStore = {};

      var promise = new Promise(
        function(resolve, reject) {
          makeBubbleData(data);
          resolve(subjectStore);
        }
      );
      callback(promise);


      function makeBubbleData(data) {
        var keys = Object.keys(data);
        console.log("in here", data, keys);
        // Object.keys(timelineStore).forEach(pushTimelineToChart);
      }

      // function pushTimelineToChart(key) {
      //   timelineData.push(timelineStore[key]);
      // }

    };

  });


})();
