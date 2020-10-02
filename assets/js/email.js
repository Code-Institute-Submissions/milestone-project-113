$(document).ready(function () {
  $(".nav-item a:last").click(function () {
    // Code below from https://getbootstrap.com/docs/4.0/components/collapse/#via-javascript
    $(".navbar-collapse").collapse("hide");
    $("#contactUsForm").show();
  });
  $(".close").click(function() {
      // Code below from https://stackoverflow.com/questions/30322918/bootstrap-modal-restores-button-focus-on-close
    $(".nav-item a:last").one("focus", function() {
      $(this).blur();
    });
  });
});

function sendMail(contactForm) {
    emailjs.init('user_boozmhp8QWVEdS0lHsScn')
    emailjs.send("gmail", "discover_australia", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailAddress.value,
        "message": contactForm.message.value
    })
    .then (
        function(response) {
            contactForm.name.value = ''
            contactForm.emailAddress.value = ''
            contactForm.message.value = ''
            console.log("SUCCESS", response)
        },
        function(error) {
            console.log("FAILED", error)
        });
    return false;
}