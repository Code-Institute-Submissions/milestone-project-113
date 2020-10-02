$(document).ready(function () {
  //Code below from https://getbootstrap.com/docs/4.5/components/collapse/#collapseshow
  $(".navbar-collapse").on("show.bs.collapse", function () {
    $(".navbar-toggler").html(`<i class="fas fa-times"></i>`);
  });
  $(".navbar-collapse").on("hide.bs.collapse", function () {
    $(".navbar-toggler").html(`<i class="fas fa-bars"></i>`);
  });
});