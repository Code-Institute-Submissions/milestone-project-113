// Defines the URL of each photo to request.

let photos = [
  "https://instagram-grabber.p.rapidapi.com/grab/?url=https%253A%252F%252Fwww.instagram.com%252Fp%252FCFaUTokCTx_%252F",
  "https://instagram-grabber.p.rapidapi.com/grab/?url=https%253A%252F%252Fwww.instagram.com%252Fp%252FCEobZ7LCehX%252F",
  "https://instagram-grabber.p.rapidapi.com/grab/?url=https%253A%252F%252Fwww.instagram.com%252Fp%252FCDuK60-CYkP%252F",
  "https://instagram-grabber.p.rapidapi.com/grab/?url=https%253A%252F%252Fwww.instagram.com%252Fp%252FCDeuJSKIOjw%252F",
  "https://instagram-grabber.p.rapidapi.com/grab/?url=https%253A%252F%252Fwww.instagram.com%252Fp%252FCFRoH87imbr%252F",
  "https://instagram-grabber.p.rapidapi.com/grab/?url=https%253A%252F%252Fwww.instagram.com%252Fp%252FCFhE5TcCgYy%252F",
  "https://instagram-grabber.p.rapidapi.com/grab/?url=https%253A%252F%252Fwww.instagram.com%252Fp%252FCFZWhgIifyA%252F",
  "https://instagram-grabber.p.rapidapi.com/grab/?url=https%253A%252F%252Fwww.instagram.com%252Fp%252FCEuiyrQiim2%252F",
];

// Returns the photo associated with each URL in the photos array.

function fetchPhotos() {
  for (let i = 0; i < photos.length; i++) {
    // Defines the request parameters and their values. Code is from https://rapidapi.com/victor.beck123123/api/instagram-grabber/endpoints.
    let settings = {
      async: true,
      crossDomain: true,
      url: photos[i],
      method: "GET",
      headers: {
        "x-rapidapi-host": "instagram-grabber.p.rapidapi.com",
        "x-rapidapi-key": "3fa6ebdda9mshc8f840afb719d5cp12d66bjsnd08793ce237c",
      },
    };
    // Requests the photo.
    $.getJSON(settings).then(
      // Runs this function if a response is received
      function (response) {
        $("#gallery")
          .children()
          .eq(i)
          .append(
            `<img class="gallery-images" src="${response.media[0].source}">`
          );
      },
      // Runs this function if an error is received.
      function (error) {
        $("#gallery")
          .children()
          .eq(i)
          .append(
            `<p class="paragraph gallery-errors text-center">Error ${error.status}. Please refresh the page to try again in 1 minute.</p>`
          );
      }
    );
  }
}

// Runs the fetchPhotos function when once the document's DOM has loaded.

$(document).ready(fetchPhotos());
