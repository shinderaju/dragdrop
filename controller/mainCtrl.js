angular.module('ExampleApp', ['ngDraggable']).
controller('MainCtrl', function($scope, $http) {

    $scope.centerAnchor = true;
    $scope.toggleCenterAnchor = function() {
        $scope.centerAnchor = !$scope.centerAnchor
    }

    $http({
        method: "GET",
        url: "jsonData.js"
    }).then(function mySucces(response) {
        $scope.draggableObjects = response.data.subjects;
    }, function myError(response) {
        $scope.draggableObjects = response.statusText;
    });

    //$scope.draggableObjects = [{name:'subject1'}, {name:'subject2'}, {name:'subject3'}];
    $scope.droppedObjects1 = [];
    $scope.droppedObjects2 = [];

    $scope.onDropComplete1 = function(data, evt) {
      console.log("drag success, data:", data.name);
      console.log("drag success, data:", evt);
        var index = $scope.droppedObjects1.indexOf(data);
        if (index == -1) {
            $scope.droppedObjects1.push(data);
        }
    }


    // $scope.onDragSuccess1 = function(data, evt) {
    //   console.log("drag success, data:", data);
    //     var index = $scope.droppedObjects1.indexOf(data);
    //     alert(index);
    //     if (index > -1) {
    //         $scope.droppedObjects1.splice(index, 1);
    //     }
    // }


    // $scope.onDragSuccess2 = function(data, evt) {
    //     var index = $scope.droppedObjects2.indexOf(data);
    //     if (index > -1) {
    //         $scope.droppedObjects2.splice(index, 1);
    //     }
    // }
    //
    //
    // $scope.onDropComplete2 = function(data, evt) {
    //     var index = $scope.droppedObjects2.indexOf(data);
    //     if (index == -1) {
    //         $scope.droppedObjects2.push(data);
    //     }
    // }

    var inArray = function(array, obj) {
        var index = array.indexOf(obj);
    }

});
