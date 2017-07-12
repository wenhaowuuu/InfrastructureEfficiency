/* =====================
   You should NOT need to change this file (though you are not forbidden from doing so)
===================== */

/* =====================
  Call getAndParseData to grab our dataset through a jQuery.ajax call ($.ajax)
===================== */
//prepare the transformed data from csv

//claim the global variables:


//////////////////////////////////////PART 1  MAP SET UP////////////////////////////////////////////////////
var map = L.map('map', {
  center: [15.162820, -87.509107],
  zoom: 6.5
});

var layerMappedMarkers;
var slideNumber = 0;
var parsedData;
var parsedData2;
var parsedData3;
var parsedData4;
// var dataset0 = "https://raw.githubusercontent.com/wenhaowuuu/MidTermFinal/master/data/EconomicIndicator_Chinesecities.geojson";
// var dataset = "https://raw.githubusercontent.com/wenhaowuuu/MidTermFinal/master/data/EconomicIndicator_Chinesecities.geojson";
// var dataset2 = "https://raw.githubusercontent.com/CPLN692-MUSA611/datasets/master/geojson/housingprice_Beijing.geojson";
// var dataset3 = "https://raw.githubusercontent.com/wenhaowuuu/FinalProject/master/data/china_provincies_def.geojson";

// console.log("1st");

var filterFunction;



//LOAD CHARTS
var ctx1 = document.getElementById("myChart1").getContext('2d');
var myChart = new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: 'GDP',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});


//LOAD CHARTS 2
var ctx2 = document.getElementById("myChart2").getContext('2d');
var myChart = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: 'Population',
            data: [5, 2, 8, 15, 10, 4],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});



///LATIN AMERICA SHP
var southamerica = "https://raw.githubusercontent.com/wenhaowuuu/InfrastructureEfficiency/master/data/south_america.geojson";

// var northtriangle = "https://raw.githubusercontent.com/wenhaowuuu/InfrastructureEfficiency/master/data/guatemala.geojson";

var municipality = "https://raw.githubusercontent.com/wenhaowuuu/InfrastructureEfficiency/master/data/muni_northerntriangle.geojson";
var highschool = "http://services2.arcgis.com/So9L2GYDzmW40U1b/ArcGIS/rest/services/High_Schools_in_Triangulo_Norte/FeatureServer/0?f=pjson";


var municipality1 = "https://raw.githubusercontent.com/wenhaowuuu/InfrastructureEfficiency/master/data/muni_northerntriangle.geojson";

var highschool = "https://raw.githubusercontent.com/wenhaowuuu/InfrastructureEfficiency/master/data/High_Schools_in_Triangulo_Norte.geojson";


$(document).ready(function(){
  $.ajax(southamerica).done(function(data) {
    parsedData10 = JSON.parse(data);
    console.log(parsedData10);
    console.log("parsed10");
    console.log(parsedData10.features[0].properties.country);
    layerMappedPolygons = _.each(parsedData10,function(item){
      L.geoJson(parsedData10,
        {
          pointToLayer: function (feature, latlngs) {
            return new L.Polygon(latlngs, {
            }
          );
        }}
      ).addTo(map).bindPopup("text");
    }
  );
  });
});
// bindPopup(feature.properties.country);

//DEFINE A COLOR FUNCTION HERE


// $(document).ready(function(){
//   $.ajax(municipality).done(function(data) {
//     parsedData11 = JSON.parse(data);
//     console.log(parsedData11);
//     console.log("parsed11");
//     layerMappedPolygons = L.geoJson(parsedData11,
//       {
//         pointToLayer: function (feature, latlngs) {
//           return new L.Polygon(latlngs, {
//             });
//           }
//       }).addTo(map).bindPopup("Guatemala is a country in Central America");
//     });
// });

//GET COLOR FUNCTION

// function getColor(d) {
//   return d = 'Vivienda saludable' ? '#a6cee3' :
//          d = 'Programa OPAS- 1969, Prevención de conflictos, desarrollo de acuerdos y construcción de la paz en comunidades con personas internamente desplazadas en Chiapas, México'  ? '#1f78b4' :
//          d = 'Familias fuertes, amor y límites'  ? '#b2df8a' :
//          d = 'e-Health, acceso a servicios médicos de telemedicina en comunidades indígenas en extrema pobreza'  ? '#33a02c' :
//          d = 'Casas maternas'   ? '#fb9a99' :
//              '#FFEDA0';
//          }


