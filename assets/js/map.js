// Changes the html text and value displayed in the dropdown button when the user selects an option from the dropdown list.

$(document).ready(function () {
  $(".dropdown-item").click(function () {
    $("#dropdownMenuButton").html($(this).html());
    $("#dropdownMenuButton").val($(this).val());
    search();
  });
});

// Hides and then shows the markers when the list view tab is clicked on. This fixes an error with chrome where the markers were being dropped every time map view is displayed.

$(document).ready(function () {
  $("#list-view-tab").on("shown.bs.tab", function () {
    hideMarkers();
    showMarkers();
  });
});

// Declares global variables.

let map;
let markers = [];
let service;
let infoWindow;
let rating;

// Gets the city's name from the webpage and returns the relevant coordinates in a Google Maps LatLng object. Code for creating the LatLng objects is from // Code is from https://developers.google.com/maps/documentation/javascript/examples/place-search.

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

// Initiates the map.

function initMap() {
  // Creates the map on the map-view ID and sets the map options. Code is from https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-hotelsearch.

  map = new google.maps.Map(document.getElementById("map-view"), {
    zoom: 15,
    center: getCity(),
    mapTypeControl: false,
    panControl: false,
    zoomControl: true,
    streetViewControl: false,
  });

  // Creates the infoWindow. Code is from https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-hotelsearch.

  infoWindow = new google.maps.InfoWindow();

  // Defines the service. Code is from https://developers.google.com/maps/documentation/javascript/places#place_search_requests.

  service = new google.maps.places.PlacesService(map);

  // Runs the search function.

  search();

  // Runs the centerChanged function.

  centerChanged();
}

// Conducts a nearby places search

function search() {
  // Changes the html of the element containing the list view ID to the loader. HTML is from https://getbootstrap.com/docs/4.5/components/spinners/#about.

  $("#list-view").html(
    `<div class="results-height"><div class="results-center text-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>`
  );

  // Defines the request parameters and their values. Code is from https://developers.google.com/maps/documentation/javascript/places#place_search_requests

  let request = {
    location: map.getCenter(),
    radius: "500",
    type: $(".dropdown-toggle").val(),
  };

  // Conducts the search and processes the results if the search returns a status of OK. Code for conducting the search and ckecking it returns a status of OK is from https://developers.google.com/maps/documentation/javascript/places#place_search_requests

  service.nearbySearch(request, function (results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      // Runs the clearMarkers function

      clearMarkers();

      // Adds table HTML.

      $("#list-view").html(
        `<table id="resultsTable" class="table table-font table-capitalise"><tbody></tbody></table>` // Table was styled using the bootstrap table css class from https://getbootstrap.com/docs/4.5/content/tables/.
      );

      // Defines the marker path.

      let markerPath =
        "https://developers.google.com/maps/documentation/javascript/images/marker_green";

      // Defines the marker path. Code is from https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-hotelsearch.

      let markerLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

      // For loop to process each result returned

      for (let i = 0; i < results.length; i++) {
        // Defines the marker icon

        let markerIcon = markerPath + markerLetters[i] + ".png";

        // Runs the addMarker function

        addMarker(results[i], markerIcon, i);

        // Runs the dropMarker function after a specified number of milliseconds. This number is equal to 100 times the result's position in the results array.

        setTimeout(dropMarker(i), i * 100);

        // Runs the addResult function

        addResult(results[i], markerIcon, i);
      }

      // Adds the odd class to odd table rows.

      $("tr:odd").addClass("odd");

      // Adds the even class to even table rows.

      $("tr:even").addClass("even");
    } else {
      $("#list-view").html(
        `<div class="results-height"><p class="results-center text-center errors">Error: ${status}</p></div>`
      );
    }
  });
}

// Deletes markers from the map and the markers variable. Code is from https://developers.google.com/maps/documentation/javascript/examples/marker-remove

