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
        $scope.selectedNodes = ["parent"];
        $scope.colors = {
              "subjects": "#3e5e84",
              "techniques": "#298182",
              "materials": "#25b15c",
              "place_of_publication": "#a3d011",
              "background_color": "whitesmoke",
              "text_color": "rgb(238,242,245)"
            };

        $scope.topicButtons = [
          {name: "subjects", display: "Subjects", color: $scope.colors.subjects, selected: true},
          {name: "materials", display: "Materials", color: $scope.colors.materials, selected: false},
          {name: "techniques", display: "Techniques", color: $scope.colors.techniques, selected: false},
          {name: "place_of_publication", display: "Place of Publication", color: $scope.colors.place_of_publication, selected: false}
        ];

        // console.log($scope.topicButtons[0].isSelected);

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

      $scope.updateSubjects = function(e) {
        if (chartIncludes($scope.selectedTopics, e.target.name)) {
          removeElement($scope.selectedTopics, e.target.name);
        } else {
          $scope.selectedTopics.push(e.target.name);
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
