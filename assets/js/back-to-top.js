// Makes back to top button appear when the user scrolls and they have not reached the footer. Code is from  https://codepen.io/deveb22/pen/QxPmGz.

$(window).scroll(function () {
  if ($(window).scrollTop() > 200) {
    $(".top-of-page").removeClass("d-none");
  } else {
    $(".top-of-page").addClass("d-none");
  }
});

$(document).ready(function () {
  $(".top-of-page").on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "200");
  });
});
