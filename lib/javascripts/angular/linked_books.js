(function() {

  angular.module('plodab')
    .controller('chartctrl', ['$scope', '$timeout', 'dataService', 'timelineDataService', 'bubbleDataService', 'artifactDataService', function ($scope, $timeout, dataService, timelineDataService, bubbleDataService, artifactDataService) {

      init();
      var bookData, bubbleChartDataStore, artifactDataStore;

      function init() {
        $scope.dataHasLoaded = false;
        $scope.timelineData = [];
        $scope.bubbleChartData = {};
        artifactDataStore = {};
        bubbleChartDataStore = {};
        bubbleChartDataStore.subjects = [];
        bubbleChartDataStore.materials = [];
        bubbleChartDataStore.techniques = [];
        bubbleChartDataStore.place_of_publication = [];
        $scope.selectedKey = "";
        $scope.selectedTopics = [];
        $scope.selectedNodes = {
          subjects: [],
          materials: [],
          techniques: [],
          place_of_publication: []
        };
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

        $scope.treeData = dataSets.artifacts[0];

        // console.log($scope.topicButtons[0].isSelected);

        dataService.getData(function(promise){

          promise.then(
            function(returnedData) {

              bookData = returnedData;
              getTimelineData();
              getBubbleData();
              getArtifactData();
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
                setBubbleChartData();
              })
              .catch(
                function(reason) {
                  console.log(reason);
                }
              );
          }, bookData);
        }

        function getArtifactData() {
          artifactDataService.getArtifactData(function(promise){
            promise.then(
              function(returnedData) {
                artifactStore = returnedData;
                // console.log(artifactStore.w_plodab0000001);
                $scope.treeData = artifactStore.w_plodab0000001;
              })
              .catch(
                function(reason) {
                  console.log(reason);
                }
              );
          }, bookData);
        }



      }

      // $scope functions

      $scope.updateSubjects = function(e) {
        if (includes($scope.selectedTopics, e.target.name)) {
          removeElement($scope.selectedTopics, e.target.name);
        } else {
          $scope.selectedTopics.push(e.target.name);
        }
      };

      $scope.$watch('selectedKey', function(newValue, oldValue) {
              if (newValue) {
                  // console.log("key change", $scope.selectedKey, newValue);
                  $scope.treeData = artifactStore[$scope.selectedKey];
                }
            }, true);

      $scope.$watch('selectedTopics', function(newValue, oldValue) {
              if (newValue) {
                  setBubbleChartData();
                  updateTimelineData();
                }
            }, true);


      $scope.$watch('selectedNodes', function(newValue, oldValue) {
              if (newValue) {
                  console.log("node change");
                  setTimelineData();
                }
            }, true);

      // private functions

      function includes(arr, k) {
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

      function setBubbleChartData() {
        $scope.bubbleChartData.dataSet = makeData();
        $timeout(function(){});
      }

      function setTimelineData() {
        var newTimelineData = updateTimelineData();
        $scope.timelineData = dataSets.artifacts[0];
        $timeout(function(){});
        $scope.timelineData = newTimelineData;
        // console.log($scope.timelineData);
        // $scope.$apply();
      }

      function updateTimelineData() {
        var newTimelineData = $scope.timelineData;
        newTimelineData.forEach( function(booksByYear) {
          var keys = Object.keys(booksByYear);
          keys.forEach( function(key) {
            if (key != "year" && key != "books") {
              checkTimelineSelections(key, booksByYear);
            }
          });
        });
        // console.log(newTimelineData);
        return newTimelineData;
      }

      function checkTimelineSelections(key, booksByYear) {
        var book = booksByYear[key];
        var bookIsSelected = true;
        var checked = false;
        var topics = Object.keys($scope.selectedNodes);
        topics.forEach( function(topic) {
          if ($scope.selectedNodes[topic].length > 0) {
            var arr = $scope.selectedNodes[topic];
            bookIsSelected = selectionTrue(arr, topic, book, bookIsSelected);
            // console.log(bookIsSelected);
            checked = true;
          }
        });
        if (bookIsSelected && checked) {
          // console.log("selected in final check", book);
          book.selected = true;
        }
      }

      function selectionTrue(arr, topic, book, bookIsSelected) {
        var selected = false;
        arr.forEach( function(subj) {
          if (bookIsSelected && includes(book[topic], subj.name)) {
            // console.log("selected", book, book.year);
            selected = true;
          } else {
            selected = false;
          }
        });
        return selected;
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
