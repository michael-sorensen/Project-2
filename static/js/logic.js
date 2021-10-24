// I want to scale the color for each state based on TOTAL discretionary spend for the state
// The hover pop up will be 1. state name, 2. most popular spend category, 3. % of state total spend
// https://leafletjs.com/examples/choropleth/example.html

//create map object
var myMap = L.map("map-id").setView([37.8, -96], 4);

//adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

  //load in geo data

  stateLines = "static/data/stateBorders.geojson";

  L.geoJSON(stateLines).addTo(myMap);