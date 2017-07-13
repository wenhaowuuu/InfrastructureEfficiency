//////////////////////////////////////PART 1  MAP SET UP////////////////////////////////////////////////////
//1.1 SET UP BASEMAPS
var map = L.map('map', {
  center: [15.162820, -87.509107],
  zoom: 6.5
});

var Style = 'dark';

L.tileLayer('http://{s}.basemaps.cartocdn.com/'+ Style + '_all/{z}/{x}/{y}@2x.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
  subdomains: 'abcd'
}).addTo(map);

///1.2 SET UP DIFFERENT BASE MAPS
///switch basemaps///
// // NEED TO WORK ON HERE!!!
//   var layer = L.esri.basemapLayer('Topographic').addTo(map);
//   var layerLabels;
//
//   function setBasemap(basemap) {
//     if (layer) {
//       map.removeLayer(layer);
//     }
//
//     layer = L.esri.basemapLayer(basemap);
//
//     map.addLayer(layer);
//
//     if (layerLabels) {
//       map.removeLayer(layerLabels);
//     }
//
//     if (basemap === 'dark'
//      || basemap === 'light'
//    ) {
//      L.tileLayer('http://{s}.basemaps.cartocdn.com/'+ basemap + '_all/{z}/{x}/{y}@2x.png', {
//        maxZoom: 18,
//        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
//        subdomains: 'abcd'
//      }).addTo(map);
//     }
//   }
//
//   function changeBasemap(basemaps){
//     var basemap = basemaps.value;
//     setBasemap(basemap);
//   }


$('#dark').click(function(){
  $('#map0').hide();
  $('#map').show();
  Style = 'dark';
  L.tileLayer('http://{s}.basemaps.cartocdn.com/'+ Style + '_all/{z}/{x}/{y}@2x.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
    subdomains: 'abcd'
  }).addTo(map);
});
//
$('#light').click(function(){
    $('#map0').hide();
    $('#map').show();
    Style = 'light';
    L.tileLayer('http://{s}.basemaps.cartocdn.com/'+ Style + '_all/{z}/{x}/{y}@2x.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
      subdomains: 'abcd'
    }).addTo(map);
});

//LOAD SATELLITE MAP
$('#satellite').click(function(){
  $('#map').hide();
  $('#map0').show();
  mapboxgl.accessToken = 'pk.eyJ1Ijoid2VuaGFvYnJpYW4iLCJhIjoiY2owaXNrNzhnMDB4ZjJxdGoxdHdkd2VibiJ9.Cn_2Ypo7UctdNZHt6OlDHA';
  var map0 = new mapboxgl.Map({
      container: 'map0', // container id
      style: 'mapbox://styles/mapbox/satellite-v9', //stylesheet location
      center: [-88.509107, 15.162820], // starting position
      zoom: 6 // starting zoom
  });
});

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

///LOAD ESRI BASEMAPS
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



//1.3 OADING ICONS
var schoolicon = L.icon({
  iconUrl:'marker-icon.png',
  iconSize:[10,10],
  iconAnchor:[8,8],
})

//////////////////////////////////PART 2  VARIABLE AND DATA SETUP///////////////////////
///LATIN AMERICA SHP
var southamerica = "https://raw.githubusercontent.com/wenhaowuuu/InfrastructureEfficiency/master/data/south_america.geojson";

var northtriangle = "https://raw.githubusercontent.com/wenhaowuuu/InfrastructureEfficiency/master/data/guatemala.geojson";

var municipality = "https://raw.githubusercontent.com/wenhaowuuu/InfrastructureEfficiency/master/data/muni_northerntriangle.geojson";
var highschool = "http://services2.arcgis.com/So9L2GYDzmW40U1b/ArcGIS/rest/services/High_Schools_in_Triangulo_Norte/FeatureServer/0?f=pjson";
var municipality1 = "https://raw.githubusercontent.com/wenhaowuuu/InfrastructureEfficiency/master/data/muni_northerntriangle.geojson";
var highschool = "https://raw.githubusercontent.com/wenhaowuuu/InfrastructureEfficiency/master/data/High_Schools_in_Triangulo_Norte.geojson";

var layerMappedMarkers;
var slideNumber = 0;
var parsedData;
var parsedData2;
var parsedData3;
var parsedData4;
var filterFunction;

