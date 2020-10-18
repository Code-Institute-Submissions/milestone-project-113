// Declares global variables.

let service;
let map;
let attractions = [
  "ChIJo5L_WytQkWsRNnlN6kJDWtk",
  "ChIJhWGrIw_RuSwRYAaxDakXAg8",
  "ChIJsVeQNzRd1moRUNQyBXZWBA8",
  "ChIJp6JdQjRv1moRykDrdG6SJBE",
  "ChIJEaGM8gx1EmsRXj9z2s5VnUU",
  "ChIJ3S-JXmauEmsRUcIaWtf4MzE",
  "ChIJDz1H5hWegqoRMfiDyQGd0tE",
  "ChIJM_18TMdC1moRDeauy8iFFRk",
  "ChIJI1JibStsIysRIV_Fm03NqEM",
  "ChIJ51kExqGtEmsRzhP5ZQJ_urQ",
];
let currentIndex = 0;

// Runs the search function for each item in the attractions array.

function getData() {
  for (let i = 0; i < attractions.length; i++) {
    search(attractions[i]);
  }
}

// Conducts the place details search.

function search(id) {
  // Defines the request parameters and their values. Code is from https://developers.google.com/maps/documentation/javascript/places#place_details_requests

  let request = {
    placeId: id,
    fields: ["photo", "name", "rating", "user_ratings_total", "url"],
  };

  // Conducts the search. Code is from https://developers.google.com/maps/documentation/javascript/places#place_details_requests

  service.getDetails(request, callback);
}

// Determines how to process the results based on the status code returned by the search.

function callback(results, status) {
  // Adds the results to the relevant cards in the owl carousel if the search returns a status of OK.  Code for checking the search returned a status of OK is from https://developers.google.com/maps/documentation/javascript/places#place_details_requests
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    $(".card")
      .eq(currentIndex)
      .html(
        `<img src="${results.photos[0].getUrl()}" alt="Image of ${
          results.name
        }"><div class="card-body"><div class="card-title paragraph text-center"><p><strong>${
          results.name
        }</strong></p></div><div class="card-text paragraph text-center">${ratings(
          results.rating
        )}<a href="${results.url}">Read More</a></div></div>`
      );
    $(".card")
      .eq(currentIndex + 10)
      .html(
        `<img src="${results.photos[0].getUrl()}" alt="Image of ${
          results.name
        }"><div class="card-body"><div class="card-title paragraph text-center"><p><strong>${
          results.name
        }</strong></p></div><div class="card-text paragraph text-center">${ratings(
          results.rating
        )}<a href="${results.url}">Read More</a></div></div>`
      );
    currentIndex++;
  }
  // Adds the status to the relevant cards in the owl carousel if the search returns a status other than OK.
  else {
    $(".card")
      .eq(currentIndex)
      .html(
        `<div class="card-body"><p class="paragraph vertical-center text-center errors">Error: ${status}</p></div>`
      );
    $(".card")
      .eq(currentIndex + 10)
      .html(
        `<div class="card-body"><p class="paragraph vertical-center text-center errors">Error: ${status}</p></div>`
      );
    currentIndex++;
  }
}

// Returns the HTML for the rating. HTML is from https://fontawesome.com/icons/star?style=solid, https://fontawesome.com/icons/star?style=regular and https://fontawesome.com/icons/star-half-alt?style=solid

function ratings(rating) {
  if (rating === "undefined") {
    return "";
  } else if (rating >= 4 && rating < 4.5) {
    return `<p><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i></p>`;
  } else if (rating >= 4.5 && rating < 5) {
    return `<p><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i></p>`;
  } else {
    return `<p><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></p>`;
  }
}

// Initiates the search

function initMap() {
  // Creates the map in new div. Code from https://stackoverflow.com/questions/23460435/get-google-place-details-without-map
  map = new google.maps.Map(document.createElement("div"));
  // Defines the service. Code is from https://developers.google.com/maps/documentation/javascript/places#place_details_requests.
  service = new google.maps.places.PlacesService(map);
  // Calls the getData function
  getData();
}

// Creates the Owl Carousel. Code is from https://codepen.io/Anahiiit/pen/wvGPvaQ

$(document).ready(function ($) {
  let $owl = $(".owl-carousel");
  $owl.children().each(function (index) {
    $(this).attr("data-position", index);
  });

  $owl.owlCarousel({
    center: false,
    nav: true,
    loop: true,
    items: 10,
    margin: 10,
    startPosition: 0,
    // navText HTML is from https://fontawesome.com/icons/caret-left?style=solid and https://fontawesome.com/icons/caret-right?style=solid
    navText: [
      "<i class='fas fa-caret-left'></i>",
      "<i class='fas fa-caret-right'></i>",
    ],
    responsive: {
      0: {
        items: 2,
      },
      768: {
        items: 3,
      },
      992: {
        items: 4,
      },
    },
  });

  $(document).on("click", ".item", function () {
    $owl.trigger("to.owl.carousel", $(this).data("position"));
  });
});
