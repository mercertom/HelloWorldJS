var express = require('express');
   app = express();
   bodyParser = require('body-parser');
   fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true }));

var mapzenAPIkey = "mapzen-aR9DZaP";

var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyA9VpseZP8UHlL8xciYG3emsWaE2L7glS8'
});


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
    else {
        document.getElementById("demo").innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    var latlon = position.coords.latitude + "," + position.coords.longitude;
    var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="
    +latlon+"&zoom=14&size=400x300&key=AIzaSyBu-916DdpKAjTmJNIgngS6HL_kDIKU0aU";
    document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}

var head = fs.readFile('./head.html', 'utf-8');
var form = fs.readFile('./form.html', 'utf-8');
var foot = fs.readFile('./foot.html', 'utf-8');

app.get('/', function (req, res) {
   res.send(head + form + foot);
   res.end();
   console.log("Got a GET");
});

app.post('/', function (req, res) {
   res.send(head + form + foot);
   res.end();
   console.log("Got a POST");
});

var server = app.listen(8081, function () {
    console.log("listening at http://127.0.0.1:8081")
});