function clearMarkers() {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

// Adds a marker to the markers variable for each result and adds an event listener to the marker which runs the getPlaceDetails function when the marker is clicked. Code is from https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-hotelsearch.

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

// Drops the marker. Code is from https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-hotelsearch.

function dropMarker(i) {
  return function () {
    markers[i].setMap(map);
  };
}

// Adds the results to a new row in the results table and adds a click event to the table row which runs the getPlaceDetails function and opens the map tab (small screens only) when the marker is clicked.

function addResult(result, markerIcon, i) {
  $("tbody").append(
    `<tr><td><img src="${markerIcon}"></td><td><strong>${result.name}</strong><br>${result.vicinity}</td></tr>`
  );
  $("tr")
    .last()
    .click(function () {
      getPlaceDetails(markers[i]);
      $("#map-view-tab").tab("show");
    });
}

// Conducts a place details search and displays the results in an infoWindow.

function getPlaceDetails(marker) {
  // Defines the request parameters and their values. Code is from https://developers.google.com/maps/documentation/javascript/places#place_details_requests

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

  // Conducts the search and adds the results to the infoWindow if the search returns a status of OK. Code for conducting the search and checking it returned a status of OK is from https://developers.google.com/maps/documentation/javascript/places#place_details_requests

  service.getDetails(request, function (results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      //setContent method is from https://developers.google.com/maps/documentation/javascript/infowindows
      infoWindow.setContent(
        // Table was styled using the bootstrap table-borderless css class from https://getbootstrap.com/docs/4.5/content/tables/.
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
      //Code for opening infoWindow is from https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-hotelsearch
      infoWindow.open(map, marker);
    } else {
      //setContent method is from https://developers.google.com/maps/documentation/javascript/infowindows
      infoWindow.setContent(
        `<p class="text-center errors">Error: ${status}</p>`
      );
      //Code for opening infoWindow is from https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-hotelsearch
      infoWindow.open(map, marker);
    }
  });
}

// Returns the HTML for the rating. Code is from https://www.digitalocean.com/community/tutorials/how-to-use-the-switch-statement-in-javascript, https://fontawesome.com/icons/star?style=solid, https://fontawesome.com/icons/star?style=regular and https://fontawesome.com/icons/star-half-alt?style=solid

function ratings(rating) {
    switch (true) {
    case rating === 5:
      return `<i class="fas fa-star" aria-hidden="true"></i><i class="fas fa-star" aria-hidden="true"></i><i class="fas fa-star" aria-hidden="true"></i><i class="fas fa-star" aria-hidden="true"></i><i class="fas fa-star" aria-hidden="true"></i><span class="sr-only">${rating}</span>`;
      break;
    case rating >= 4.5:
      return `<i class="fas fa-star" aria-hidden="true"></i><i class="fas fa-star" aria-hidden="true"></i><i class="fas fa-star" aria-hidden="true"></i><i class="fas fa-star" aria-hidden="true"></i><i class="fas fa-star-half-alt" aria-hidden="true"></i><span class="sr-only">${rating}</span>`;
      break
    case rating >= 4:
      return `<i class="fas fa-star" aria-hidden="true"></i><i class="fas fa-star" aria-hidden="true"></i><i class="fas fa-star" aria-hidden="true"></i><i class="fas fa-star" aria-hidden="true"></i><i class="far fa-star" aria-hidden="true"></i><span class="sr-only">${rating}</span>`;
      break
    case rating >= 3.5:
      return `<i class="fas fa-star" aria-hidden="true"></i><i class="fas fa-star" aria-hidden="true"></i><i class="fas fa-star" aria-hidden="true"></i><i class="fas fa-star-half-alt" aria-hidden="true"></i><i class="far fa-star" aria-hidden="true"></i><span class="sr-only">${rating}</span>`;
      break
    case rating >= 3:
      return `<i class="fas fa-star" aria-hidden="true"></i><i class="fas fa-star" aria-hidden="true"></i><i class="fas fa-star" aria-hidden="true"></i><i class="far fa-star" aria-hidden="true"></i><i class="far fa-star" aria-hidden="true"></i><span class="sr-only">${rating}</span>`;
      break
    case rating >= 2.5:
      return `<i class="fas fa-star" aria-hidden="true"></i><i class="fas fa-star" aria-hidden="true"></i><i class="fas fa-star-half-alt" aria-hidden="true"></i><i class="far fa-star" aria-hidden="true"></i><i class="far fa-star" aria-hidden="true"></i><span class="sr-only">${rating}</span>`;
      break
    case rating >= 2:
      return `<i class="fas fa-star" aria-hidden="true"></i><i class="fas fa-star" aria-hidden="true"></i><i class="far fa-star" aria-hidden="true"></i><i class="far fa-star" aria-hidden="true"></i><i class="far fa-star" aria-hidden="true"></i><span class="sr-only">${rating}</span>`;
      break
    case rating >= 1.5:
      return `<i class="fas fa-star" aria-hidden="true"></i><i class="fas fa-star-half-alt" aria-hidden="true"></i><i class="far fa-star" aria-hidden="true"></i><i class="far fa-star" aria-hidden="true"></i><i class="far fa-star" aria-hidden="true"></i><span class="sr-only">${rating}</span>`;
      break
    case rating >= 1:
      return `<i class="fas fa-star" aria-hidden="true"></i><i class="far fa-star" aria-hidden="true"></i><i class="far fa-star" aria-hidden="true"></i><i class="far fa-star" aria-hidden="true"></i><i class="far fa-star" aria-hidden="true"></i><span class="sr-only">${rating}</span>`;
      break
    case rating >= 0.5:
      return `<i class="fas fa-star-half-alt" aria-hidden="true"></i><i class="far fa-star" aria-hidden="true"></i><i class="far fa-star" aria-hidden="true"></i><i class="far fa-star" aria-hidden="true"></i><i class="far fa-star" aria-hidden="true"></i><span class="sr-only">${rating}</span>`;
      break
    case rating >= 0:
      return `<i class="far fa-star" aria-hidden="true"></i><i class="far fa-star" aria-hidden="true"></i><i class="far fa-star" aria-hidden="true"></i><i class="far fa-star" aria-hidden="true"></i><i class="far fa-star" aria-hidden="true"></i><span class="sr-only">${rating}</span>`;
      break
    default:
      return undefined;
    }
}

// Returns the result and the heading if the result is not undefined and returns an empty string if the result is undefined.

function notUndefined(heading, text) {
  if (text !== undefined) {
    return `<tr><th class="text-right">${heading}</th><td>${text}</td></tr>`;
  } else {
    return "";
  }
}

// Adds an event listener which triggers the search function when the user stops dragging the map and the center has been changed by 500 metres or more. Code is from https://developers.google.com/maps/documentation/javascript/events

function centerChanged() {
  let prevCenter = map.getCenter();
  map.addListener("center_changed", function () {
    map.addListener("dragend", function () {
      if (calcDistance(prevCenter, map.getCenter()) >= 500) {
        search();
      } else {
        return;
      }
      prevCenter = map.getCenter();
    });
  });
}

// Hides all markers. Code is from https://developers.google.com/maps/documentation/javascript/examples/marker-remove

function hideMarkers() {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}

// Shows all markers. Code is from https://developers.google.com/maps/documentation/javascript/examples/marker-remove

function showMarkers() {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Calculates distance between two sets of coordinates. Code is from https://jsfiddle.net/c2qto3v8/

function calcDistance(p1, p2) {
  return google.maps.geometry.spherical.computeDistanceBetween(p1, p2);
}
