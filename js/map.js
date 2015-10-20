// Function to draw your map
var drawMap = function() {

  // Create map and set view
  var map = L.map('map', {
 //   center: [47.6080, -122.3410],
    center: [39, -98],
    zoom: 4,
  });

  // Create a tile layer variable using the appropriate url
var layer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'ydingles.no2n3eg7',
    accessToken: 'pk.eyJ1IjoieWRpbmdsZXMiLCJhIjoiY2lmdnpuanVwMmVkdXQ1bHkyOXlobTh2eSJ9.8k-E5pemVvIdf0i1n6gYfA'
}).addTo(map); // Add the layer to your map

  // Execute your function to get data
  getData(map);
 
}

// Function for getting data
var getData = function(map) {

  // Execute an AJAX request to get the data in data/response.js
  // When Successful call customBuild
  $.ajax({
    url: 'data/response.json',
    type: 'get',
    success: function(data) {
      customBuild(map, data);
    },
    dataType: 'json'
  });
}

// Loop through your data and add the appropriate layers and points
var customBuild = function(map, data) {
  // Be sure to add each layer to the map
  var hit = new L.LayerGroup([]).addTo(map);
  var kill = new L.LayerGroup([]).addTo(map);
  var nonwhite = new L.LayerGroup([]).addTo(map);
  var white = new L.LayerGroup([]).addTo(map);

  var countnwm = 0;
  var countnww = 0;
  var countwm = 0;
  var countww = 0;

 //var hokLayer = new L.layerGroup([]).addTo(map);

 // console.log(data);
 // console.log(jQuery.type(data));

  data.forEach(function(a) {
    var name = a["Victim's Name"];
    var age = a["Victim's Age"];
    var gen = a["Victim's Gender"];
    var race = a["Race"];
    var HoK = a["Hit or Killed?"];
    var sum = a["Summary"];
    var lat = a["lat"];
    var lng = a["lng"];
  //  console.log(a);
  //  console.log(a["Race"]);

    if (HoK == 'Hit') {
      var circle = L.circle([lat, lng], 3, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
      }).bindPopup(sum).addTo(hit);
    } else {
      var circle = L.circle([lat, lng], 3, {
        color: 'blue',
        fillColor: '#0000FF',
        fillOpacity: 0.5
    }).bindPopup(sum).addTo(kill);

    }

    if (race != "White") {
      var circle = L.circle([lat, lng], 3, {
        color: 'brown',
        fillColor: '#A52A2A',
        fillOpacity: 0.5
      }).bindPopup(sum).addTo(nonwhite);
    } else {
      var circle = L.circle([lat, lng], 3, {
        color: 'yellow',
        fillColor: '#FFFF00',
        fillOpacity: 0.5
      }).bindPopup(sum).addTo(white);

    }

    if (race == "White" && gen == "Male") {
      var wm = countwm++;
    } else if (race == "White" && gen == "Female") {
      var ww = countww++;
    } else if (race != "White" && gen == "Male") {
      var nwm = countnwm++;
    } else if (race != "White" && gen == "Female") {
      var nww = countnww++
    }


  });

  var layers = {
    "Killed": kill,
    "Hit": hit,
    "Nonwhite": nonwhite,
    "White": white
  };


  // // Once layers are on the map, add a leaflet controller that shows/hides layers
  L.control.layers(null, layers).addTo(map);

    // jquery to pass info to html table
  $('#wm').text(countwm);
  $('#ww').text(countww);
  $('#nwm').text(countnwm);
  $('#nww').text(countnww);
}