var myStyle = function(feature){
  var pov = feature.properties.gen_pov;
  switch(true){
    case (pov < 10):return{color:"#EFC4AF"};
    case (pov >= 10 && pov < 30):return{color:"#D48F6E"};
    case (pov >= 30 && pov < 50):return{color:"#DB7849"};
    case (pov >= 50 && pov < 75):return{color:"#ED692A"};
    case (pov >= 75):return{color:"#F33105"};
  }
  return {};
};

//USE  OPACITY TO DEFINE
// var myStyle = function(feature){
//   var pov = feature.properties.gen_pov;
//   switch(true){
//     case (pov < 10):return{opacity:0.15};
//     case (pov >= 10 && pov < 30):return{opacity:0.3};
//     case (pov >= 30 && pov < 50):return{opacity:0.45};
//     case (pov >= 50 && pov < 75):return{opacity:0.6};
//     case (pov >= 70):return{opacity:0.75};
//   }
//   return {};
// };



// var featureGroup = L.geoJson(parsedData, {
//   style: myStyle,
//   filter: myFilter
// }).addTo(map).bindPopup("THIS AREA");




$(document).ready(function(){
  $.ajax(municipality1).done(function(data) {
    parsedData13 = JSON.parse(data);
    console.log(parsedData13);
    console.log("parsed13");
    var layerMappedPolygons = L.geoJson(parsedData13,
      {
        style: myStyle,
        pointToLayer: function (feature, latlng) {
          return new L.Polygon(latlng, {
          });
        },

        onEachFeature: function(feature,layer){
            layer.bindPopup(
              "<b>Municipality Name: </b>" +
              feature.properties.m_name +
              "</br>" +
              "<b>Poverty Rate: </b>" +
              feature.properties.gen_pov +
              "</br>" +
              "<b>Department Name: </b>" +
              feature.properties.d_name +
              "</br>" +
              "<b>Data Collected Year: </b>" +
              feature.properties.year
            )
          }
        }).addTo(map);
      })
    });


///REFERENCE ON BINDING THE INFORMATION TO THE MARKERS
// var puntos = L.geoJson(puntos_chiapas, {
//     pointToLayer: function(feature, latlng) {
//         return new L.CircleMarker(latlng, {radius: 10, fillOpacity: 0.85, color: getColor(feature.properties.Proyecto)});
//     },
//         onEachFeature: function (feature, layer) {
//             layer.bindPopup(
//                 "<b>Proyecto: </b>" +
//                 feature.properties.Proyecto +
//                 "</br>" +
//                 "<b>Ubicación: </b>" +
//                 feature.properties.Ubicación +
//                 "</br>" +
//                 "<b>Sector: </b>" +
//                 feature.properties.Sector +
//                 "</br>" +
//                 "<b>Esquema: </b>" +
//                 feature.properties.Esquema
//             )
//             }
//
//     });



//TESTING ON LOADING ON THE SATELLITE IMAGE
// $(document).ready(function(){
//   $.ajax(municipality1).done(function(data) {
//     parsedData111 = JSON.parse(data);
//     // console.log(parsedData9.features.features[0].properties.shape_area);
//     layerMappedPolygons = L.geoJson(parsedData111,
//       {
//         pointToLayer: function (feature, latlngs) {
//           return new L.Polygon(latlngs, {
//             });
//           }
//       }).addTo(map0).bindPopup("Guatemala is a country in Central America");
//     });
// });

var schoolicon = L.icon({
  iconUrl:'marker-icon.png',
  iconSize:[10,10],
  iconAnchor:[8,8],
})

