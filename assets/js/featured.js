//Most of the code below is from https://rapidapi.com/victor.beck123123/api/instagram-grabber/endpoints
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
  "ChIJWTi8xgGyEmsRgK0yFmh9AQU",
];

function getData() {
  for (let i = 0; i < attractions.length; i++) {
    search(attractions[i]);
  }
}

function search(id) {
  let request = {
    placeId: id,
    fields: ["place_id", "name", "rating", "website", "photo"],
  };
  service.getDetails(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    console.log(results);
    $(document).ready(function () {
      $(".card")
        .eq(currentindex(results.place_id))
        .append(
          `<img src="${results.photos[0].getUrl()}"><div class="card-body"><div class="card-title paragraph text-center"><p><strong>${
            results.name
          }</strong></p></div><div class="card-text paragraph text-center">${ratings(results.rating)}<a href="${
            results.website
          }">Visit website</a></p></div></div>`
        );
      $(".card")
        .eq(currentindex(results.place_id) + 10)
        .append(
          `<img src="${results.photos[0].getUrl()}"><div class="card-body"><div class="card-title paragraph text-center"><p><strong>${
            results.name
          }</strong></p></div><div class="card-text paragraph text-center">${ratings(results.rating)}<a href="${
            results.website
          }">Visit website</a></p></div></div>`
        );
    });
  }
}

function currentindex(id) {
  if (id === attractions[0]) {
    return 0;
  } else if (id === attractions[1]) {
    return 1;
  } else if (id === attractions[2]) {
    return 2;
  } else if (id === attractions[3]) {
    return 3;
  } else if (id === attractions[4]) {
    return 4;
  } else if (id === attractions[5]) {
    return 5;
  } else if (id === attractions[6]) {
    return 6;
  } else if (id === attractions[7]) {
    return 7;
  } else if (id === attractions[8]) {
    return 8;
  } else if (id === attractions[9]) {
    return 9;
  }
}

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

function initMap() {
  //Code from https://stackoverflow.com/questions/23460435/get-google-place-details-without-map
  map = new google.maps.Map(document.createElement("div"));

  service = new google.maps.places.PlacesService(map);

  getData();
}

initMap();

//Most of the code below is from https://codepen.io/Anahiiit/pen/wvGPvaQ

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
    navText: [
      "<i class='fas fa-caret-left'></i>",
      "<i class='fas fa-caret-right'></i>",
    ],
    responsive: {
      0: {
        items: 2,
        //Code below from https://owlcarousel2.github.io/OwlCarousel2/docs/api-options.html
      },
      768: {
        items: 3,
        //Code below from https://owlcarousel2.github.io/OwlCarousel2/docs/api-options.html
      },
      992: {
        items: 4,
        //Code below from https://owlcarousel2.github.io/OwlCarousel2/docs/api-options.html
      },
    },
  });
  $(document).on("click", ".item", function () {
    $owl.trigger("to.owl.carousel", $(this).data("position"));
  });
});
