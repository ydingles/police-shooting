// Function to draw your map
var drawMap = function() {

  // Create map and set view
  // lat, long of Seattle
  //var map = L.map('map').setView([47.6080, -122.3410], 13);

  var map = L.map('map', {
  	center: [47.6080, -122.3410],
  	zoom: 13,
//  	layers: [cities]
  });

  // Create a tile layer variable using the appropriate url
  //var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png')
  
var layer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'ydingles.no2n3eg7',
    accessToken: 'pk.eyJ1IjoieWRpbmdsZXMiLCJhIjoiY2lmdnpuanVwMmVkdXQ1bHkyOXlobTh2eSJ9.8k-E5pemVvIdf0i1n6gYfA'
}).addTo(map); //

  // Add the layer to your map
//  layer.addTo(map);
 
  // Execute your function to get data
  getData();
 
}

// Function for getting data
var getData = function() {

  // Execute an AJAX request to get the data in data/response.js
  $.get('data/response.json', function(getData) {
  	$('.result').html(getData);
  	alert('Load was performed.');

  });

// //  	Is this needed?
//   	L.get(getData).addTo(map);
//   });

// 	$.getJSON('data/response.json', function(getData) {
// //		L.geoJSON(getData).addTo(map);
// 		alert('Load was performed');
// 	})


// var data; 

// $.ajax({
//     url:'https://data.seattle.gov/resource/7ais-f98f.json?year=2015&$limit=500',
//     type: "get",
//     success:function(dat) {
//       data = dat
//     }, 
//    dataType:"json"
// })


  // When your request is successful, call your customBuild function
 customBuild();
}

// Loop through your data and add the appropriate layers and points
var customBuild = function() {
	// Be sure to add each layer to the map

	var cities = new L.LayerGroup();

	L.marker([47.6097,-122.3331]).bindPopup('This is Seattle').addTo(cities);
//	var cities = L.layerGroup([seattle]);

	var overlays = {
		"Cities": cities
	};


	// Once layers are on the map, add a leaflet controller that shows/hides layers
	L.control.layers(overlays).addTo(map);
}