//LOADING THE SCHOOL DATA
// $(document).ready(function(){
//   $.ajax(highschool).done(function(data) {
//     parsedData12 = JSON.parse(data);
//     console.log(parsedData12);
//     console.log("parsed12");
//     layerMappedPolygons = L.geoJson(parsedData12,
//       {
//         pointToLayer: function (feature, latlngs) {
//           return new L.marker(latlngs, {
//             icon:schoolicon// radius:10,
//             // color:yellow,
//             });
//           }
//       }).addTo(map).bindPopup("High Schools");
//     });
// });




//
// var icon = {
//     url: "../res/sit_marron.png", // url
//     scaledSize: new google.maps.Size(50, 50), // scaled size
//     origin: new google.maps.Point(0,0), // origin
//     anchor: new google.maps.Point(0, 0) // anchor
// };




//LOAD HIGHSCHOOL POINTS
// $(document).ready(function(){
//   $.ajax(highschool).done(function(data) {
//     parsedData12 = JSON.parse(data);
//     console.log(parsedData12);
//     console.log("parsed12");
//     // console.log(parsedData12.features[0].properties.country);
//     layerMappedPolygons = _.each(parsedData12,function(item){
//       L.geoJson(parsedData12,
//         {
//           pointToLayer: function (feature, latlngs) {
//             return new L.Polygon(latlngs, {
//             }
//           );
//         }}
//       ).addTo(map).bindPopup("text");
//     }
//   );
//   });
// });




// feature.properties.provincie);
// $(document).ready(function(){
//   $.ajax(southamerica).done(function(data) {
//     parsedData10 = JSON.parse(data);
//     console.log(parsedData10);
//     console.log("parsed10");
//     console.log(parsedData10.features[0].properties.country);
//     layerMappedPolygons = _.each(parsedData10,function(item){
//       L.geoJson(parsedData10,
//         {
//           pointToLayer: function (feature, latlngs) {
//             return new L.Polygon(latlngs, {
//             }
//           );
//         }}
//       ).addTo(map).bindPopup("text");
//     }
//   );
//   });
// });


// following geojson from shapescape is not useful!!
// var latinamerica = "http://www.shpescape.com/mix/uploads/b7670c7f9d629a6e1d304a75b01c2cba.json/";
// var BRTline = "http://www.shpescape.com/mix/uploads/7709b655cd6a057947e63d0cced5a8c7.json/";


//LOAD BRT lines
  // $(document).ready(function() {
  //   jsontoadd.locations.push({"lat":OriginLat,"lon":OriginLon},{"lat":DestLat,"lon":DestLon});
  //     console.log("points added");
  //     newurlsmproute = urlsmproute + JSON.stringify(jsontoadd);
  //     console.log(newurlsmproute);
  //     $.ajax(newurlsmproute).done(function(data){
  //       var string = data.trip.legs[0].shape;
  //       console.log("string");
  //       var decodedData = decode(string,6);
  //       console.log("decodedData");
  //       var linestring1 = turf.lineString(_.map(decodedData,function(data){
  //       return data.reverse();}));
  //       //CONVERT TO GEOJSON LINE//
  //       var lineStyle = {
  //         "color": "red",
  //         "weight": 3,
  //         "opacity":0.75,
  //         "dashArray": "8 8"
  //       };
  //       var Route = L.geoJSON(linestring1,{
  //         style:lineStyle
  //       }).addTo(map);
  //       $('#national').click(function(){
  //         map.removeLayer(Route);
  //       });
  //     });
  //   });

L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
  subdomains: 'abcd'
}).addTo(map);

///1.0 SET UP DIFFERENT BASE MAPS

///LOAD ESRI BASEMAPS
//
// require([
//    "esri/basemaps",
//    "esri/map",
//    "dojo/domReady!"
//  ], function (esriBasemaps, Map){
//    esriBasemaps.delorme = {
//      baseMapLayers: [{url: "https://services.arcgisonline.com/ArcGIS/rest/services/Specialty/DeLorme_World_Base_Map/MapServer"}
//      ],
//      thumbnailUrl: "https://www.example.com/images/thumbnail_2014-11-25_61051.png",
//      title: "Delorme"
//    };
//
//    var map = new Map("ui-map", {
//      basemap: "delorme",
//      center: [-111.879655861, 40.571338776], // long, lat
//      zoom: 13,
//      sliderStyle: "small"
//    });
// });