//FOR CHINA PROVINCES DATA
// var dataset0 = "https://raw.githubusercontent.com/wenhaowuuu/MidTermFinal/master/data/EconomicIndicator_Chinesecities.geojson";
// var dataset = "https://raw.githubusercontent.com/wenhaowuuu/MidTermFinal/master/data/EconomicIndicator_Chinesecities.geojson";
// var dataset2 = "https://raw.githubusercontent.com/CPLN692-MUSA611/datasets/master/geojson/housingprice_Beijing.geojson";
// var dataset3 = "https://raw.githubusercontent.com/wenhaowuuu/FinalProject/master/data/china_provincies_def.geojson";

// console.log("1st");

/////////////////////////////////PART 3  DEFINE FUNCTIONS///////////////////////
////3.1 ZOOM FUNCTIONS//////
////NATIONAL CITIES////
// $(document).ready(function() {
//   $('#national').click(function(){
//             map.removeLayer(state.drawnOnMap);
//             $.ajax(northtriangle).done(function(data) {
//               var style = {color:"#E3DF27"};
//               parsedData = JSON.parse(data);
//               layerMappedMarkers = L.geoJson(parsedData,{
//                 pointToLayer: function (feature, latlng) {
//                   link = 'https://en.wikipedia.org/wiki/' +feature.properties.CityName;
//                   html = "<div><p class = intro> Here is it<a href = 'https://en.wikipedia.org/wiki/'> Go search it!</a></p></div>";
//                   var popuptext = feature.properties.CityName + html + "<p class = intro> or copy the link below</p>" + '    ' + link;
//                   return L.circleMarker(latlng,style)
//                     .bindPopup(popuptext);
//                 }
//               }).addTo(map);
//               map.fitBounds(layerMappedMarkers.getBounds(),{
//                 padding: [10,10]
//               });
//             });
//           }
//       );
// });

//////ZOOM INTO BEIJING REAL ESTATE DATA//////
// ////BEIJING REAL ESTATE DATA////
$('#Global').click(function(){
  map.setView([15.162820, -87.509107],2);
});

$('#Regional').click(function(){
  map.setView([15.162820, -87.509107],5);
});

$('#AOI').click(function(){
  map.setView([15.162820, -87.509107],6.5);
});

/////////////////////////////////PART 4  DEFINE ANNOTATION ELEMENTS///////////////////////
//LOADING THE DESCRIPTION TEXT LINKED WITH THE SELECTED DATA
//WHEN THE FEATURE IS CLICKED: //
 var eachFeatureFunction = function(layer) {
    layer.on('click', function (event) {
    // <div id="results" style="display: none;">
    document.getElementById("results").style.display = "inline";
    console.log(layer.feature);
      $('#LENGTH').text(layer.feature.properties.m_name);
      $('#POP').text(layer.feature.properties.d_name);
      $('#30PCT').text(layer.feature.properties.gen_pov);
      $('#60PCT').text(layer.feature.properties.id);
      $('#90PCT').text(layer.feature.properties.year);
      //LINK DATA WITH THE GRAPH
      if(myChart){
        map.removeLayer(myChart);
      }
      else{
        var ctx2 = document.getElementById("myChart2").getContext('2d');
        var myChart = new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: [layer.feature.properties.m_name, "Average Poverty"],
                datasets: [{
                    label: 'Poverty',
                    data: [layer.feature.properties.gen_pov, 50],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.4)',
                        'rgba(54, 162, 235, 0.4)',

                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        // 'rgba(255, 206, 86, 1)',
                        // 'rgba(75, 192, 192, 1)',
                        // 'rgba(153, 102, 255, 1)',
                        // 'rgba(255, 159, 64, 1)'
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
          }
        }
      )};

//EXECUTION OF THE ABOVE FUNCTION
var myFilter = function(feature) {
  if (feature.properties.gen_pov===' ') {
  return false;
  }
  else {
    return true;
  }
};

//
//
// var ctx0 = document.getElementById("myChart0").getContext('2d');
// var myRadarChart = new Chart(ctx0, {
//     type: 'radar',
//     data: {
//       labels:['Road Length','Population Density','Road Quality','Institution Coverage']
//       datasets:[{
//         data:[20,10,5,3]
//       }]
//     }
// });

//RADAR CHART IMAGE
var ctx1 = document.getElementById("myChart1").getContext('2d');
var myChart = new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: 'ROSE MAP SCORE',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.4)',
                'rgba(54, 162, 235, 0.4)',
                'rgba(255, 206, 86, 0.4)',
                'rgba(75, 192, 192, 0.4)',
                'rgba(153, 102, 255, 0.4)',
                'rgba(255, 159, 64, 0.4)'
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
// var ctx2 = document.getElementById("myChart2").getContext('2d');
// var myChart = new Chart(ctx2, {
//     type: 'bar',
//     data: {
//         labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//         datasets: [{
//             label: 'Population',
//             data: [5, 2, 8, 15, 10, 4],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.4)',
//                 'rgba(54, 162, 235, 0.4)',
//                 'rgba(255, 206, 86, 0.4)',
//                 'rgba(75, 192, 192, 0.4)',
//                 'rgba(153, 102, 255, 0.4)',
//                 'rgba(255, 159, 64, 0.4)'
//             ],
//             borderColor: [
//                 'rgba(255,99,132,1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero:true
//                 }
//             }]
//         }
//     }
// });
//


