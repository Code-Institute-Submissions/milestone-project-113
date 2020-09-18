function initMap() {

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

  let city = getCity();

  let map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: city,
    mapTypeControl: false,
    panControl: false,
    zoomControl: false,
    streetViewControl: false,
  });

  let request = {
    location: city,
    radius: "500",
    type: ["restaurant"],
  };

  MARKER_PATH = "https://developers.google.com/maps/documentation/javascript/images/marker_green";

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);

  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {  
        const markerLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const markerIcon = MARKER_PATH + markerLetter[i] + ".png";
        let marker = new google.maps.Marker({
            map: map,
            position: results[i].geometry.location,
            animation: google.maps.Animation.DROP,
            icon: markerIcon
        }); 
      }
    }
  }
  callback()
}