///switch basemaps///
$('#dark').click(function(){
  L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
    subdomains: 'abcd'
  }).addTo(map);
});

$('#light').click(function(){
  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
    subdomains: 'abcd'
  }).addTo(map);
});


$('#antique').click(function(){
  L.tileLayer('https://cartocdn_{s}.global.ssl.fastly.net/base-antique/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
    subdomains: 'abcd'
  }).addTo(map);
});

$('#eco').click(function(){
  L.tileLayer('https://cartocdn_{s}.global.ssl.fastly.net/base-eco/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
    subdomains: 'abcd'
  }).addTo(map);
});

$('#midnight').click(function(){
  L.tileLayer('https://cartocdn_{s}.global.ssl.fastly.net/base-midnight/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
    subdomains: 'abcd'
  }).addTo(map);
});




///0.1ADDING SOME MARKERS
L.marker([4.674290, -74.103698]).addTo(map).bindPopup("Bogota, Colombia");
L.marker([10.395132, -75.485867]).addTo(map).bindPopup("Cartagena, Colombia");
L.marker([8.997980, -79.527990]).addTo(map).bindPopup("Panama City, Panama");
L.marker([-0.183847, -78.490285]).addTo(map).bindPopup("Quito, Ecuador");
L.marker([9.931887, -84.085539]).addTo(map).bindPopup("San Jose, Costa Rica");
L.marker([14.629373, -90.513847]).addTo(map).bindPopup("Guatemala City, Guatemala");




///1.1 DEFINE GLOBAL VARIABLES
var url = "https://search.mapzen.com/v1/search?api_key=mapzen-Dok7vcm&size=1&text=";
var newurl = "";

var urlsmproute = "https://valhalla.mapzen.com/route?api_key=mapzen-Dok7vcm&json=";
var newurlsmproute = "";

var featureGroup = [];
var filteredfeatureGroup = [];
var jsontoadd = {"locations":[],"costing":"auto","directions_options":{"units":"miles"}};

var OriginLat = "";
var OriginLon = "";
var DestLat = "";
var DestLon = "";


///1.2 DEFINE IMAGES AND ICONS
///////////////Q1 ICON CUSTOMIZATION
var myIcon = new L.icon({
    iconUrl: 'https://image.ibb.co/b3jGbQ/city_icons_beijing_01.png',
    iconSize:     [30, 30],
    shadowSize:   [50, 64],
    iconAnchor:   [20, 20],
});

var myIcon2 = new L.icon({
    iconUrl: 'https://image.ibb.co/h1dYFk/city_icons_01.png',
    iconSize:     [30, 30],
    shadowSize:   [30, 44],
    iconAnchor:   [20, 20],
});


//////////////////////////////////////////PART 2  USER INPUT////////////////////////////////
///2.1 DEFINE ADD PAGE FUNCTION

var state = {
  slideNumber: 0,
  slideData:[
    {
      "name": "Country",
      "content": "Here presented are some quick statistics about infrastructure efficiency in the country you selected.",
    },
    {
      "name": "Cities with the Highest GDP",
      "content": "These are the cities with the highest GDP. Move your mouse over the markers to see.",
      "filter": {
        "key": "GDP",
        "comparison": "greaterThan",
        "value": 12000,
      }
    },
    {
      "name": "The Most Populated Cities",
      "content": "These are the megacities with over 9,000,000 residents.",
      "filter": {
        "key": "Population",
        "comparison": "greaterThan",
        "value": 900,
      }
    },
    {
      "name": "Cities with the Highest Per Capita Income",
      "content": "These are the richest cities.",
      "filter": {
        "key": "PersonalAnnualIncome",
        "comparison": "greaterThan",
        "value": 60000,
      },
    },
  ],
  drawnOnMap: undefined,
  dataSource: undefined
};

/* -----------------
Load data
----------------- */
$.ajax(dataset).done(function(data){
  state.dataSource = JSON.parse(data);
  // Add the first slide
  addSlide(state.slideData[0]);
});

/* -----------------
Application functions
----------------- */
// Increase state counter by one
var next = function() {
  state.slideNumber++;
};

