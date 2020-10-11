$(document).ready(function () {
  $(".dropdown-item").click(function () {
    $("#dropdownMenuButton").html($(this).html());
    $("#dropdownMenuButton").val($(this).val());
    search();
  });
  $("#list-view-tab").on("shown.bs.tab", function () {
    hideMarkers();
    showMarkers();
  });
});

let map;
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
  map = new google.maps.Map(document.getElementById("map-view"), {
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
  centerChanged();
}

function search() {
  //Code below is from https://getbootstrap.com/docs/4.5/components/spinners/#about
  $("#list-view").html(`<div class="spinner text-center">
  <div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div>`);
  let request = {
    location: map.getCenter(),
    radius: "500",
    type: $(".dropdown-toggle").val(),
  };
  service.nearbySearch(request, function (results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      clearMarkers();
      $("#list-view").html(
        `<table id="resultsTable" class="table table-font table-capitalise"><tbody></tbody></table>`
      );
      let markerPath =
        "https://developers.google.com/maps/documentation/javascript/images/marker_green";
      let markerLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (let i = 0; i < results.length; i++) {
        let markerIcon = markerPath + markerLetter[i] + ".png";
        addMarker(results[i], markerIcon, i);
        setTimeout(dropMarker(i), i * 100);
        addResult(results[i], markerIcon, i);
      }
      $("tr:odd").addClass("odd");
      $("tr:even").addClass("even");
    }
  });
}

function clearMarkers() {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

function addMarker(result, markerIcon, i) {
  markers.push(
    new google.maps.Marker({
      position: result.geometry.location,
      animation: google.maps.Animation.DROP,
      icon: markerIcon,
      placeResult: result,
    })
  );
  markers[markers.length - 1].addListener("click", function () {
    getPlaceDetails(markers[i]);
  });
}

function dropMarker(i) {
  return function () {
    markers[i].setMap(map);
  };
}

function addResult(result, markerIcon, i) {
  $("tbody").append(
    `<tr><td><img src="${markerIcon}"></td><td><strong>${result.name}</strong><br>${result.vicinity}</td></tr>`
  );
  $("tr")
    .eq(i)
    .click(function () {
      getPlaceDetails(markers[i]);
      $("#map-view-tab").tab("show");
    });
}

function getPlaceDetails(marker) {
  let request = {
    placeId: marker.placeResult.place_id,
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
        `<table id="info-window" class="table-borderless table-font"><thead><tr><th class="text-right"><img src="${
          results.icon
        }"></th><th><a href="${results.website}">${
          results.name
        }</a></th></tr></thead><tbody>${notUndefined(
          "Address:",
          results.formatted_address
        )}${notUndefined(
          "Telephone:",
          results.formatted_phone_number
        )}${notUndefined("Rating:", ratings(results.rating))}</tbody></table>`
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
    return `<tr><th class="text-right">${heading}</th><td>${text}</td></tr>`;
  } else {
    return "";
  }
}

function centerChanged() {
  map.addListener("dragend", function () {
      search();
  });
}

function hideMarkers() {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}

function showMarkers() {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}
