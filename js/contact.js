/* =========================================
   CONTACT FORM
========================================= */

const contactForm = document.getElementById("contactForm");
const contactMessageBox = document.getElementById("contactMessageBox");
const contactButton = document.getElementById("contactButton");


/* =========================================
   SHOW MESSAGE
========================================= */

function showContactMessage(message, type) {

    if (!contactMessageBox) {
        return;
    }

    contactMessageBox.textContent = message;

    contactMessageBox.className = "contact-message-box show " + type;
}


/* =========================================
   CLEAR FIELD ERRORS
========================================= */

function clearContactErrors() {

    const fields = contactForm.querySelectorAll(
        "input, select, textarea"
    );

    fields.forEach(function(field) {
        field.classList.remove("invalid");
    });
}


/* =========================================
   VALIDATE CONTACT FORM
========================================= */

function validateContactForm() {

    clearContactErrors();

    let isValid = true;

    const firstName =
        document.getElementById("contactFirstName");

    const lastName =
        document.getElementById("contactLastName");

    const email =
        document.getElementById("contactEmail");

    const phone =
        document.getElementById("contactPhone");

    const subject =
        document.getElementById("contactSubject");

    const message =
        document.getElementById("contactMessage");


    /* FIRST NAME */

    if (firstName.value.trim() === "") {

        firstName.classList.add("invalid");

        isValid = false;
    }


    /* LAST NAME */

    if (lastName.value.trim() === "") {

        lastName.classList.add("invalid");

        isValid = false;
    }


    /* EMAIL */

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
        email.value.trim() === "" ||
        !emailPattern.test(email.value.trim())
    ) {

        email.classList.add("invalid");

        isValid = false;
    }


    /* PHONE */

    if (phone.value.trim() !== "") {

        const phonePattern =
            /^[0-9+\-\s()]{7,20}$/;

        if (!phonePattern.test(phone.value.trim())) {

            phone.classList.add("invalid");

            isValid = false;
        }
    }


    /* SUBJECT */

    if (subject.value === "") {

        subject.classList.add("invalid");

        isValid = false;
    }


    /* MESSAGE */

    if (message.value.trim().length < 10) {

        message.classList.add("invalid");

        isValid = false;
    }


    return isValid;
}


/* =========================================
   FORM SUBMISSION
========================================= */

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            /* CLEAR OLD MESSAGE */

            if (contactMessageBox) {

                contactMessageBox.className =
                    "contact-message-box";

                contactMessageBox.textContent = "";
            }


            /* VALIDATE */

            const isValid =
                validateContactForm();


            if (!isValid) {

                showContactMessage(
                    "Please check the highlighted fields and try again.",
                    "error"
                );

                return;
            }


            /* BUTTON LOADING STATE */

            if (contactButton) {

                contactButton.disabled = true;

                contactButton.textContent =
                    "Sending Message...";
            }


            /*
                TEMPORARY FRONTEND SUBMISSION

                Real email/backend connection
                will be added in a later phase.
            */

            setTimeout(function() {

                showContactMessage(
                    "Thank you for contacting Tats Design. Your message has been received.",
                    "success"
                );


                contactForm.reset();


                if (contactButton) {

                    contactButton.disabled = false;

                    contactButton.textContent =
                        "Send Message";
                }

            }, 1000);

        }
    );
}


/* =========================================
   REMOVE ERROR WHEN USER STARTS TYPING
========================================= */

if (contactForm) {

    const contactFields =
        contactForm.querySelectorAll(
            "input, select, textarea"
        );

    contactFields.forEach(function(field) {

        field.addEventListener(
            "input",
            function() {

                field.classList.remove("invalid");

            }
        );

        field.addEventListener(
            "change",
            function() {

                field.classList.remove("invalid");

            }
        );

    });
}