// Increase decrease state counter by one
var previous = function() {
  state.slideNumber--;
};

// Check to see if markers have been added to the map.
// If they have, remove them. Checking first prevents an error.
var removeDrawnOnMap = function() {
  if (typeof state.drawnOnMap !== 'undefined') {
    map.removeLayer(state.drawnOnMap);
    state.drawnOnMap = undefined;
  }
};




// //////FROM JEFF'S DEMO///////
// Return a style object.
// The object should contain a color based on the feature material type.
var generateStyleObject = function(feature) {
  if (feature.properties.PersonalAnnualIncomeLevel == "high") {
    return { color: "#00DEA6" };
  } else if (feature.properties.PersonalAnnualIncomeLevel == "medium") {
    return { color: "#FFA58A" };
  } else if (feature.properties.PersonalAnnualIncomeLevel == "low") {
    return { color: "#FF3D5E" };
  } else {
    return { color: "#B591F5" };
  }
};

var drawOnMap = function(data, filter) {
  // If this particular slide includes the filter property,
  // then apply the following filter. If not, ignore this code.
  // This means I can choose whether a slide uses a filter based
  // on whether or not I include a filter on the slide. Note that
  // the first and last slides do not contain a filter.
  if (typeof filter !== 'undefined') {
    filterFunction = function(feature) {
      if (filter.comparison === "lessThan") {
        return feature.properties[filter.key] < filter.value;
      } else if (filter.comparison === "equals") {
        return feature.properties[filter.key] === filter.value;
      } else if (filter.comparison === "greaterThan") {
        return feature.properties[filter.key] > filter.value;
      }
    };
  }
  // Create a leaflet layer and add it to the map. Store this layer
  // as state.drawnOnMap. I will refer to this later when I want
  // to remove this layer from the map and when I want to use getBounds
  // to get the bounds of this layer.

state.drawnOnMap = L.geoJson(state.dataSource, {
    filter: filterFunction,
    pointToLayer: function (feature, latlng) {
      var style = generateStyleObject(feature);
      var popupText = "In 2009, " +feature.properties.CityName + " has a GDP of RMB " +feature.properties.GDP + "00 million. It has a population of " + feature.properties.Population + "0000. " + feature.properties['investment proportion'] +" of its economy is driven by investment.";
      return new L.Marker(latlng, {
        icon: myIcon2
      })
      .bindPopup(popupText);
    }
  }).addTo(map);
};


///////////////////////////////

var addSlide = function(slide) {
  drawOnMap(state.dataSource, slide.filter);
  $("#sidebar-heading").text(slide.name);
  $("#sidebar-text").text(slide.content);
};



/* -----------------
Click events
----------------- */

$('#next').click(function() {
  next();
  removeDrawnOnMap();
  // Note the use of state.slideData[state.slideNumber].
  // This returns the slide for my current state.
  addSlide(state.slideData[state.slideNumber]);
});

$('#previous').click(function() {
  previous();
  removeDrawnOnMap();
  // Note the use of state.slideData[state.slideNumber].
  // This returns the slide for my current state.
  addSlide(state.slideData[state.slideNumber]);
});

/////////////----------------------------------------------------------------------//////////////




/////////////////////////ADD MAPS FROM CARTODB//////////////////////////////////
////GLOBAL LEVEL////
////Add this map of global cities////////////////
var cartoUserName = 'wenhaowuuu';
var cartoVizId0 = '49121306-26ae-11e7-9a30-0e233c30368f';
var layerUrl0 = 'https://'+cartoUserName+'.carto.com/api/v2/viz/'+cartoVizId0+'/viz.json';
console.log('global city added');

var cartoVizId1 = 'd7586d72-26d6-11e7-9427-0e3ebc282e83';
var layerUrl1 = 'https://'+cartoUserName+'.carto.com/api/v2/viz/'+cartoVizId1+'/viz.json';
console.log('provinces added');

cartodb.createLayer(map, layerUrl0)
  .on('done', function(layer1) {
    layer1.addTo(map);
    console.log('cities added1');
    $('#beijing').click(function(){
        layer1.hide();
    });
    $('#global').click(function(){
      map.fitBounds(layer1.getBounds(),{
        padding: [10,10]
      });
    });
  }).on('error', function(err) {
    console.log(err);
  });

