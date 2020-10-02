$(document).ready(function () {
  $(".dropdown-item").click(function () {
    $("#dropdownMenuButton").html($(this).html());
    $("#dropdownMenuButton").val($(this).val());
    search();
  });
});

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
    zoomControl: true,
    streetViewControl: false,
  });
  infoWindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);
  search();
}

function search() {
  clearMarkers();
  //Code below is from https://getbootstrap.com/docs/4.5/components/spinners/#about
  $("#results").html(`<div class="spinner">
  <div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div>`);
  let request = {
    location: getCity(),
    radius: "500",
    type: $(".dropdown-toggle").val(),
  };
  service.nearbySearch(request, function (results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      $("#results").html(
        `<table id="resultsTable" class="table table-font table-capitalise"><tbody></tbody></table>`
      );
      for (let i = 0; i < results.length; i++) {
        addMarker(results, i);
        setTimeout(dropMarker(i), i * 100);
        addResult(results, i);
      }
      $("tr:odd").addClass("odd");
      $("tr:even").addClass("even");
    }
  });
}

function clearMarkers() {
  for (let i = 0; i < markers.length; i++) {
    if (markers[i]) {
      markers[i].setMap(null);
    }
  }
  markers = [];
}

function addMarker(result, i) {
  let markerLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let markerIcon = MARKER_PATH + markerLetter[i] + ".png";
  markers[i] = new google.maps.Marker({
    position: result[i].geometry.location,
    animation: google.maps.Animation.DROP,
    icon: markerIcon,
  });
  markers[i].placeResult = result[i];
  markers[i].addListener("click", function () {
    getPlaceDetails(markers[i].placeResult.place_id, markers[i]);
  });
}

function dropMarker(i) {
  return function () {
    markers[i].setMap(map);
  };
}

function addResult(result, i) {
  let markerLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let markerIcon = MARKER_PATH + markerLetter[i] + ".png";
  $("tbody").append(
    `<tr><td><img src="${markerIcon}"></td><td><strong>${result[i].name}</strong><br>${result[i].vicinity}</td></tr>`
  );
  $("tr")
    .eq(i)
    .click(function () {
      getPlaceDetails(markers[i].placeResult.place_id, markers[i]);
    });
}

function getPlaceDetails(place, marker) {
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
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      //setContent method code is from https://developers.google.com/maps/documentation/javascript/infowindows
      infoWindow.setContent(
        `<table id="info-window" class="table-borderless table-font"><thead><tr><th class="text-right"><img src="${results.icon}"></th><th><a href="${results.website}">${results.name}</a></th></tr></thead><tbody>${notUndefined("Address:", results.formatted_address)}${notUndefined("Telephone:", results.formatted_phone_number)}${notUndefined("Rating:", ratings(results.rating))}</tbody></table>`
      );
      infoWindow.open(map, marker);
    }
  });
}

function ratings(rating) {
  if (rating === "undefined") {
    return "";
  } else if (rating >= 4 && rating < 4.5) {
    return `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>`;
  } else if (rating >= 4.5 && rating < 5) {
    return `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>`;
  } else {
    return `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>`;
  }
}

function notUndefined(heading, text) {
    if (text !== undefined) {
        return `<tr><th class="text-right">${heading}</th><td>${text}</td></tr>`
    } else {
        return ""
    }
}