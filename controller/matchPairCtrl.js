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

    function loadMultiImages(match, callback) {
        var arr = getUnique($scope.draggableObjects.length);
        var images = {};
        for (var src = 0; src < arr.length; src++) {
            images[src] = new Image();
            images[src].src = arr[src].img;
        }
        callback(images, match);
    }

    // var canvasWidth = window.innerWidth ||
    //     document.documentElement.clientWidth ||
    //     document.body.clientWidth;
    //
    // var canvasHeight = window.innerHeight ||
    //     document.documentElement.clientHeight ||
    //     document.body.clientHeight;

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    console.log(screen.availWidth);


    var match1 = {};
    var match2 = {};
    var jsonArray1 = [];
    var jsonArray2 = [];
    var arc1 = {};
    var arc2 = {};
    var imgPorp = {};
    var clickableArea1 = {};
    var clickableArea2 = {};
    var circleArea1 = {};


    function myLoadCallback(images, match) {
        var imgLength = Object.keys(images);
        for (i = 0; i < imgLength.length; i++) {
            var jsonVariable1 = {};
            var jsonVariable2 = {};
            context.drawImage(images[i], match.x, match.y, imgPorp.height, imgPorp.width);
            context.beginPath();
            if (match.match == "match1") {
                jsonVariable1['key'] = images[i].src;
                jsonVariable1['x1'] = match.x + arc1.x;
                jsonVariable1['y1'] = match.y + arc2.y;
                jsonArray1.push(jsonVariable1);
                context.arc(match.x + arc1.x, match.y + arc1.y, arc1.radius, 0, 2 * Math.PI);
            } else {
                jsonVariable2['key'] = images[i].src;
                jsonVariable2['x2'] = match.x - arc2.x;
                jsonVariable2['y2'] = match.y + arc2.y;
                jsonArray2.push(jsonVariable2);
                context.arc(match.x - arc2.x, match.y + arc2.y, arc2.radius, 0, 2 * Math.PI);
            }
            context.lineWidth = 5;
            context.strokeStyle = '#fa4b2a';
            context.stroke();
            match.y = match.y + imgPorp.posIncr;
        }
    }

    // var canArr = [];




    // $interval(loadMultiImages(sources, myLoadCallback), 1000, 1);


    // var url = [];
    $scope.position = [];
    canvas.addEventListener('click', on_canvas_click, false);

    function on_canvas_click(ev) {
        var x = ev.clientX - canvas.offsetLeft;
        var y = ev.clientY - canvas.offsetTop;
        console.log(x, y);

        var pos = {};

        // if (x >= clickableArea1.x1 && x <= clickableArea1.x2 && y >= clickableArea1.y1 && y <= clickableArea1.y2) {
        for (var i = 0; i < jsonArray1.length; i++) {
            if ((x >= (jsonArray1[i].x1 - clickableArea1.surround) && x <= (jsonArray1[i].x1 + clickableArea1.surround)) && (y >= (jsonArray1[i].y1 - clickableArea1.surround) && y <= (jsonArray1[i].y1 + clickableArea1.surround))) {
                pos.x = jsonArray1[i].x1;
                pos.y = jsonArray1[i].y1;
                pos.id = jsonArray1[i].key;
                $scope.position.push(pos);
            }
        }
        // }
        // if (x >= clickableArea2.x1 && x <= clickableArea2.x2 && y >= clickableArea2.y1 && y <= clickableArea2.y2) {
        for (var i = 0; i < jsonArray2.length; i++) {
            if ((x >= jsonArray2[i].x2 - clickableArea2.surround) && (x <= jsonArray2[i].x2 + clickableArea2.surround) && (y >= jsonArray2[i].y2 - clickableArea2.surround) && (y <= jsonArray2[i].y2 + clickableArea2.surround)) {
                pos.x = jsonArray2[i].x2;
                pos.y = jsonArray2[i].y2;
                pos.id = jsonArray2[i].key;
                $scope.position.push(pos);
            }
        }
        // }
        if ($scope.position.length == 2) {
            $scope.drawline();
        }
    }

    $scope.drawline = function() {
        context.beginPath();
        context.moveTo($scope.position[0].x, $scope.position[0].y);
        context.lineTo($scope.position[1].x, $scope.position[1].y);
        if ($scope.position[0].id == $scope.position[1].id) {
            context.strokeStyle = "#7FFF00";
        } else {
            context.strokeStyle = "#FF0000";
        }
        context.stroke();
        $scope.position = [];
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
        // canvas.width = window.innerWidth;
        // canvas.height = window.innerHeight;
        var elmnt = document.getElementById("home");
       console.log(elmnt.clientHeight);
       console.log(elmnt.clientWidth);
        console.log("inside resize");
        // console.log(canvasWidth);
        console.log(window.innerWidth);
        console.log(window.innerHeight);
        if (window.innerWidth < 500) {
            jsonArray1 = [];
            jsonArray2 = [];
            console.log("mobile view");
            canvas.setAttribute('width', window.innerWidth);
            canvas.setAttribute('height',( window.innerHeight - elmnt.clientHeight));
            match1.match = 'match1';
            match1.x = 20;
            match1.y = 220;

            match2.match = 'match2'
            match2.x = 200;
            match2.y = 220;

            arc1.x = 50;
            arc1.y = 40;
            arc1.radius = 5;

            arc2.x = 25;
            arc2.y = 40;
            arc2.radius = 5;

            imgPorp.height = 50;
            imgPorp.width = 50;
            imgPorp.posIncr = 50;

            // clickableArea1.x1 = 180;
            // clickableArea1.x2 = 260;
            // clickableArea1.y1 = 100;
            // clickableArea1.y2 = 500;
            clickableArea1.surround = 20;

            // clickableArea2.x1 = 600;
            // clickableArea2.x2 = 750;
            // clickableArea2.y1 = 100;
            // clickableArea2.y2 = 500;
            clickableArea2.surround = 20;

        } else if (window.innerWidth < 1400) {
            jsonArray1 = [];
            jsonArray2 = [];
            console.log("tablet view");
            canvas.setAttribute('width', window.innerWidth);
            canvas.setAttribute('height', window.innerHeight);
            match1.match = 'match1';
            match1.x = 20;
            match1.y = 240;

            match2.match = 'match2'
            match2.x = 400;
            match2.y = 240;

            arc1.x = 100;
            arc1.y = 40;
            arc1.radius = 5;

            arc2.x = 50;
            arc2.y = 40;
            arc2.radius = 5;

            imgPorp.height = 50;
            imgPorp.width = 50;
            imgPorp.posIncr = 50;

            clickableArea1.x1 = 180;
            clickableArea1.x2 = 260;
            clickableArea1.y1 = 100;
            clickableArea1.y2 = 500;
            clickableArea1.surround = 20;

            clickableArea2.x1 = 600;
            clickableArea2.x2 = 750;
            clickableArea2.y1 = 100;
            clickableArea2.y2 = 500;
            clickableArea2.surround = 20;

        } else {
            console.log("desktop view");
            jsonArray1 = [];
            jsonArray2 = [];
            canvas.setAttribute('width', window.innerWidth);
            canvas.setAttribute('height', window.innerHeight);
            match1.match = 'match1';
            match1.x = 20;
            match1.y = 100;

            match2.match = 'match2'
            match2.x = 800;
            match2.y = 100;

            arc1.x = 200;
            arc1.y = 40;
            arc1.radius = 5;

            arc2.x = 100;
            arc2.y = 40;
            arc2.radius = 5;

            imgPorp.height = 100;
            imgPorp.width = 100;
            imgPorp.posIncr = 100;

            clickableArea1.x1 = 180;
            clickableArea1.x2 = 260;
            clickableArea1.y1 = 100;
            clickableArea1.y2 = 500;
            clickableArea1.surround = 20;

            clickableArea2.x1 = 600;
            clickableArea2.x2 = 750;
            clickableArea2.y1 = 100;
            clickableArea2.y2 = 500;
            clickableArea2.surround = 20;

        }
        loadMultiImages(match1, myLoadCallback);
        loadMultiImages(match2, myLoadCallback);
    }
});
