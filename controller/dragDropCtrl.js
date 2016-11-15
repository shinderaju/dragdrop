var app = angular.module('ELearningApp');
app.controller('dragDropCtrl', function($scope, $http,$interval) {
console.log("inside controller");
    $scope.centerAnchor = true;
    $scope.toggleCenterAnchor = function() {
        $scope.centerAnchor = !$scope.centerAnchor
    }

    /**
     * get json data from json file
     *@ param { string} url
     *
     *
     */
    $http({
        method: "GET",
        url: "jsonData.js"
    }).then(function mySucces(response) {
        $scope.draggableObjects = response.data.subjects;
    }, function myError(response) {
        $scope.draggableObjects = response.statusText;
    });

    $scope.droppedTechObj = [];
    $scope.droppedNonTechObj = [];

    /**
     * drop the  only tech object in only tech draggable area
     *@ param { object} data
     * @ param { object} evt
     *
     */
    $scope.onDropTech = function(data, evt) {
        var index = $scope.droppedTechObj.indexOf(data);
        if (index == -1) {
            $scope.droppedTechObj.push(data);
        }
    }

    /**
     * drop the  only nontech object in only nontech draggable area
     *@ param { object} data
     *@ param { object} evt
     *
     */
    $scope.onDropNonTech = function(data, evt) {
        var index = $scope.droppedNonTechObj.indexOf(data);
        if (index == -1) {
            $scope.droppedNonTechObj.push(data);
        }
    }

    /**
     * refresh the dragable area
     *
     */
    $scope.referesh = function() {
        $scope.droppedTechObj = [];
        $scope.droppedNonTechObj = [];
    }

    /**
     * drop object in its proper dragable area
     *
     *
     */
    $scope.check = function() {
        $scope.droppedTechObj = [];
        $scope.droppedNonTechObj = [];
        for (var i = 0; i < $scope.draggableObjects.length; i++) {
            if ($scope.draggableObjects[i].category == "Technical") {
                $scope.onDropTech($scope.draggableObjects[i]);
            } else {
                $scope.onDropNonTech($scope.draggableObjects[i]);
            }
        }
        $interval($scope.submit,10,1);
    }

    /**
     * validate the dropped object
     *
     *
     */
    $scope.submit = function() {
      console.log("inside submit");
        for (var i = 0; i < $scope.droppedTechObj.length; i++) {
            if ($scope.droppedTechObj[i].category == "Technical") {
                document.getElementById("Tech" + $scope.droppedTechObj[i].img).style.border = "thick solid #00ff00";
            } else {
                document.getElementById("Tech" + $scope.droppedTechObj[i].img).style.border = "thick solid #ff0000";
            }
        }
        for (var i = 0; i < $scope.droppedNonTechObj.length; i++) {
            if ($scope.droppedNonTechObj[i].category == "Non-Technical") {
                document.getElementById("nonTech" + $scope.droppedNonTechObj[i].img).style.border = "thick solid #00ff00";
            } else {
                document.getElementById("nonTech" + $scope.droppedNonTechObj[i].img).style.border = "thick solid #ff0000";
            }
        }
    }
});
