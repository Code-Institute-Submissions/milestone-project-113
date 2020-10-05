// Changes the navbar toggler icon from bars to times when the collapsable navbar is expanded. Code is from https://getbootstrap.com/docs/4.5/components/collapse/#collapseshow

$(document).ready(function () {
  $(".navbar-collapse").on("show.bs.collapse", function () {
    $(".navbar-toggler").html(`<i class="fas fa-times"></i>`);
  });
  $(".navbar-collapse").on("hide.bs.collapse", function () {
    $(".navbar-toggler").html(`<i class="fas fa-bars"></i>`);
  });
});