/////////////////////////////////PART 5  EXECUTION PARTS////////////////////////
///5.0 ADDING SOME MARKERS
L.marker([4.674290, -74.103698]).addTo(map).bindPopup("Bogota, Colombia");
L.marker([10.395132, -75.485867]).addTo(map).bindPopup("Cartagena, Colombia");
L.marker([8.997980, -79.527990]).addTo(map).bindPopup("Panama City, Panama");
L.marker([-0.183847, -78.490285]).addTo(map).bindPopup("Quito, Ecuador");
L.marker([9.931887, -84.085539]).addTo(map).bindPopup("San Jose, Costa Rica");
L.marker([14.629373, -90.513847]).addTo(map).bindPopup("Guatemala City, Guatemala");


//5.1 SOUTH AMERICA COUNTRY LEVEL DATA
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


//5.2 MUNICIPAL LEVEL DATA
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
        layerMappedPolygons.eachLayer(eachFeatureFunction);
      })
    });



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


//CHINA REFERENCE
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
// $(document).ready(function(){
//   $.ajax(dataset3).done(function(data) {
//     parsedData3 = JSON.parse(data);
//     console.log("parsed3");
//     layerMappedPolygons = L.geoJson(parsedData3,
//       {
//         style: myStyle2,
//         filter: myFilter2,
//         pointToLayer: function (feature, latlngs) {
//           return new L.Polygon(latlngs, {
//             });
//           }
//       }).addTo(map).bindPopup(feature.properties.provincie);
//     });
// });


///CITY DATA PRESENTATION
// var layerMappedMarkers;
//CITY DATA WITH POPULATION SIZE////
// $(document).ready(function() {
//         $('#citypop').click(function(){
//           map.removeLayer(state.drawnOnMap);
//           map.removeLayer(layerMappedMarkers);
//             layerMappedMarkers = L.geoJson(state.dataSource,{
//             pointToLayer: function (feature, latlng) {
//               return new L.Marker(latlng, {
//                 icon:
//                       new L.icon({
//                       iconUrl: 'https://image.ibb.co/h1dYFk/city_icons_01.png',
//                       iconSize:     [feature.properties.Population*0.03, feature.properties.Population*0.03],                      shadowSize:   [30, 44],
//                       iconAnchor:   [20, 20],
//                   })
//                 }).bindPopup(feature.properties.CityName + ': ' + feature.properties.Population);
//             }
//           }).addTo(map);
//       });
//
//       $('#citygdp').click(function(){
//         map.removeLayer(state.drawnOnMap);
//         map.removeLayer(layerMappedMarkers);
//         layerMappedMarkers = L.geoJson(parsedData,{
//         pointToLayer: function (feature, latlng) {
//             return new L.Marker(latlng, {
//               icon:
//                   new L.icon({
//                   iconUrl: 'https://image.ibb.co/h1dYFk/city_icons_01.png',
//                   iconSize:     [feature.properties.GDP*0.003, feature.properties.GDP*0.003],
//                   shadowSize:   [30, 44],
//                   iconAnchor:   [20, 20],
//                 })
//               }).bindPopup(feature.properties.CityName + ': ' + feature.properties.GDP);
//           }
//         }).addTo(map);
//       });
//
//       $('#cityincome').click(function(){
//         map.removeLayer(state.drawnOnMap);
//         map.removeLayer(layerMappedMarkers);
//         layerMappedMarkers = L.geoJson(parsedData,{
//         pointToLayer: function (feature, latlng) {
//           return new L.Marker(latlng, {
//             icon:
//                   new L.icon({
//                   iconUrl: 'https://image.ibb.co/h1dYFk/city_icons_01.png',
//                   iconSize:     [feature.properties.PersonalAnnualIncome*0.0007, feature.properties.PersonalAnnualIncome*0.0007],
//                   shadowSize:   [30, 44],
//                   iconAnchor:   [20, 20],
//               })
//             }).bindPopup(feature.properties.CityName + ': ' + feature.properties.PersonalAnnualIncome);
//           }
//         }).addTo(map);
//       });
//     });
