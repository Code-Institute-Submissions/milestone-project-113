// Changes the navbar toggler icon from bars to times when the collapsable navbar is expanded. Code is from https://getbootstrap.com/docs/4.5/components/collapse/#collapseshow, https://fontawesome.com/icons/bars?style=solid and https://fontawesome.com/icons/times?style=solid

$(document).ready(function () {
  $(".navbar-collapse").on("show.bs.collapse", function () {
    $(".navbar-toggler").html(`<i class="fas fa-times aria-hidden="true"></i><span class="sr-only">Bars</span>`);
  });
  $(".navbar-collapse").on("hide.bs.collapse", function () {
    $(".navbar-toggler").html(`<i class="fas fa-bars aria-hidden="true"></i><span class="sr-only">Bars</span>`);
  });
});