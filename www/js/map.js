mapboxgl.accessToken = 'pk.eyJ1Ijoic290YXJvdGFuYWthIiwiYSI6ImNrcDNubm1oZDFmbmUycGxneWQ2ZXJ6emQifQ.18VzITJnsmQFIDvnq0t3ag';
var monument = [139.7673068, 35.6809591];
// [NCMB] APIキー設定
var appKey = "4bf47416a4deb54e6b0aa996ecdea60fbf1371817b99fb5234d2602b99a147c9";
var clientKey = "5b62c1ce281cf1636bc8d6569dc01b268b55128c614569551a0abdcfcc10f461";

// [NCMB] SDKの初期化
var ncmb = new NCMB(appKey, clientKey);
/*
navigator.geolocation.getCurrentPosition(function(position){ // 現在地取得
var lng = position.coords.longitude;
var lat = position.coords.latitude;
mapView(lng, lat);
});*/
var lng = 139.710106;
var lat = 35.64669;

var map = new mapboxgl.Map({
  container: document.getElementById("map"),
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [lng, lat],//monument,
  zoom: 15
});

var Shops = ncmb.DataStore("Shop");
var Features = [];
Shops.fetchAll().then(function (results) {
  for (var i = 0; i < results.length; i++) {
    var objectshop = results[i];
    var Feature =
      {
        'type': 'Feature',
        'properties': {
          'shopname': objectshop.shopname,
          'addres': objectshop.street_addres,
          'iconSize': [60, 60]
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [objectshop.lng, objectshop.lat]
        }
      }
    Features.push(Feature);
  }
  setMaker();
})
  .catch(function (err) {
    console.log(err);
  });

var geojson = {
  'type': 'FeatureCollection',
  'features': Features
};

function setMaker() {
  // add markers to map
  geojson.features.forEach(function (marker) {
    // create a DOM element for the marker
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage =
      'url(https://placekitten.com/g/' +
      marker.properties.iconSize.join('/') +
      '/)';
    el.style.width = marker.properties.iconSize[0] + 'px';
    el.style.height = marker.properties.iconSize[1] + 'px';

    console.log(marker.properties);
    el.addEventListener('click', function () {
      var obj = { shopname: marker.properties.shopname, addres: marker.properties.addres };
      sessionStorage.clear();
      sessionStorage.setItem("info", JSON.stringify(obj));
      window.location.href = "information.html";
    });

    var popup = new mapboxgl.Popup({ offset: 25 }).setText(
      "aaa"
    );

    // add marker to map
    new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .setPopup(popup) // sets a popup on this marker
      .addTo(map);
  });
}

function search(){
  window.location.href = "search.html";
}
/*
var popup = new mapboxgl.Popup({ offset: 25 }).setText(
  "iiiiiiii"
);
var el = document.createElement('div');
el.id = 'marker';
// create the marker
new mapboxgl.Marker(el).setLngLat(monument).setPopup(popup).addTo(map);
alert(object.shopname);
*/