$('#national').click(function(){
  cartodb.createLayer(map, layerUrl1)
    .on('done', function(layer1) {
      layer1.addTo(map);
      console.log('provinces added1');
      $('#beijing').click(function(){
          layer1.hide();
      });
    }).on('error', function(err) {
      console.log(err);
    });
});



////PROVINCE WITH GDP GROWTH RATE////
///DEFINE STYLE AND FILTER///
var myStyle2=function(feature){
  var Rate = feature.properties.bbp_groei_____per_provincie__2013_;
  var Number = parseFloat(Rate);
  console.log(Number);

  if (Number<7.7){
    return{color:"#486cd3"};
  }else if(7.7<Number && Number<10.0){
    return{color:"#48d3af"};
  }else if(10.0<Number){
    return{color:"#e73115"};
  }
};
var myFilter2 = function(feature) {
  if (feature.properties.bbp_groei_____per_provincie__2013_===' ') {
  return false;
  }
  else {
    return true;
  }
};

////ADD PROVINCE WITH GDP GROWTH RATE////
$(document).ready(function(){
  $.ajax(dataset3).done(function(data) {
    parsedData3 = JSON.parse(data);
    console.log("parsed3");
    layerMappedPolygons = L.geoJson(parsedData3,
      {
        style: myStyle2,
        filter: myFilter2,
        pointToLayer: function (feature, latlngs) {
          return new L.Polygon(latlngs, {
            });
          }
      }).addTo(map).bindPopup(feature.properties.provincie);
    });
});


///CITY DATA PRESENTATION
// var layerMappedMarkers;
//CITY DATA WITH POPULATION SIZE////
$(document).ready(function() {
        $('#citypop').click(function(){
          map.removeLayer(state.drawnOnMap);
          map.removeLayer(layerMappedMarkers);
            layerMappedMarkers = L.geoJson(state.dataSource,{
            pointToLayer: function (feature, latlng) {
              return new L.Marker(latlng, {
                icon:
                      new L.icon({
                      iconUrl: 'https://image.ibb.co/h1dYFk/city_icons_01.png',
                      iconSize:     [feature.properties.Population*0.03, feature.properties.Population*0.03],                      shadowSize:   [30, 44],
                      iconAnchor:   [20, 20],
                  })
                }).bindPopup(feature.properties.CityName + ': ' + feature.properties.Population);
            }
          }).addTo(map);
      });

      $('#citygdp').click(function(){
        map.removeLayer(state.drawnOnMap);
        map.removeLayer(layerMappedMarkers);
        layerMappedMarkers = L.geoJson(parsedData,{
        pointToLayer: function (feature, latlng) {
            return new L.Marker(latlng, {
              icon:
                  new L.icon({
                  iconUrl: 'https://image.ibb.co/h1dYFk/city_icons_01.png',
                  iconSize:     [feature.properties.GDP*0.003, feature.properties.GDP*0.003],
                  shadowSize:   [30, 44],
                  iconAnchor:   [20, 20],
                })
              }).bindPopup(feature.properties.CityName + ': ' + feature.properties.GDP);
          }
        }).addTo(map);
      });

      $('#cityincome').click(function(){
        map.removeLayer(state.drawnOnMap);
        map.removeLayer(layerMappedMarkers);
        layerMappedMarkers = L.geoJson(parsedData,{
        pointToLayer: function (feature, latlng) {
          return new L.Marker(latlng, {
            icon:
                  new L.icon({
                  iconUrl: 'https://image.ibb.co/h1dYFk/city_icons_01.png',
                  iconSize:     [feature.properties.PersonalAnnualIncome*0.0007, feature.properties.PersonalAnnualIncome*0.0007],
                  shadowSize:   [30, 44],
                  iconAnchor:   [20, 20],
              })
            }).bindPopup(feature.properties.CityName + ': ' + feature.properties.PersonalAnnualIncome);
          }
        }).addTo(map);
      });
    });


