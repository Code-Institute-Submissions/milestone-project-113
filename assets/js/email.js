$(document).ready(function () {
  // Collapses the navbar, adds the no-hover class to the navbar contact link and shows the contact us modal when the navbar contact link is clicked. Code is from https://getbootstrap.com/docs/4.0/components/collapse/
  $(".navbar-nav a:last").click(function () {
    $(this).addClass("no-hover");
    $(".navbar-collapse").collapse("hide");
    $("#contactUsForm").show();
  });
  // Adds the no-hover class to the footer contact link when clicked.
  $(".footer-links").click(function () {
    $(this).addClass("no-hover");
  });
  // Makes links lose their focus status and removes the no-hover class from links when the close button is clicked. Code is from https://stackoverflow.com/questions/30322918/bootstrap-modal-restores-button-focus-on-close
  $(".close").click(function () {
    $(".navbar-nav a:last").one("focus", function () {
      $(this).blur();
      $(this).removeClass("no-hover");
    });
    $(".footer-links a:last").one("focus", function () {
      $(this).blur();
      $(this).removeClass("no-hover");
    });
  });
  // Adds contact form HTML to the element containing the modal-body class before the modal is opened. Code is from https://getbootstrap.com/docs/4.0/components/modal/#via-javascript and https://getbootstrap.com/docs/4.5/components/forms/.
  $("#contactUsForm").on("show.bs.modal", function () {
    $(".modal-body").html(
      `<form onsubmit="return sendMail(this);"><div class="form-group contact-form"><label for="name" class="col-form-label">Name</label><input type="text" name="name" id="name" class="form-control" placeholder="Enter name" required/><label for="emailAddress" class="col-form-label">Email Address</label><input type="email" name="email" id="emailAddress" class="form-control" placeholder="Enter email address" required/><label for="message-text" class="col-form-label">Message:</label><textarea name="message" id="message-text" class="form-control" rows="5" placeholder="Enter message" required></textarea></div><button type="submit" class="btn">Submit</button></form>`
    );
  });
});

// Gets data inputted to the contact form and sends it to emailJS and run the relevant function depending on whether an error is returned or not.

function sendMail(contactForm) {
  $(".modal-body button").html("Processing");
  emailjs.init("user_boozmhp8QWVEdS0lHsScn");
  emailjs
    .send("gmailk", "discover_australia", {
      from_name: contactForm.name.value,
      from_email: contactForm.emailAddress.value,
      message: contactForm.message.value,
    })
    .then(
      function () {
        $(".modal-body").html(
          `<p class="paragraph text-center">Form successfully submitted. <br>A member of the team will be in touch shortly.</p>`
        );
      },
      function (error) {
        $(".modal-body").html(
          `<p class="paragraph text-center">Error ${error.status}. Please reload the page to try again.</p>`
        );
      }
    );
  return false;
}
