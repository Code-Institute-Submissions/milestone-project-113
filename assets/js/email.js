// Collapses navbar when the navbar contact us link is clicked and prevents both contact links from going back to active status when the modal is closed. Code below is from // Code is from // Code below from https://getbootstrap.com/docs/4.0/components/collapse/#via-javascript and https://stackoverflow.com/questions/30322918/bootstrap-modal-restores-button-focus-on-close

$(document).ready(function () {
  $(".nav-item a:last").click(function () {
    $(".navbar-collapse").collapse("hide");
    $("#contactUsForm").show();
  });
  $(".close").click(function() {
    $(".nav-item a:last").one("focus", function() {
      $(this).blur();
    });
    $(".footer-links a:last").one("focus", function() {
      $(this).blur();
    });
  });
});

// Gets data inputted to the contact form and sends it to emailJS.

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