

//Themes begin
am4core.useTheme(am4themes_animated);
// Themes end
am4core.globalAdapter.addAll(2)
var chart = am4core.create("chartdiv", am4charts.XYChart);
chart.padding(20, 40, 20, 20);
chart.responsive.enabled = true;
chart.numberFormatter.numberFormat = "#,###.";
var label = chart.plotContainer.createChild(am4core.Label);
label.x = am4core.percent(97);
label.y = am4core.percent(95);
label.horizontalCenter = "right";
label.verticalCenter = "middle";
label.dx = -15;
label.fontSize = 40;
var playButton = chart.plotContainer.createChild(am4core.PlayButton);
playButton.x = am4core.percent(90);
playButton.y = am4core.percent(95);
playButton.dy = -2;
playButton.verticalCenter = "middle";
playButton.events.on("toggled", function(event) {
  if (event.target.isActive) {
    play();
  }
  else {
    stop();
  }
})

var stepDuration = 4000;

var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.dataFields.category = "description";
categoryAxis.renderer.minGridDistance = 1;
categoryAxis.renderer.inversed = true;
categoryAxis.renderer.grid.template.disabled = false;
categoryAxis.renderer.labels.template.fill = am4core.color("#fff");
categoryAxis.renderer.labels.template.textAlign = 'end';
categoryAxis.renderer.labels.template.padding(0, 20, 0, 0);
categoryAxis.renderer.labels.template.fontSize=15;
/* categoryAxis.renderer.grid.template.stroke = "#fff";
categoryAxis.renderer.grid.template.strokeWidth = 2; 
categoryAxis.renderer.grid.template.strokeOpacity = .8; //make the change more visible for demo purposes
// base/zero line
categoryAxis.renderer.baseGrid.stroke = "#ff0000";*/

var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
valueAxis.min = 0;
valueAxis.rangeChangeEasing = am4core.ease.linear;
valueAxis.rangeChangeDuration = stepDuration;
valueAxis.extraMax = 0.1;
/* valueAxis.renderer.grid.template.stroke = "#fff";
valueAxis.renderer.grid.template.strokeWidth = 2; 
valueAxis.renderer.grid.template.strokeOpacity = .8; //make the change more visible for demo purposes
// base/zero line
valueAxis.renderer.baseGrid.stroke = "#ff0000";*/

var series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.categoryY = "description";
series.dataFields.valueX = "dollars";
series.tooltipText = "{valueX.value}"
series.columns.template.strokeOpacity = 0;
series.columns.template.column.cornerRadiusBottomRight = 5;
series.columns.maxColumns = 1
series.columns.template.column.cornerRadiusTopRight = 5;
series.interpolationDuration = stepDuration;
series.interpolationEasing = am4core.ease.linear;
var labelBullet = series.bullets.push(new am4charts.LabelBullet())
labelBullet.label.horizontalCenter = "right";
labelBullet.label.text = "{values.valueX.workingValue}";
labelBullet.label.fontSize=13;
labelBullet.label.textAlign = "end";
labelBullet.label.fill = am4core.color("#fff");
labelBullet.label.dx = -10;
labelBullet.label.maxColumns = 1;
chart.zoomOutButton.disabled = true;
label.fill = am4core.color("#fff");
label.x = am4core.percent(90);

chart.colors.list = [

    /* CSS HEX */
    am4core.color("#3e6aa8ff"),
    am4core.color("#274268ff"),
    am4core.color("#1c304aff"),
    am4core.color("#799150ff"),
    am4core.color("#58693aff"),
    am4core.color("#424f2bff"),
    am4core.color("#742407"),
    am4core.color("#AC370C"),
    am4core.color("#D4420C"),
    am4core.color("#A36A00"),
    am4core.color("#CC8500"),
    am4core.color("#E09200")
  ];


  /* CSS HEX */

// as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
series.columns.template.adapter.add("fill", function(fill, target){
  return chart.colors.getIndex(target.dataItem.index);
});

var year = 2005;
label.text = year.toString();

var interval;

function play() {
  interval = setInterval(function(){
    nextYear();
  }, stepDuration)
  nextYear();
}

function stop() {
  if (interval) {
    clearInterval(interval);
  }
}

