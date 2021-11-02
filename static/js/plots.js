var colors = ["#58693A", "#CC8500", "#AC370C", "#3E6AA8"];

let states = ["US","AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","HI","IA","ID","IL","IN","KS","KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","PR","RI","SC","SD","TN","TX","UT","VA","VT","WA","WI","WV","WY"];
states.forEach(state => {
  d3.select("#selDataset").append("option").text(state);
});

states.forEach(state => {
  d3.select("#selDataset2").append("option").text(state);
});

var baseUrl = "https://nubc-project2.herokuapp.com/api/sub_by_state2/US"
function plotting() {
  years = [];
  dollars = [];
  stateName=[];
  category = [];
  
    d3.json(baseUrl).then(function(data) {
      data.forEach(function(d) {
        years.push(d.year);
        stateName.push(d.geoname);
        category.push(d.description);
        dollars.push(d.dollars);
      });
      
      var data = [{
        x: years,
        y: dollars,
        type: "scatter",
        mode:"lines+markers",
        line: {width:4},
        marker: {
            size:8},
        transforms: [{
          type: 'groupby',
          groups: category,
          styles: [
            {target: 'Durable goods', value: {marker: {color: '#58693A'}}},
            {target: 'Nondurable goods', value: {marker: {color: 'CC8500'}}},
            {target: 'Household consumption expenditures (for services)', value: {marker: {color: '#AC370C'}}},
            {target: 'Final consumption expenditures of nonprofit institutions serving households (NPISHs)', value: {marker: {color: '#3E6AA8'}}}
          ]
        }]
        }];
        var layout = {
          title:{text:"<b>Spending by State</b>",
          font: {
              size:25,
              family: 'Gothic A1, sans-serif',
              color:'white',
              texttransform:'uppercase'
            }},
          plot_bgcolor:'rgba(0,0,0,0)',
          paper_bgcolor:'rgba(0,0,0,0)',
          showlegend:false,
          autosize:true,
        
          xaxis: {
            autorange:true,
            title:{
              text:"YEAR",
              font: {
              family: 'Gothic A1, sans-serif',
              size: 18,
              color: 'white'
            }}, 
            linecolor:'white', 
            mirror: true,
            dtick:2,
            tickfont : {
              size : 13,
              color : 'white'
            },
            gridcolor:'#4e535b'
          },
          
          yaxis: {
            autorange:true,
            title:{
              text:"EXPENDITURES IN MILLIONS ($USD)",
              font: {
              family: 'Gothic A1, sans-serif',
              size: 14,
              color: 'white',
              padding:40,
            }}, 
            linecolor:'white', 
            mirror: true,
            tickfont: {
              size : 13,
              color : 'white'
            }
          },
        };
      Plotly.newPlot("plot", data, layout);
    });
};



d3.selectAll("#selDataset").on("change", updatePlot);
function updatePlot() {
  updatedYear = [];
  updatedDollars = [];
  updatedStateName=[];
  updatedCategory = [];
  var dropDown = d3.select("#selDataset");
  var selection = dropDown.property("value");
  var selectedUrl = `https://nubc-project2.herokuapp.com/api/sub_by_state2/${selection}`
  d3.json(selectedUrl).then(function(data) {
      data.forEach(function(d) {
        updatedStateName.push(d.geoname);
        updatedCategory.push(d.description);
        updatedDollars.push(d.dollars);
        updatedYear.push(d.year);
      });
      Plotly.restyle("plot", "x", [updatedYear]);
      Plotly.restyle("plot", "y", [updatedDollars]);
    })};
plotting();





var baseUrl = "s://nubc-project2.herokuapp.com/api/sub_by_state2/US"
function plotting2() {
  years = [];
  dollars = [];
  stateName=[];
  category = [];
  
    d3.json(baseUrl).then(function(data) {
      data.forEach(function(d) {
        years.push(d.year);
        stateName.push(d.geoname);
        category.push(d.description);
        dollars.push(d.dollars);
      });
      
      var data = [{
        values: dollars,
        labels: ["Durable Goods", "Non-Profit", "Services", "Non-Durable"],
        type: 'pie',
        marker:{
          colors:colors
        },
        texttemplate: "%{percent}",
        hovertemplate: "%{label}: %{percent}<extra></extra>",
        textposition: "inside",
        textfont: {
            family: 'Gothic A1, sans-serif',
            size: 18,
            color: 'white'

        }

        }];


        var layout = {
          title:{text:"<b>Spending by State</b>",
          font: {
              size:25,
              family: 'Gothic A1, sans-serif',
              color:'white',
              texttransform:'uppercase'
            }},

          textinfo: "label+percent",
          textposition: "outside",
          automargin: true,
          plot_bgcolor:'rgba(0,0,0,0)',
          paper_bgcolor:'rgba(0,0,0,0)',
          showlegend:false,
          hovertemplate:"%{label}<br>%{dollars}",
          autosize:true
          
        };
      Plotly.newPlot("plot2", data, layout);
    });
};






d3.selectAll("#selDataset2").on("change", updatePlot2);
function updatePlot2() {
  updatedYear = [];
  updatedDollars = [];
  updatedStateName=[];
  updatedCategory = [];
  var dropDown = d3.select("#selDataset");
  var selection = dropDown.property("value");
  var selectedUrl = `https://nubc-project2.herokuapp.com/api/sub_by_state2/${selection}`
  d3.json(selectedUrl).then(function(data) {
      data.forEach(function(d) {
        updatedStateName.push(d.geoname);
        updatedCategory.push(d.description);
        updatedDollars.push(d.dollars);
        updatedYear.push(d.year);
      });
      Plotly.restyle("plot2", "values", [updatedDollars]);
    })};
plotting2();
