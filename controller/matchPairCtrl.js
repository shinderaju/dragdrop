var app = angular.module('ELearningApp');
app.controller('matchPairCtrl', function($scope, $http, $interval) {
    console.log("inside matchPairCtrl controller");

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

    var match1 = {
        'x': 20,
        'y': 100
    };
    var match2 = {
        'x': 500,
        'y': 100,
    }

    function loadMultiImages(match, callback) {
        console.log(match);
        var arr = getUnique($scope.draggableObjects.length);
        var images = {};
        for (var src = 0; src < arr.length; src++) {
            console.log(arr[src].img);
            console.log(arr[src].img);
            images[src] = new Image();
            images[src].src = arr[src].img;
        }
        callback(images, match);
    }


    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    canvas.setAttribute('width', screen.availWidth);
    canvas.setAttribute('height', screen.availHeight);

    function myLoadCallback(images, match) {
        var imgLength = Object.keys(images);
        for (i = 0; i < imgLength.length; i++) {
            console.log(images[i]);
            context.drawImage(images[i], match.x, match.y, 100, 100);
            $scope.dataURL = canvas.toDataURL();
            // console.log($scope.dataURL);
            match.y = match.y + 110;
        }
    }

    loadMultiImages(match1, myLoadCallback);
    loadMultiImages(match2, myLoadCallback);
    // $interval(loadMultiImages(sources, myLoadCallback), 1000, 1);

    function getUnique(count) {
        // Make a copy of the array
        var tmp = $scope.draggableObjects.slice($scope.draggableObjects);
        var ret = [];

        for (var i = 0; i < count; i++) {
            var index = Math.floor(Math.random() * tmp.length);
            var removed = tmp.splice(index, 1);
            // Since we are only removing one element
            ret.push(removed[0]);
        }
        return ret;
    }
    var url = [];

    // function on_canvas_click(ev) {
    //
    //     var x = ev.clientX - canvas.offsetLeft;
    //     var y = ev.clientY - canvas.offsetTop;
    //     url.push(imgData);
    //     $scope.check();
    //     // ... x,y are the click coordinates relative to the
    //     // canvas itself
    // }
    // canvas.addEventListener('click', on_canvas_click, false);
    // $scope.check = function() {
    //     console.log(url);
    //     console.log(url.length);
    //     if (url.length > 1) {
    //         for (i = 1; i < url.length; i++) {
    //             if (url[i] == url[i - 1]) {
    //                 console.log("matched");
    //             } else {
    //                 console.log("not matched");
    //             }
    //         }
    //     }
    // }
    $scope.changeIt = function(img) {
      console.log("inside img");
        var name = img.src;
        console.log(name);
    };




});
