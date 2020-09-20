let map;
let MARKER_PATH =
  "https://developers.google.com/maps/documentation/javascript/images/marker_green";
let markers = [];
let service;
let infoWindow;

function getCity() {
  let cityName = $("h1").html();
  if (cityName === "Melbourne") {
    return new google.maps.LatLng(-37.8177089, 144.9668995);
  } else if (cityName === "Sydney") {
    return new google.maps.LatLng(-33.8676561, 151.2076709);
  } else if (cityName === "Brisbane") {
    return new google.maps.LatLng(-27.4692952, 153.0250476);
  } else {
    return false;
  }
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: getCity(),
    mapTypeControl: false,
    panControl: false,
    zoomControl: false,
    streetViewControl: false,
  });

  let request = {
    location: getCity(),
    radius: "500",
    type: ["restaurant"],
  };
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, function (results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        addMarker(results, i);
        addResult(results, i);
      }
      $("tr:odd").addClass("odd");
      $("tr:even").addClass("even");
      showIW(results);
    }
  });
}

function addMarker(result, i) {
  let markerLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let markerIcon = MARKER_PATH + markerLetter[i] + ".png";
  markers[i] = new google.maps.Marker({
    map: map,
    position: result[i].geometry.location,
    animation: google.maps.Animation.DROP,
    icon: markerIcon,
  });
}

function addResult(result, i) {
  let markerLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let markerIcon = MARKER_PATH + markerLetter[i] + ".png";
  $("#results").append(
    `<tr><td><img src="${markerIcon}"></td><td><strong>${result[i].name}</strong><br>${result[i].vicinity}</td></tr>`
  );
}

function showIW(results) {
  infoWindow = new google.maps.InfoWindow();
  for (let i = 0; i < results.length; i++) {
    markers[i].addListener("click", function () {
      infoWindow.open(map, markers[i]);
    });
  }

  $("tr").click(function () {
    //Code below to get index of tr clicked is from https://stackoverflow.com/questions/469883/how-to-find-the-index-of-a-row-in-a-table-using-jquery/57145013
    let index = $("tr").index(this);
    infoWindow.open(map, markers[index]);
  });
}
