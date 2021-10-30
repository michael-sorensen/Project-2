// I want to scale the color for each state based on consumer spend for the year
// The hover pop up will show state abbrev & total spend
// https://plotly.com/javascript/mapbox-county-choropleth/


const baseURL = "http://nubc-project2.herokuapp.com/api/exp_by_year/"
var year = 2019;
var url = baseURL + year;
var apiCall = d3.json(url);
console.log(apiCall);



function plot() {

  d3.json(url).then(function(data) {
    var spending = [];
    var stateAbbrev = [];
    for (var i=0; i < data.length; i++) {
      if(data[i].code == "DC") {
        continue
      }
      var spend = data[i].dollars;
      var state = data[i].code;

      spending.push(spend);
      stateAbbrev.push(state);
    }

    minSpend = Math.min(...spending);
    maxSpend = Math.max(...spending);

    console.log(spending);
    console.log(stateAbbrev);
    console.log(minSpend);
    console.log(maxSpend);
    
    var data = [{
        type: "choroplethmapbox", 
        name: "Personal Consumption Expenditures by State (2019)", 
        geojson: "https://raw.githubusercontent.com/python-visualization/folium/master/examples/data/us-states.json", 
        locations: stateAbbrev,
        z: spending,
        min: minSpend,
        zmax: maxSpend,
        bgcolor: "black",
        colorbar: {
          y: 0,
          yanchor: "bottom",
          title: {
            text: "2019 Spending in Millions ($USD)",
            side: "right"
          }}
       }];
    
       console.log(data);
    
       var layout = {mapbox: {style: "dark", center: {lon: -100, lat: 45}, zoom: 2}, width: 600, height: 400, margin: {t: 0, b: 0}};
       
       var config = {mapboxAccessToken: API_KEY};
       
       Plotly.newPlot("map", data, layout, config);      
    }
  );
};

plot();



