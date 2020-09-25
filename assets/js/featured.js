//Most of the below code is from http://jsfiddle.net/bretmorris/ULNa2/7/
$(document).ready(function () {
  iniShow();
  //Click on previous button loads up previous slide.
  $("button.prev").click(function () {
    prevSlide($(".slides"));
  });
  //Click on next button loads up next slide.
  $("button.next").click(function () {
    nextSlide($(".slides"));
  });
  //Swipe right loads up next slide. Code adapted from https://api.jquerymobile.com/swiperight/
  $(".slideshow").on("swipeleft", function () {
    prevSlide($(".slides"));
  });
  //Swipe left loads up next slide. Code adapted from https://api.jquerymobile.com/swipeleft/
  $(".slideshow").on("swiperight", function () {
    nextSlide($(".slides"));
  });
});

//Initialise slide show and display first image
function iniShow() {
  $(".slides").each(function () {
    $(this).children().hide();
    $(this).children().first().fadeIn(500)
  });
}

function prevSlide(slides) {
  $(slides).children().last().prependTo(slides);
  showSlide(slides)
}

function nextSlide(slides) {
  $(slides).children().first().appendTo(slides);
  showSlide(slides)
}

function showSlide(slides) {
    //hide (reset) all slides
    slides.children().hide();
    //fade in next slide
    slides.children().first().fadeIn(500);
}
