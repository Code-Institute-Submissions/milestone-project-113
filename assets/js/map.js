function initMap() {
    let map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: {
            lat: -37.8177089,
            lng: 144.9668995
        }
    });

    let labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let locations = [];

    let markers = locations.map(function(location, i) {
        return new google.maps.Marker ({
            position: location,
            label: labels [i % labels.length]
        });
    });
}
