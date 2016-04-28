(function() {

  angular.module('plodab')
    .controller('chartctrl', ['$scope', '$timeout', 'dataService', 'timelineDataService', 'bubbleDataService', 'artifactDataService', function ($scope, $timeout, dataService, timelineDataService, bubbleDataService, artifactDataService) {

      init();
      var bookData, bubbleChartDataStore, artifactDataStore;

      function init() {

        artifactDataStore = {};
        bubbleChartDataStore = {
          subjects: [],
          materials: [],
          techniques: [],
          place_of_publication: []
        };

        $scope.bubbleChartData = {};
        $scope.cleanTimelineData = [];
        $scope.timelineData = [];
        $scope.treeData = {};

        $scope.selectedKey = "";
        $scope.selectedTopics = [];
        $scope.selectedNodes = {
          subjects: [],
          materials: [],
          techniques: [],
          place_of_publication: []
        };
        $scope.selectedTreeTopic = {
          topic: "",
          name: ""
        };

        // $scope.colors = {
        //       "subjects": "#3e5e84",
        //       "techniques": "#298182",
        //       "materials": "#25b15c",
        //       "place_of_publication": "#a3d011",
        //       "background_color": "whitesmoke",
        //       "text_color": "rgb(238,242,245)"
        // };
        $scope.colors = {
              "subjects": "#2e4561",
              "techniques": "#1d5c5d",
              "materials": "#1d8747",
              "place_of_publication": "#7ea00d",
              "background_color": "whitesmoke",
              "text_color": "rgb(238,242,245)"
            };

        $scope.topicButtons = [
          {name: "subjects", display: "Subjects", color: $scope.colors.subjects, selected: true},
          {name: "materials", display: "Materials", color: $scope.colors.materials, selected: false},
          {name: "techniques", display: "Techniques", color: $scope.colors.techniques, selected: false},
          {name: "place_of_publication", display: "Place of Publication", color: $scope.colors.place_of_publication, selected: false}
        ];

        $scope.timelineIsCurrent = true;
        $scope.treeActivated = false;

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
                $scope.cleanTimelineData = returnedData;
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
        var topicName = e.target.name;
        var topic = $scope.topicButtons.filter(function(a) { return a.name === topicName; })[0];
        if (includes($scope.selectedTopics, topicName)) {
          removeElement($scope.selectedTopics, topicName);
          topic.selected = false;
        } else {
          $scope.selectedTopics.push(topicName);
          topic.selected = true;
        }
      };

      $scope.togglePanelView = function() {
        var el = angular.element(document.getElementsByClassName('plodab-tool'));
        el.toggleClass('shift');
      };

      $scope.resetBubbleChartFromTree = function() {
        var topicName = $scope.selectedTreeTopic.topic;
        $scope.topicButtons.forEach( function(button) {
          button.selected = false;
        });
        var topic = $scope.topicButtons.filter(function(a) { return a.name === topicName; })[0];
        topic.selected = true;
        $scope.selectedTopics = [topicName];
        $scope.selectedNodes[topicName] = [$scope.selectedTreeTopic.name];
      };

      $scope.$watch('selectedKey', function(newValue, oldValue) {
              if ($scope.selectedKey !== "") {
                $scope.treeData = artifactStore[$scope.selectedKey];
                $scope.treeActivated = true;
                var el = angular.element(document.getElementsByClassName('toggle-ellipsis'));
                el.addClass('white');
              }
            }, true);

      $scope.$watch('selectedTopics', function(newValue, oldValue) {
              if (newValue) {
                  setBubbleChartData();
                  setTimelineData();
                }
            }, true);


      $scope.$watch('selectedNodes', function(newValue, oldValue) {
              if (newValue) {
                  setTimelineData();
                }
            }, true);

      // private functions

      function clone(obj) {
        if (obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj) {
          return obj;
        }
        if (obj instanceof Date) {
          var temp = new obj.constructor(); //or new Date(obj);
        } else {
          var temp = obj.constructor();
        }
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            obj.isActiveClone = null;
            temp[key] = clone(obj[key]);
            delete obj.isActiveClone;
          }
        }

        return temp;
      }


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
          $scope.timelineData = newTimelineData;
          $scope.timelineIsCurrent = false;
          $timeout(function(){});
          // $scope.$apply();
      }

      function updateTimelineData() {
        var newTimelineData = clone($scope.cleanTimelineData);
        newTimelineData.forEach( function(booksByYear) {
          var keys = Object.keys(booksByYear);
          keys.forEach( function(key) {
            if (key != "year" && key != "books") {
              checkTimelineSelections(key, booksByYear);
            }
          });
        });
        return newTimelineData;
      }

      function checkTimelineSelections(key, booksByYear) {
        var book = booksByYear[key];
        var bookIsSelected = true;
        var checked = false;
        var topics = Object.keys($scope.selectedNodes);
        topics.forEach( function(topicName) {
          if ($scope.selectedNodes[topicName].length > 0 && includes($scope.selectedTopics, topicName)) {
            var topicArray = $scope.selectedNodes[topicName];
            if (bookIsSelected) {
              bookIsSelected = topicMatchesBook(topicArray, topicName, book);
            }
            checked = true;
          }
        });
        if (bookIsSelected && checked) {
          book.selected = true;
        }
      }

      function topicMatchesBook(topicArray, topicName, book) {
        var selected = true;
        topicArray.forEach( function(subj) {
          if (!(includes(book[topicName], subj.name))) {
            selected = false;
          }
        });
        return selected;
      }

    }]);


})();
