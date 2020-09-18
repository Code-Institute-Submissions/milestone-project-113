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

  let map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: getCity()
  });

  let labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let locations = [];

  let markers = locations.map(function (location, i) {
    return new google.maps.Marker({
      position: location,
      label: labels[i % labels.length],
    });
  });
}
