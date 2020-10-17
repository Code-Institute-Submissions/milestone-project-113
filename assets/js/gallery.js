// Defines the URL of each photo to request.
let photos = [
  {
    url:
      "https://instagram-grabber.p.rapidapi.com/grab/?url=https%253A%252F%252Fwww.instagram.com%252Fp%252FCFaUTokCTx_%252F",
    alt: "Image of a kangaroo"
  },
  {
    url:
      "https://instagram-grabber.p.rapidapi.com/grab/?url=https%253A%252F%252Fwww.instagram.com%252Fp%252FCEobZ7LCehX%252F",
    alt: "Image of Melbourne skyline and Brighton Bathing Boxes at night"
  },
  {
    url:
      "https://instagram-grabber.p.rapidapi.com/grab/?url=https%253A%252F%252Fwww.instagram.com%252Fp%252FCDuK60-CYkP%252F",
      alt: "Image of the Great Barrier Reef"
  },
  {
    url:
      "https://instagram-grabber.p.rapidapi.com/grab/?url=https%253A%252F%252Fwww.instagram.com%252Fp%252FCDeuJSKIOjw%252F",
      alt: "Image of Story Bridge and Brisbane skyline at sunset"
  },
  {
    url:
      "https://instagram-grabber.p.rapidapi.com/grab/?url=https%253A%252F%252Fwww.instagram.com%252Fp%252FCFRoH87imbr%252F",
    alt: "Image of a surfer walking down some steps onto a beach"
  },
  {
    url:
      "https://instagram-grabber.p.rapidapi.com/grab/?url=https%253A%252F%252Fwww.instagram.com%252Fp%252FCFhE5TcCgYy%252F",
      alt: "Image of a koala sniffing some gum blossom"
  },
  {
    url:
      "https://instagram-grabber.p.rapidapi.com/grab/?url=https%253A%252F%252Fwww.instagram.com%252Fp%252FCFZWhgIifyA%252F",
    alt: "Image of Sydney Harbour at night"
  },
  {
    url:
      "https://instagram-grabber.p.rapidapi.com/grab/?url=https%253A%252F%252Fwww.instagram.com%252Fp%252FCEuiyrQiim2%252F",
      alt: "Image of a rainbow over Uluru"
  },
];

// Returns the photo associated with each URL in the photos array.
function fetchPhotos() {
  for (let i = 0; i < photos.length; i++) {
    // Defines the request parameters and their values. Code is from https://rapidapi.com/victor.beck123123/api/instagram-grabber/endpoints.
    let settings = {
      async: true,
      crossDomain: true,
      url: photos[i].url,
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
        $("#gallery").children().eq(i).append(notUndefined(response, i));
      },
      // Runs this function if an error is received. Image is from https://placeholder.com/
      function (error) {
        return $("#gallery")
          .children()
          .eq(i)
          .append(
            `<img class="gallery-images" src="https://via.placeholder.com/600x800/D3D3D3/4A4A4A.png?text=Image+not+found" alt="Image not found placeholder">`
          );
      }
    );
  }
}

// Returns image HTML if response returns a success property of true and returns placeholder image if response returns a success property of false. Placeholder image is from https://placeholder.com/
function notUndefined(response, i) {
  if (response.success === true) {
    return `<img class="gallery-images" src="${response.media[0].source}" alt="${photos[i].alt}"></img>`;
  } else {
    return `<img class="gallery-images" src="https://via.placeholder.com/600x800/D3D3D3/4A4A4A.png?text=Image+not+found" alt="Image not found placeholder"></img>`;
  }
}

// Runs the fetchPhotos function when once the document's DOM has loaded.
$(document).ready(fetchPhotos());
