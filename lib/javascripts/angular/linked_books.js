(function() {

  angular.module('plodab')
    .controller('chartctrl', ['$scope', '$timeout', 'dataService', 'timelineDataService', 'bubbleDataService', function ($scope, $timeout, dataService, timelineDataService, bubbleDataService) {

      init();
      var bookData, bubbleChartDataStore;

      function init() {
        $scope.dataHasLoaded = false;
        $scope.timelineData = [];
        $scope.bubbleChartData = {};
        bubbleChartDataStore = {};
        bubbleChartDataStore.subjects = [];
        bubbleChartDataStore.materials = [];
        bubbleChartDataStore.techniques = [];
        bubbleChartDataStore.place_of_publication = [];
        $scope.selectedTopics = [];
        $scope.selectedNodes = [];
        $scope.colors = {
              "subjects": "rgb(118,147,181)",
              "techniques": "rgb(78,184,185)",
              "materials": "rgb(115,214,154)",
              "place_of_publication": "rgb(204,231,116)",
              "background_color": "rgb(238,242,245)",
              "text_color": "rgb(238,242,245)"
            };

        $scope.topicButtons = [
          {name: "subjects", display: "Subjects", color: $scope.colors.subjects},
          {name: "materials", display: "Materials", color: $scope.colors.materials},
          {name: "techniques", display: "Techniques", color: $scope.colors.techniques},
          {name: "place_of_publication", display: "Place of Publication", color: $scope.colors.place_of_publication}
        ];

        dataService.getData(function(promise){

          promise.then(
            function(returnedData) {

              bookData = returnedData;
              getTimelineData();
              getBubbleData();
            })
            .catch(
              function(reason) {
                console.log(reason);
              }
            );
        });

        function getTimelineData() {
          timelineDataService.getTimelineData(function(promise){
            promise.then(
              function(returnedData) {
                $scope.timelineData = returnedData;
              })
              .catch(
                function(reason) {
                  console.log(reason);
                }
              );
          }, bookData);
        }

        function getBubbleData() {
          bubbleDataService.getBubbleData(function(promise){
            promise.then(
              function(returnedData) {
                bubbleChartDataStore.subjects = returnedData.subjects;
                bubbleChartDataStore.materials = returnedData.materials;
                bubbleChartDataStore.techniques = returnedData.techniques;
                bubbleChartDataStore.place_of_publication = returnedData.place_of_publication;
                $scope.selectedTopics.push("subjects");
                setChartData();
              })
              .catch(
                function(reason) {
                  console.log(reason);
                }
              );
          }, bookData);
        }

        $scope.treeData = dataSets.artifacts[0];

      }

      // $scope functions
      // $scope.updateNodes = function(e) {
      //   console.log(e.target);
      // };

      $scope.updateSubjects = function(e) {
        if (chartIncludes($scope.selectedTopics, e.target.value)) {
          removeElement($scope.selectedTopics, e.target.value);
        } else {
          $scope.selectedTopics.push(e.target.value);
        }
      };

      $scope.$watch('selectedTopics', function(newValue, oldValue) {
              if (newValue) {
                  setChartData();
                }
            }, true);


      // $scope.$watch('selectedNodes', function(newValue, oldValue) {
      //         if (newValue) {
      //             console.log(newValue);
      //           }
      //       }, true);

      // private functions

      function chartIncludes(arr, k) {
        for(var i=0; i < arr.length; i++){
          if( arr[i] === k || ( arr[i] !== arr[i] && k !== k ) ){
            return true;
          }
        }
        return false;
      }

      function removeElement(arr, k) {
        var index;
        if (arr.indexOf) {
          index = arr.indexOf(k);
        }
        else {
          for (index = arr.length - 1; index >= 0; --index) {
            if (array[index] === k) {
              break;
            }
          }
        }
        if (index >= 0) {
          arr.splice(index, 1);
        }
      }

      function makeData() {
          var dataSet = [];
          $scope.selectedTopics.forEach( function(el) {
            dataSet = dataSet.concat(bubbleChartDataStore[el]);
          });
          return dataSet;
      }

      function setChartData() {
        $scope.bubbleChartData.dataSet = makeData();
        // console.log($scope.bubbleChartData.selectedKeys);
        $timeout(function(){});
      }

    }])
    // .directive('treeChart', function() {
    //   var chart = Tree();
    //   return {
    //     restrict: 'E',
    //     scope: {
    //       data: '='
    //     },
    //     link: function(scope, element, attrs) {
    //
    //       scope.$watch('data', function(data) {
    //         var selector = element[0];
    //
    //         d3.select(selector)
    //           .datum(data)
    //           .call(chart);
    //       });
    //     }
    //   };
    // })
    .directive('plodabTool', function() {
      return {
        restrict: 'E',
        scope: {
          data: '='
        },
        template: '<tree-chart-container></tree-chart-container>'
      };
    })
    .directive('treeChartContainer', function() {
      return {
        restrict: 'E',
        scope: {
          data: '='
        },
        template: '<tree-chart data="treeData"></tree-chart>'
      };
    })
    .directive('bubbleChartContainer', function() {
      return {
        restrict: 'E',
        scope: {
          data: '='
        },
        template: '<div></div>'
      };
    })
    .directive('viewToggle', function() {
      return {
        restrict: 'E',
        scope: {
          data: '='
        },
        template: '<div></div>'
      };
    })
    .directive('helloWorld', function() {
      return {
        restrict: 'E',
        scope: {
          data: '='
        },
        transclude: true,
        template: 'hello <div ng-transclude></div>'
      };
    })
    .directive('world', function() {
      return {
        restrict: 'E',
        scope: {
          data: '='
        },
        transclude: true,
        template: '<span> world</span>'
      };
    });

})();