////ZOOM TO CHINA NATIONAL LEVEL//////
////NATIONAL CITIES////
$(document).ready(function() {
  $('#national').click(function(){
            map.removeLayer(state.drawnOnMap);
            $.ajax(dataset0).done(function(data) {
              var style = {color:"#E3DF27"};
              parsedData = JSON.parse(data);
              layerMappedMarkers = L.geoJson(parsedData,{
                pointToLayer: function (feature, latlng) {
                  link = 'https://en.wikipedia.org/wiki/' +feature.properties.CityName;
                  html = "<div><p class = intro> Here is it<a href = 'https://en.wikipedia.org/wiki/'> Go search it!</a></p></div>";
                  var popuptext = feature.properties.CityName + html + "<p class = intro> or copy the link below</p>" + '    ' + link;
                  return L.circleMarker(latlng,style)
                    .bindPopup(popuptext);
                }
              }).addTo(map);
              map.fitBounds(layerMappedMarkers.getBounds(),{
                padding: [10,10]
              });
            });
          }
      );
});



//////ZOOM INTO BEIJING REAL ESTATE DATA//////
// ////BEIJING REAL ESTATE DATA////
$(document).ready(function() {
  $('#bogota').click(function(){
    $.ajax(dataset2).done(function(data) {
      parsedData2 = JSON.parse(data);
      layerMappedMarkers = L.geoJson(parsedData2,{
        pointToLayer: function (feature, latlng) {

          html = "<div><p class = intro> Here is it<a href = 'https://en.wikipedia.org/wiki/'> Go search it!</a></p></div>";
          var popuptext = feature.properties.name + html + "<p class = listing> This property was built in </p>" +feature.properties.yearbuilt+ "<p class = listing> The price per sq meter is </p>" + "RMB " +feature.properties.priceperm2;
          return new L.Marker(latlng, {
            // Specify which custom icon you want to use
            icon: myIcon
          }).bindPopup(popuptext).addEventListener("click",
            function(e){
              DestLon = feature.geometry.coordinates[0];
              DestLat = feature.geometry.coordinates[1];
              console.log(DestLon,DestLat);
          });
        }
      }).addTo(map);
      // map.setCenter(4.678396, -74.083786);
      map.fitBounds(layerMappedMarkers.getBounds(),{
        padding: [10,10]
      });
      $('#national').click(function(){
        map.removeLayer(layerMappedMarkers);
      });
    });
  });
});


///2.2 SEARCH AND ADD SIMPLE ROUTE TO MAP
////SHOW THE SEARCH RESULT////
$(document).ready(function(){
  $('#Search').click(function(){
    newurl = url + $('#dest').val();
    console.log(newurl);
    $.ajax(newurl).done(function(data){
      console.log("downloaded");
      var parsedData4 = JSON.parse(JSON.stringify(data));
      console.log("parsed");
      featureGroup.push(L.geoJSON(parsedData4,{
      }).addTo(map));
      $('#national').click(function(){
        map.removeLayer(featureGroup);
      });
      OriginLat = data.features[0].geometry.coordinates[1];
      OriginLon = data.features[0].geometry.coordinates[0];
      console.log("added");
      });
    });
});

////SHOW THE OPTIMAL ROUTE////
$('#Route').click(function(){
  $(document).ready(function() {
    jsontoadd.locations.push({"lat":OriginLat,"lon":OriginLon},{"lat":DestLat,"lon":DestLon});
      console.log("points added");
      newurlsmproute = urlsmproute + JSON.stringify(jsontoadd);
      console.log(newurlsmproute);
      $.ajax(newurlsmproute).done(function(data){
        var string = data.trip.legs[0].shape;
        console.log("string");
        var decodedData = decode(string,6);
        console.log("decodedData");
        var linestring1 = turf.lineString(_.map(decodedData,function(data){
        return data.reverse();}));
        //CONVERT TO GEOJSON LINE//
        var lineStyle = {
          "color": "red",
          "weight": 3,
          "opacity":0.75,
          "dashArray": "8 8"
        };
        var Route = L.geoJSON(linestring1,{
          style:lineStyle
        }).addTo(map);
        $('#national').click(function(){
          map.removeLayer(Route);
        });
      });
    });
});
