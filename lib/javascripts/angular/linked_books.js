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
        // $scope.colors.background_color = "blue";

        $scope.topicButtons = [
          {name: "subjects", display: "Subjects", color: dataSets.colors.subjects},
          {name: "materials", display: "Materials", color: dataSets.colors.materials},
          {name: "techniques", display: "Techniques", color: dataSets.colors.techniques},
          {name: "place_of_publication", display: "Place of Publication", color: dataSets.colors.place_of_publication}
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


      $scope.$watch('selectedNodes', function(newValue, oldValue) {
              if (newValue) {
                  console.log(newValue);
                }
            }, true);

      // $scope.$watch(document.getElementsByClassName("bubble-selected"), function(newValue, oldValue) {
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




    .directive('bubbleChart', function() {
      var chart = Bubbles();

      return {
        restrict: 'E',
        scope: {
          bubbleData: '=',
          selectedNodes: '=selectedData'
        },
        link: function(scope, element, attrs) {

          scope.$watch('bubbleData.dataSet', function(newData, oldData) {
            var selector = element[0];
            if(d3.select('bubble-chart svg')) {
              d3.select('bubble-chart svg').remove();
              d3.select('bubble-chart div').remove();
            }
            d3.select(selector)
              .datum(newData)
              .call(chart)
              .on("click", function(e) {
                var chicken = [];
                e.forEach( function(node) {
                  if (node.selected) {
                    chicken.push(node);
                  }
                  console.log(chicken);
                });
              })
              ;
            // scope.bubbleData.selectedData = chart.selectedKeys;
          });

          scope.$on('elementClick.directive', function(event, data) {
            console.log(event);
          });

        }
      };
    })

    .directive('timelineChart', function() {
      var chart = Timeline();
      return {
        restrict: 'E',
        scope: {
          data: '='
        },
        link: function(scope, element, attrs) {
          scope.$watch('data', function(data) {
            var selector = element[0];
            if(d3.select('timeline-chart svg')) {
              d3.select('timeline-chart svg').remove();
              d3.select('timeline-chart div').remove();
            }
            d3.select(selector)
              .datum(data)
              .call(chart);
          });
        }
      };
    })
    .directive('treeChart', function() {
      var chart = Tree();
      return {
        restrict: 'E',
        scope: {
          data: '='
        },
        link: function(scope, element, attrs) {

          scope.$watch('data', function(data) {
            var selector = element[0];

            d3.select(selector)
              .datum(data)
              .call(chart);
          });
        }
      };
    })
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
