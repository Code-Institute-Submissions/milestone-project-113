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