function nextYear() {
  year++

  if (year > 2019) {
    year = 2005;
  }

  var newData = allData[year];
  var itemsWithNonZero = 0;
  for (var i = 0; i < chart.data.length; i++) {
    chart.data[i].dollars = newData[i].dollars;
    if (chart.data[i].dollars > 0) {
      itemsWithNonZero++;
      
    }
  }
  
    if(itemsWithNonZero > 25){
    itemsWithNonZero = 25
  }
  
  



  chart.invalidateRawData();
  label.text = year.toString();

  categoryAxis.zoom({ start: 0, end: itemsWithNonZero / categoryAxis.dataItems.length });
}


categoryAxis.sortBySeries = series;

allData = {
    "1997": [
    {
    "description": "Motor vehicles and parts",
    "dollars": 293082.5
    },
    {
    "description": "Furnishings and durable household equipment",
    "dollars": 160490.2
    },
    {
    "description": "Recreational goods and vehicles",
    "dollars": 174632
    },
    {
    "description": "Food and beverages purchased for off-premises consumption",
    "dollars": 474777.2
    },
    {
    "description": "Clothing and footwear",
    "dollars": 247496.1
    },
    {
    "description": "Gasoline and other energy goods",
    "dollars": 147661.2
    },
    {
    "description": "Housing and utilities",
    "dollars": 1009822.3
    },
    {
    "description": "Health care",
    "dollars": 790947.7
    },
    {
    "description": "Transportation services",
    "dollars": 211803.2
    },
    {
    "description": "Recreation services",
    "dollars": 208317
    },
    {
    "description": "Food services and accommodations",
    "dollars": 343427.5
    },
    {
    "description": "Financial services and insurance",
    "dollars": 408884.2
    }
    ],
    "1998": [
    {
    "description": "Motor vehicles and parts",
    "dollars": 320204.7
    },
    {
    "description": "Furnishings and durable household equipment",
    "dollars": 173579.1
    },
    {
    "description": "Recreational goods and vehicles",
    "dollars": 191359.7
    },
    {
    "description": "Food and beverages purchased for off-premises consumption",
    "dollars": 487437
    },
    {
    "description": "Clothing and footwear",
    "dollars": 257805.3
    },
    {
    "description": "Gasoline and other energy goods",
    "dollars": 132354.7
    },
    {
    "description": "Housing and utilities",
    "dollars": 1065472.1
    },
    {
    "description": "Health care",
    "dollars": 832045.1
    },
    {
    "description": "Transportation services",
    "dollars": 225179.9
    },
    {
    "description": "Recreation services",
    "dollars": 220204.3
    },
    {
    "description": "Food services and accommodations",
    "dollars": 361836.3
    },
    {
    "description": "Financial services and insurance",
    "dollars": 446059.4
    }
    ],
    "1999": [
    {
    "description": "Motor vehicles and parts",
    "dollars": 350730.2
    },
    {
    "description": "Furnishings and durable household equipment",
    "dollars": 191184.9
    },
    {
    "description": "Recreational goods and vehicles",
    "dollars": 210921.5
    },
    {
    "description": "Food and beverages purchased for off-premises consumption",
    "dollars": 515530.4
    },
    {
    "description": "Clothing and footwear",
    "dollars": 271096.9
    },
    {
    "description": "Gasoline and other energy goods",
    "dollars": 146544.9
    },
    {
    "description": "Housing and utilities",
    "dollars": 1123133.2
    },
    {
    "description": "Health care",
    "dollars": 863589.3
    },
    {
    "description": "Transportation services",
    "dollars": 241343.8
    },
    {
    "description": "Recreation services",
    "dollars": 238055.3
    },
    {
    "description": "Food services and accommodations",
    "dollars": 380330.7
    },
    {
    "description": "Financial services and insurance",
    "dollars": 486397.3
    }
    ],
    "2000": [
    {
    "description": "Motor vehicles and parts",
    "dollars": 363227.6
    },
    {
    "description": "Furnishings and durable household equipment",
    "dollars": 208105.7
    },
    {
    "description": "Recreational goods and vehicles",
    "dollars": 230858.6
    },
    {
    "description": "Food and beverages purchased for off-premises consumption",
    "dollars": 540578.4
    },
    {
    "description": "Clothing and footwear",
    "dollars": 280831.4
    },
    {
    "description": "Gasoline and other energy goods",
    "dollars": 184515.6
    },
    {
    "description": "Housing and utilities",
    "dollars": 1198555.7
    },
    {
    "description": "Health care",
    "dollars": 918424.6
    },
    {
    "description": "Transportation services",
    "dollars": 261279.3
    },
    {
    "description": "Recreation services",
    "dollars": 254390
    },
    {
    "description": "Food services and accommodations",
    "dollars": 408781.2
    },
    {
    "description": "Financial services and insurance",
    "dollars": 542972.5
    }
    ],
    "2001": [
    {
    "description": "Motor vehicles and parts",
    "dollars": 383289.5
    },
    {
    "description": "Furnishings and durable household equipment",
    "dollars": 214940.1
    },
    {
    "description": "Recreational goods and vehicles",
    "dollars": 234933.1
    },
    {
    "description": "Food and beverages purchased for off-premises consumption",
    "dollars": 564002.8
    },
    {
    "description": "Clothing and footwear",
    "dollars": 277868.4
    },
    {
    "description": "Gasoline and other energy goods",
    "dollars": 177985.9
    },
    {
    "description": "Housing and utilities",
    "dollars": 1287493.2
    },
    {
    "description": "Health care",
    "dollars": 996564
    },
    {
    "description": "Transportation services",
    "dollars": 259800.4
    },
    {
    "description": "Recreation services",
    "dollars": 262290.3
    },
    {
    "description": "Food services and accommodations",
    "dollars": 419663.8
    },
    {
    "description": "Financial services and insurance",
    "dollars": 525665.1
    }
    ],
    "2002": [
    {
    "description": "Motor vehicles and parts",
    "dollars": 401346.5
    },
    {
    "description": "Furnishings and durable household equipment",
    "dollars": 225868.3
    },
    {
    "description": "Recreational goods and vehicles",
    "dollars": 244773.3
    },
    {
    "description": "Food and beverages purchased for off-premises consumption",
    "dollars": 575052.2
    },
    {
    "description": "Clothing and footwear",
    "dollars": 278834.8
    },
    {
    "description": "Gasoline and other energy goods",
    "dollars": 167899.8
    },
    {
    "description": "Housing and utilities",
    "dollars": 1333583.1
    },
    {
    "description": "Health care",
    "dollars": 1082872.1
    },
    {
    "description": "Transportation services",
    "dollars": 251873.5
    },
    {
    "description": "Recreation services",
    "dollars": 271403.1
    },
    {
    "description": "Food services and accommodations",
    "dollars": 436310.5
    },
    {
    "description": "Financial services and insurance",
    "dollars": 534730
    }
    ],
    "2003": [
    {
    "description": "Motor vehicles and parts",
    "dollars": 401518.3
    },
    {
    "description": "Furnishings and durable household equipment",
    "dollars": 235161
    },
    {
    "description": "Recreational goods and vehicles",
    "dollars": 259466.2
    },
    {
    "description": "Food and beverages purchased for off-premises consumption",
    "dollars": 599580.2
    },
    {
    "description": "Clothing and footwear",
    "dollars": 285295.5
    },
    {
    "description": "Gasoline and other energy goods",
    "dollars": 196411.7
    },
    {
    "description": "Housing and utilities",
    "dollars": 1394119.2
    },
    {
    "description": "Health care",
    "dollars": 1154049.4
    },
    {
    "description": "Transportation services",
    "dollars": 259618.3
    },
    {
    "description": "Recreation services",
    "dollars": 288864.8
    },
    {
    "description": "Food services and accommodations",
    "dollars": 462716
    },
    {
    "description": "Financial services and insurance",
    "dollars": 560280.4
    }
    ],
    "2004": [
    {
    "description": "Motor vehicles and parts",
    "dollars": 409310.9
    },
    {
    "description": "Furnishings and durable household equipment",
    "dollars": 254310.4
    },
    {
    "description": "Recreational goods and vehicles",
    "dollars": 284842.1
    },
    {
    "description": "Food and beverages purchased for off-premises consumption",
    "dollars": 632604.5
    },
    {
    "description": "Clothing and footwear",
    "dollars": 297379.6
    },
    {
    "description": "Gasoline and other energy goods",
    "dollars": 232732.5
    },
    {
    "description": "Housing and utilities",
    "dollars": 1469081.8
    },
    {
    "description": "Health care",
    "dollars": 1238873.2
    },
    {
    "description": "Transportation services",
    "dollars": 271149.6
    },
    {
    "description": "Recreation services",
    "dollars": 311478.7
    },
    {
    "description": "Food services and accommodations",
    "dollars": 498229.4
    },
    {
    "description": "Financial services and insurance",
    "dollars": 605533.1
    }
    ],
    "2005": [
    {
    "description": "Motor vehicles and parts",
    "dollars": 409954.2
    },
    {
    "description": "Furnishings and durable household equipment",
    "dollars": 271273.5
    },
    {
    "description": "Recreational goods and vehicles",
    "dollars": 306400.9
    },
    {
    "description": "Food and beverages purchased for off-premises consumption",
    "dollars": 668216.1
    },
    {
    "description": "Clothing and footwear",
    "dollars": 310509.3
    },
    {
    "description": "Gasoline and other energy goods",
    "dollars": 283769.9
    },
    {
    "description": "Housing and utilities",
    "dollars": 1583620.5
    },
    {
    "description": "Health care",
    "dollars": 1320533.1
    },
    {
    "description": "Transportation services",
    "dollars": 283884.3
    },
    {
    "description": "Recreation services",
    "dollars": 328124
    },
    {
    "description": "Food services and accommodations",
    "dollars": 533632.4
    },
    {
    "description": "Financial services and insurance",
    "dollars": 659045.3
    }
    ],
    "2006": [
    {
    "description": "Motor vehicles and parts",
    "dollars": 394949.3
    },
    {
    "description": "Furnishings and durable household equipment",
    "dollars": 283597.6
    },
    {
    "description": "Recreational goods and vehicles",
    "dollars": 326319.7
    },
    {
    "description": "Food and beverages purchased for off-premises consumption",
    "dollars": 700260.4
    },
    {
    "description": "Clothing and footwear",
    "dollars": 320022.8
    },
    {
    "description": "Gasoline and other energy goods",
    "dollars": 319649.8
    },
    {
    "description": "Housing and utilities",
    "dollars": 1682373.9
    },
    {
    "description": "Health care",
    "dollars": 1391891.6
    },
    {
    "description": "Transportation services",
    "dollars": 297056.4
    },
    {
    "description": "Recreation services",
    "dollars": 351278.2
    },
    {
    "description": "Food services and accommodations",
    "dollars": 570600
    },
    {
    "description": "Financial services and insurance",
    "dollars": 694972
    }
    ],
    "2007": [
    {
    "description": "Motor vehicles and parts",
    "dollars": 400573
    },
    {
    "description": "Furnishings and durable household equipment",
    "dollars": 283457.6
    },
    {
    "description": "Recreational goods and vehicles",
    "dollars": 339189.9
    },
    {
    "description": "Food and beverages purchased for off-premises consumption",
    "dollars": 737332
    },
    {
    "description": "Clothing and footwear",
    "dollars": 323474.1
    },
    {
    "description": "Gasoline and other energy goods",
    "dollars": 345546.6
    },
    {
    "description": "Housing and utilities",
    "dollars": 1758182.3
    },
    {
    "description": "Health care",
    "dollars": 1478209
    },
    {
    "description": "Transportation services",
    "dollars": 307553.5
    },
    {
    "description": "Recreation services",
    "dollars": 375593.8
    },
    {
    "description": "Food services and accommodations",
    "dollars": 601498.1
    },
    {
    "description": "Financial services and insurance",
    "dollars": 737182.8
    }
    ],
    "2008": [
    {
    "description": "Motor vehicles and parts",
    "dollars": 343337.2
    },
    {
    "description": "Furnishings and durable household equipment",
    "dollars": 264348.6
    },
    {
    "description": "Recreational goods and vehicles",
    "dollars": 328061.1
    },
    {
    "description": "Food and beverages purchased for off-premises consumption",
    "dollars": 769085.5
    },
    {
    "description": "Clothing and footwear",
    "dollars": 317372.5
    },
    {
    "description": "Gasoline and other energy goods",
    "dollars": 391088.8
    },
    {
    "description": "Housing and utilities",
    "dollars": 1835359.2
    },
    {
    "description": "Health care",
    "dollars": 1555346.2
    },
    {
    "description": "Transportation services",
    "dollars": 312689.1
    },
    {
    "description": "Recreation services",
    "dollars": 389069.5
    },
    {
    "description": "Food services and accommodations",
    "dollars": 620152.1
    },
    {
    "description": "Financial services and insurance",
    "dollars": 756643.2
    }
    ],
    "2009": [
    {
    "description": "Motor vehicles and parts",
    "dollars": 318583.1
    },
    {
    "description": "Furnishings and durable household equipment",
    "dollars": 238275.2
    },
    {
    "description": "Recreational goods and vehicles",
    "dollars": 297516.5
    },
    {
    "description": "Food and beverages purchased for off-premises consumption",
    "dollars": 772929.7
    },
    {
    "description": "Clothing and footwear",
    "dollars": 304042.6
    },
    {
    "description": "Gasoline and other energy goods",
    "dollars": 287027.5
    },
    {
    "description": "Housing and utilities",
    "dollars": 1877656.3
    },
    {
    "description": "Health care",
    "dollars": 1632736.9
    },
    {
    "description": "Transportation services",
    "dollars": 297361.9
    },
    {
    "description": "Recreation services",
    "dollars": 388399.3
    },
    {
    "description": "Food services and accommodations",
    "dollars": 612688.2
    },
    {
    "description": "Financial services and insurance",
    "dollars": 711260.5
    }
    ],
    "2010": [
    {
    "description": "Motor vehicles and parts",
    "dollars": 344466.2
    },
    {
    "description": "Furnishings and durable household equipment",
    "dollars": 240924.2
    },
    {
    "description": "Recreational goods and vehicles",
    "dollars": 298612.2
    },
    {
    "description": "Food and beverages purchased for off-premises consumption",
    "dollars": 786866.1
    },
    {
    "description": "Clothing and footwear",
    "dollars": 316611.3
    },
    {
    "description": "Gasoline and other energy goods",
    "dollars": 336717.6
    },
    {
    "description": "Housing and utilities",
    "dollars": 1903886
    },
    {
    "description": "Health care",
    "dollars": 1699558.9
    },
    {
    "description": "Transportation services",
    "dollars": 305153.4
    },
    {
    "description": "Recreation services",
    "dollars": 403742.9
    },
    {
    "description": "Food services and accommodations",
    "dollars": 635670.7
    },
    {
    "description": "Financial services and insurance",
    "dollars": 754426.5
    }
    ],
    "2011": [
    {
    "description": "Motor vehicles and parts",
    "dollars": 365178.4
    },
    {
    "description": "Furnishings and durable household equipment",
    "dollars": 246861.8
    },
    {
    "description": "Recreational goods and vehicles",
    "dollars": 305352.7
    },
    {
    "description": "Food and beverages purchased for off-premises consumption",
    "dollars": 819542.4
    },
    {
    "description": "Clothing and footwear",
    "dollars": 332585.6
    },
    {
    "description": "Gasoline and other energy goods",
    "dollars": 413800.9
    },
    {
    "description": "Housing and utilities",
    "dollars": 1955928.9
    },
    {
    "description": "Health care",
    "dollars": 1757146.1
    },
    {
    "description": "Transportation services",
    "dollars": 328362.2
    },
    {
    "description": "Recreation services",
    "dollars": 409015.1
    },
    {
    "description": "Food services and accommodations",
    "dollars": 669464.7
    },
    {
    "description": "Financial services and insurance",
    "dollars": 797915.3
    }
    ],
    "2012": [
    {
    "description": "Housing and utilities",
    "dollars": 1996329.9
    },
    {
    "description": "Motor vehicles and parts",
    "dollars": 396607.9
    },
    {
    "description": "Furnishings and durable household equipment",
    "dollars": 253938
    },
    {
    "description": "Recreational goods and vehicles",
    "dollars": 311821.3
    },
    {
    "description": "Food and beverages purchased for off-premises consumption",
    "dollars": 846198
    },
    {
    "description": "Clothing and footwear",
    "dollars": 345219.5
    },
    {
    "description": "Gasoline and other energy goods",
    "dollars": 421934.6
    },
    {
    "description": "Health care",
    "dollars": 1821293.4
    },
    {
    "description": "Transportation services",
    "dollars": 341050.3
    },
    {
    "description": "Recreation services",
    "dollars": 430769.4
    },
    {
    "description": "Food services and accommodations",
    "dollars": 704927.9
    },
    {
    "description": "Financial services and insurance",
    "dollars": 820136.5
    }
    ],
    "2013": [
    {
    "description": "Motor vehicles and parts",
    "dollars": 417533
    },
    {
    "description": "Furnishings and durable household equipment",
    "dollars": 263589.7
    },
    {
    "description": "Recreational goods and vehicles",
    "dollars": 321560.9
    },
    {
    "description": "Food and beverages purchased for off-premises consumption",
    "dollars": 863994
    },
    {
    "description": "Clothing and footwear",
    "dollars": 350533.1
    },
    {
    "description": "Gasoline and other energy goods",
    "dollars": 418248.3
    },
    {
    "description": "Housing and utilities",
    "dollars": 2055263.3
    },
    {
    "description": "Health care",
    "dollars": 1858240.3
    },
    {
    "description": "Transportation services",
    "dollars": 359937
    },
    {
    "description": "Recreation services",
    "dollars": 447059.8
    },
    {
    "description": "Food services and accommodations",
    "dollars": 732250.6
    },
    {
    "description": "Financial services and insurance",
    "dollars": 858389.4
    }
    ],
    "2014": [
    {
    "description": "Motor vehicles and parts",
    "dollars": 441992
    },
    {
    "description": "Furnishings and durable household equipment",
    "dollars": 276166.5
    },
    {
    "description": "Recreational goods and vehicles",
    "dollars": 329928
    },
    {
    "description": "Food and beverages purchased for off-premises consumption",
    "dollars": 896855.4
    },
    {
    "description": "Clothing and footwear",
    "dollars": 360750.6
    },
    {
    "description": "Gasoline and other energy goods",
    "dollars": 403343.7
    },
    {
    "description": "Housing and utilities",
    "dollars": 2149905.8
    },
    {
    "description": "Health care",
    "dollars": 1940547.2
    },
    {
    "description": "Transportation services",
    "dollars": 383041.7
    },
    {
    "description": "Recreation services",
    "dollars": 466594.5
    },
    {
    "description": "Food services and accommodations",
    "dollars": 776933.8
    },
    {
    "description": "Financial services and insurance",
    "dollars": 908093.6
    }
    ],
    "2015": [
    {
    "description": "Motor vehicles and parts",
    "dollars": 475346
    },
    {
    "description": "Furnishings and durable household equipment",
    "dollars": 294219.7
    },
    {
    "description": "Recreational goods and vehicles",
    "dollars": 336482.1
    },
    {
    "description": "Food and beverages purchased for off-premises consumption",
    "dollars": 920955.4
    },
    {
    "description": "Clothing and footwear",
    "dollars": 368734.4
    },
    {
    "description": "Gasoline and other energy goods",
    "dollars": 309433.8
    },
    {
    "description": "Housing and utilities",
    "dollars": 2257891.2
    },
    {
    "description": "Health care",
    "dollars": 2057323.2
    },
    {
    "description": "Transportation services",
    "dollars": 398671.3
    },
    {
    "description": "Recreation services",
    "dollars": 491666.5
    },
    {
    "description": "Food services and accommodations",
    "dollars": 832868.4
    },
    {
    "description": "Financial services and insurance",
    "dollars": 957305.2
    }
    ],
    "2016": [
    {
    "description": "Motor vehicles and parts",
    "dollars": 485553.6
    },
    {
    "description": "Furnishings and durable household equipment",
    "dollars": 309367.1
    },
    {
    "description": "Recreational goods and vehicles",
    "dollars": 351429.7
    },
    {
    "description": "Food and beverages purchased for off-premises consumption",
    "dollars": 939860.5
    },
    {
    "description": "Clothing and footwear",
    "dollars": 376363.7
    },
    {
    "description": "Gasoline and other energy goods",
    "dollars": 275038
    },
    {
    "description": "Housing and utilities",
    "dollars": 2358451.8
    },
    {
    "description": "Health care",
    "dollars": 2165095.7
    },
    {
    "description": "Transportation services",
    "dollars": 419354.3
    },
    {
    "description": "Recreation services",
    "dollars": 518259
    },
    {
    "description": "Food services and accommodations",
    "dollars": 873236
    },
    {
    "description": "Financial services and insurance",
    "dollars": 983969.3
    }
    ],
    "2017": [
    {
    "description": "Motor vehicles and parts",
    "dollars": 503642.6
    },
    {
    "description": "Furnishings and durable household equipment",
    "dollars": 324744.9
    },
    {
    "description": "Recreational goods and vehicles",
    "dollars": 374173.3
    },
    {
    "description": "Food and beverages purchased for off-premises consumption",
    "dollars": 970152.7
    },
    {
    "description": "Clothing and footwear",
    "dollars": 379964.6
    },
    {
    "description": "Gasoline and other energy goods",
    "dollars": 308992.7
    },
    {
    "description": "Housing and utilities",
    "dollars": 2459513.5
    },
    {
    "description": "Health care",
    "dollars": 2248280.8
    },
    {
    "description": "Transportation services",
    "dollars": 440328.2
    },
    {
    "description": "Recreation services",
    "dollars": 538527.7
    },
    {
    "description": "Food services and accommodations",
    "dollars": 913718.2
    },
    {
    "description": "Financial services and insurance",
    "dollars": 1052396.5
    }
    ],
    "2018": [
    {
    "description": "Motor vehicles and parts",
    "dollars": 523226.5
    },
    {
    "description": "Furnishings and durable household equipment",
    "dollars": 343326.3
    },
    {
    "description": "Recreational goods and vehicles",
    "dollars": 399002.7
    },
    {
    "description": "Food and beverages purchased for off-premises consumption",
    "dollars": 998796.4
    },
    {
    "description": "Clothing and footwear",
    "dollars": 394236.8
    },
    {
    "description": "Gasoline and other energy goods",
    "dollars": 349237.8
    },
    {
    "description": "Housing and utilities",
    "dollars": 2570215.3
    },
    {
    "description": "Health care",
    "dollars": 2345008.1
    },
    {
    "description": "Transportation services",
    "dollars": 466687.5
    },
    {
    "description": "Recreation services",
    "dollars": 561805.2
    },
    {
    "description": "Food services and accommodations",
    "dollars": 961222.1
    },
    {
    "description": "Financial services and insurance",
    "dollars": 1119528.6
    }
    ],
    "2019": [
    {
    "description": "Motor vehicles and parts",
    "dollars": 521845.9
    },
    {
    "description": "Furnishings and durable household equipment",
    "dollars": 357440.3
    },
    {
    "description": "Recreational goods and vehicles",
    "dollars": 433364.4
    },
    {
    "description": "Food and beverages purchased for off-premises consumption",
    "dollars": 1025661.7
    },
    {
    "description": "Clothing and footwear",
    "dollars": 403465.8
    },
    {
    "description": "Gasoline and other energy goods",
    "dollars": 335441.7
    },
    {
    "description": "Housing and utilities",
    "dollars": 2681180.4
    },
    {
    "description": "Health care",
    "dollars": 2450839.1
    },
    {
    "description": "Transportation services",
    "dollars": 483421.3
    },
    {
    "description": "Recreation services",
    "dollars": 580444.7
    },
    {
    "description": "Food services and accommodations",
    "dollars": 999500.8
    },
    {
    "description": "Financial services and insurance",
    "dollars": 1176055.2
    }
    ]
    }



chart.data = JSON.parse(JSON.stringify(allData[year]));
categoryAxis.zoom({ start: 0, end: 1 / chart.data.length });

series.events.on("inited", function() {
  setTimeout(function() {
    playButton.isActive = true; // thisstarts interval
  }, 2000)
})


