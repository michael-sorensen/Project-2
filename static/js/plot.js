// I want to scale the color for each state based on TOTAL discretionary spend for the state
// The hover pop up will be 1. state name, 2. most popular spend category, 3. % of state total spend

// https://plotly.com/javascript/mapbox-county-choropleth/

const url = "/api/v1.0" // flask route goes here
var apiCall = d3.json(url);

console.log(apiCall);

var data = [{
  type: "choroplethmapbox", 
  name: "Personal Consumption Expenditures by State (2019)", 
  geojson: "https://raw.githubusercontent.com/python-visualization/folium/master/examples/data/us-states.json", 
  locations: [ "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY" ],
  z: [ 174016, 37090, 276910, 105702, 1947590, 266988, 195327, 44625, 923931, 404264, 69993, 66448, 585415, 263533, 124070, 113323, 162390, 173167, 63650, 287344, 387570, 417615, 265958, 96217, 253348, 45316, 80838, 132958, 74220, 481554, 77913, 1067808, 389095, 36504, 499203, 140938, 184344, 595321, 49838, 185731, 40798, 256657, 1175841, 126681, 30811, 397231, 367599, 66803, 251341, 25305 ],
  zmin: 25000,
  zmax: 2000000,
   colorbar: {
     y: 0,
      yanchor: "bottom",
       title: {
         text: "Spending in Millions ($USD)",
          side: "right"}}
}];
 
 var layout = {mapbox: {style: "dark", center: {lon: -110, lat: 50}, zoom: 0.8}, width: 600, height: 400, margin: {t: 0, b: 0}};
 
 var config = {mapboxAccessToken: API_KEY};
 
 Plotly.newPlot("map", data, layout, config);