//Most of the code below is from https://rapidapi.com/victor.beck123123/api/instagram-grabber/endpoints

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

function fetchPhotos() {
  for (let i = 0; i < photos.length; i++) {
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
    $.getJSON(settings).done(function (response) {
      console.log(response);
      $("#gallery").children().eq(i).append(
        `<img class="gallery-images" src="${response.media[0].source}">`
      );
    });
  }
}

$(document).ready(fetchPhotos());
