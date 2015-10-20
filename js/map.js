// Function to draw your map
var drawMap = function() {

  // Create map and set view
  var map = L.map('map', {
    center: [47.6080, -122.3410],
    zoom: 13,
//  layers: [cities]
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

  //var master = [].addTo(map);


  var hokLayer = new L.layerGroup([]).addTo(map);

 // console.log(data);
 // console.log(jQuery.type(data));

  data.forEach(function(a) {
    var City = a["City"];
    var Age = a["Victim's Age"];
    var Gender = a["Victim's Gender"];
    var Race = a["Race"];
    var HoK = a["Hit or Killed?"];
    var lat = a["lat"];
    var lng = a["lng"];
  //  console.log(a);
  //  console.log(a["Race"]);

  //var hokLayer;

    if (HoK == 'Hit') {
      var circle = L.circle([lat, lng], 13, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
      }).addTo(hokLayer);
    } else {
      var circle = L.circle([lat, lng], 13, {
        color: 'blue',
        fillColor: '#0000FF',
        fillOpacity: 0.5
    }).addTo(hokLayer);

    }

  });


      // test test
  // var cities = new L.LayerGroup();
  // L.marker([47.6097,-122.3331]).bindPopup('This is Seattle').addTo(cities);
  // cities.addTo(map);




  // var overlays = {
  //   "Cities": cities
  // };


  // // Once layers are on the map, add a leaflet controller that shows/hides layers
  //L.control.layers(null, hokLayer).addTo(map);
}



// tabulation

//$("<tr></tr>").text(...)

// var data = [1,2,3];
// var obj1 = {
//   person:'james',
//   snack: 'gummies'
// };

// var obj2 = {
//   person:'julian',
//   snack: 'cheese-its'
// };

// var obj3 = {
//   person: 'yvonne',
//   snack: 'cheetos'
// };

// var myArr = [obj1, obj2, obj3];

// myArr.forEach(function(d){
//   console.log() //get things to pop up in console
// })

//forEach 


