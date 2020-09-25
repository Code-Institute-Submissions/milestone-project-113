//Code below from https://stackoverflow.com/questions/8648596/how-to-use-jquery-mobile-for-its-touch-event-support-only-no-ui-enhancements

$(document).bind("mobileinit", function () {
  $.extend($.mobile, { autoInitializePage: false });
});
