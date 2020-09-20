let map;
let MARKER_PATH =
  "https://developers.google.com/maps/documentation/javascript/images/marker_green";
let markers = [];
let service;
let infoWindow;
let rating;

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

function getPlaceDetails(place) {
  let request = {
    placeId: place,
    fields: [
      "icon",
      "name",
      "formatted_address",
      "formatted_phone_number",
      "rating",
      "website",
    ],
  };
  service.getDetails(request, function (results, status) {
      console.log(results)
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      rating = "";
      for (let i = 0; i < 5; i++) {
        if (results.rating > i + 0.5 ) {
          rating+= `<i class="fas fa-star"></i>`;
        } else {
          rating += `<i class="far fa-star"></i>`;
        }
      }
      //setContent method code is from https://developers.google.com/maps/documentation/javascript/infowindows
      infoWindow.setContent(
        `<table id="info-window" class="table-borderless table-font"><thead><tr><th class="text-right"><img src="${results.icon}"></th><th><a href="${results.website}">${results.name}</a></th></tr></thead><tbody><tr><th class="text-right">Address:</th><td>${results.formatted_address}</td></tr><tr><th class="text-right">Telephone:</th><td>${results.formatted_phone_number}</td></tr><tr><th class="text-right">Rating:</th><td>${rating}${results.rating}</td></tr></tbody></table>`
      );
    }
  });
}

function showIW(results) {
  infoWindow = new google.maps.InfoWindow();
  for (let i = 0; i < results.length; i++) {
    markers[i].addListener("click", function () {
      getPlaceDetails(results[i].place_id);
      infoWindow.open(map, markers[i]);
    });
  }

  $("tr").click(function () {
    //Code below to get index of tr clicked is from https://stackoverflow.com/questions/469883/how-to-find-the-index-of-a-row-in-a-table-using-jquery/57145013
    let index = $("tr").index(this);
    getPlaceDetails(results[index].place_id);
    infoWindow.open(map, markers[index]);
  });
}
