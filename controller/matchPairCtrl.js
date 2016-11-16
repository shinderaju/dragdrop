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
        'match': 'match1',
        'x': 20,
        'y': 100,
    };
    var match2 = {
        'match': 'match2',
        'x': 800,
        'y': 100,
    }

    function loadMultiImages(match, callback) {
        var arr = getUnique($scope.draggableObjects.length);
        var images = {};
        for (var src = 0; src < arr.length; src++) {
            images[src] = new Image();
            images[src].src = arr[src].img;
        }
        callback(images, match);
    }


    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    canvas.setAttribute('width', screen.availWidth);
    canvas.setAttribute('height', screen.availHeight);


    var jsonArray1 = [];
    var jsonArray2 = [];

    function myLoadCallback(images, match) {
        var imgLength = Object.keys(images);
        for (i = 0; i < imgLength.length; i++) {
            var jsonVariable1 = {};
            var jsonVariable2 = {};
            context.drawImage(images[i], match.x, match.y, 100, 100);
            context.beginPath();
            if (match.match == "match1") {
                jsonVariable1['key'] = images[i].src;
                jsonVariable1['x1'] = match.x;
                jsonVariable1['y1'] = match.y;
                jsonArray1.push(jsonVariable1);
                context.arc(match.x + 200, match.y + 40, 5, 0, 2 * Math.PI);
            } else {
                jsonVariable2['key'] = images[i].src;
                jsonVariable2['x2'] = match.x;
                jsonVariable2['y2'] = match.y;
                jsonArray2.push(jsonVariable2);
                context.arc(match.x - 100, match.y + 40, 5, 0, 2 * Math.PI);
            }
            context.lineWidth = 5;
            context.strokeStyle = '#fa4b2a';
            context.stroke();
            match.y = match.y + 110;
        }
        console.log(jsonArray1);
        console.log(jsonArray2);
    }

    var canArr = [];

    function myLoadCallback2(images, match) {

        var imgLength = Object.keys(images);
        console.log(imgLength.length);
        for (i = 0; i < imgLength.length; i++) {
            var canv = document.createElement('canvas');
            canv.id = $scope.draggableObjects[i].img + "_" + match.match;
            document.getElementById('canvas').appendChild(canv); // adds the canvas to the #canvas
            var canvas1 = document.getElementById($scope.draggableObjects[i].img + "_" + match.match);
            canArr.push($scope.draggableObjects[i].img + "_" + match.match);
            var context1 = canvas1.getContext('2d');
            context1.arc(match.x, match.y, 10, 0, 2 * Math.PI);
            canvas1.setAttribute('width', 100);
            canvas1.setAttribute('height', 100);
            var left = match.x + "px";
            var top = match.y + "px";
            canvas1.style.left = left;
            canvas1.style.top = top;
            canvas1.style.position = "absolute";
            canvas1.style.backgroundColor = "red";
            console.log($scope.draggableObjects[i].img);
            // canvas1.addEventListener('click', on_canvas_click, false);
            context.drawImage(images[i], match.x, match.y, 100, 100);
            // $scope.dataURL = canvas.toDataURL();
            // console.log($scope.dataURL);
            match.y = match.y + 110;
        }
        console.log(canArr.length);

        for (var i = 0; i < $scope.draggableObjects.length; i++) {
            console.log(canArr[i]);
            var el = document.getElementById($scope.draggableObjects[i].img + "_" + match1.match);
            console.log(el);
            el.addEventListener('click', on_canvas_click, false);
        }
        // x = document.getElementById("canvas").childNodes;
        // console.log(x.length);
        // for (var i = 0; i < x.length; i++) {
        //   console.log(x[i]);
        //     addEvent(x[i], "click", boxClicker);
        // }
        //
        // function addEvent(element, event_name, func) {
        //     if (element.addEventListener) {
        //       console.log(element);
        //     func();
        //         element.addEventListener(event_name, func,true);
        //     } else if (element.attachEvent) {
        //         element.attachEvent("on" + event_name, func);
        //     }
        // }
        //
        // function boxClicker() {
        //     console.log("hi");
        // }
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

    function on_canvas_click(ev) {
        console.log("inside onclick");
        var x = ev.clientX - canvas.offsetLeft;
        var y = ev.clientY - canvas.offsetTop;
        console.log(x, y);
        if (x >= 180 && x <= 260 && y >= 100 && y <= 500) {
            console.log("hi");
            for (var i = 0; i < jsonArray1.length; i++) {
                if ((x >= (jsonArray1[i].x1 + 200 - 20) && x <= (jsonArray1[i].x1 + 200 + 20)) && (y >= (jsonArray1[i].y1 + 40 - 20) && y <= (jsonArray1[i].y1 + 40 + 20))) {
                    console.log("match");
                    console.log(jsonArray1[i].x1 + 200);
                    console.log(jsonArray1[i].y1 + 40);
                }
            }
            // if((x+20 >= jsonArray1[0].x1+200 || x-20 <= jsonArray1[0].x1+200) &&(y+20 >= jsonArray1[0].y1+40 || y-20 <= jsonArray1[0].y1+40)){
            //   console.log("match");
            // }
        }

    }
    canvas.addEventListener('click', on_canvas_click, false);
    $scope.check = function() {
            console.log(url);
            console.log(url.length);
            if (url.length > 1) {
                for (i = 1; i < url.length; i++) {
                    if (url[i] == url[i - 1]) {
                        console.log("matched");
                    } else {
                        console.log("not matched");
                    }
                }
            }
        }
        // $scope.changeIt = function(img) {
        //   console.log("inside img");
        //     var name = img.src;
        //     console.log(canvas);
        //     console.log(img.$parent);
        // };




});
