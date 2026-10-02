/* =========================================
   TATS DESIGN - CUSTOM ORDER
   ========================================= */


/* =========================================
   FORM ELEMENTS
   ========================================= */

const customOrderForm =
    document.getElementById("customOrderForm");

const customOrderMessage =
    document.getElementById("customOrderMessage");

const customOrderButton =
    document.getElementById("customOrderButton");


/* =========================================
   SHOW MESSAGE
   ========================================= */

function showCustomOrderMessage(message) {

    if (!customOrderMessage) {
        return;
    }

    customOrderMessage.textContent = message;

    customOrderMessage.classList.add("show");
}


/* =========================================
   HIDE MESSAGE
   ========================================= */

function hideCustomOrderMessage() {

    if (!customOrderMessage) {
        return;
    }

    customOrderMessage.textContent = "";

    customOrderMessage.classList.remove("show");
}


/* =========================================
   SUBMIT CUSTOM ORDER
   ========================================= */

if (customOrderForm) {

    customOrderForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            hideCustomOrderMessage();


            /* =================================
               GET FORM VALUES
               ================================= */

            const firstName =
                document
                    .getElementById("customFirstName")
                    .value
                    .trim();

            const lastName =
                document
                    .getElementById("customLastName")
                    .value
                    .trim();

            const email =
                document
                    .getElementById("customEmail")
                    .value
                    .trim()
                    .toLowerCase();

            const phone =
                document
                    .getElementById("customPhone")
                    .value
                    .trim();

            const shoeType =
                document
                    .getElementById("customShoeType")
                    .value;

            const size =
                document
                    .getElementById("customSize")
                    .value;

            const color =
                document
                    .getElementById("customColor")
                    .value
                    .trim();

            const material =
                document
                    .getElementById("customMaterial")
                    .value;

            const description =
                document
                    .getElementById("customDescription")
                    .value
                    .trim();

            const referenceInput =
                document
                    .getElementById("customReference");


            /* =================================
               BASIC VALIDATION
               ================================= */

            if (
                !firstName ||
                !lastName ||
                !email ||
                !phone ||
                !shoeType ||
                !size ||
                !color ||
                !material ||
                !description
            ) {

                showCustomOrderMessage(
                    "Please complete all required fields."
                );

                return;
            }


            /* =================================
               EMAIL VALIDATION
               ================================= */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                showCustomOrderMessage(
                    "Please enter a valid email address."
                );

                return;
            }


            /* =================================
               DESCRIPTION VALIDATION
               ================================= */

            if (description.length < 10) {

                showCustomOrderMessage(
                    "Please provide more details about your custom design."
                );

                return;
            }


            /* =================================
               REFERENCE IMAGE
               ================================= */

            let referenceImageName = "";


            if (
                referenceInput &&
                referenceInput.files.length > 0
            ) {

                const referenceImage =
                    referenceInput.files[0];


                const allowedTypes = [
                    "image/jpeg",
                    "image/png",
                    "image/webp"
                ];


                if (
                    !allowedTypes.includes(
                        referenceImage.type
                    )
                ) {

                    showCustomOrderMessage(
                        "Please upload a JPG, PNG or WEBP image."
                    );

                    return;
                }


                /* Maximum 5 MB */

                const maxFileSize =
                    5 * 1024 * 1024;


                if (
                    referenceImage.size >
                    maxFileSize
                ) {

                    showCustomOrderMessage(
                        "The reference image must be 5 MB or smaller."
                    );

                    return;
                }


                referenceImageName =
                    referenceImage.name;

            }


            /* =================================
               GET EXISTING REQUESTS
               ================================= */

            const customOrders =
                JSON.parse(
                    localStorage.getItem(
                        "tatsDesignCustomOrders"
                    )
                ) || [];


            /* =================================
               CREATE REQUEST NUMBER
               ================================= */

            const requestNumber =
                "CUSTOM-" + Date.now();


            /* =================================
               CREATE CUSTOM ORDER
               ================================= */

            const customOrder = {

                requestNumber:

                    requestNumber,

                customer: {

                    firstName:
                        firstName,

                    lastName:
                        lastName,

                    email:
                        email,

                    phone:
                        phone

                },

                footwear: {

                    type:
                        shoeType,

                    size:
                        size,

                    color:
                        color,

                    material:
                        material

                },

                description:
                    description,

                referenceImage:
                    referenceImageName,

                status:
                    "pending",

                createdAt:
                    new Date().toISOString()

            };


            /* =================================
               SAVE REQUEST
               ================================= */

            customOrders.push(
                customOrder
            );


            localStorage.setItem(
                "tatsDesignCustomOrders",
                JSON.stringify(customOrders)
            );


            /* =================================
               SUCCESS MESSAGE
               ================================= */

            showCustomOrderMessage(
                "Your custom footwear request has been submitted successfully. Request number: " +
                requestNumber
            );


            /* =================================
               DISABLE BUTTON TEMPORARILY
               ================================= */

            if (customOrderButton) {

                customOrderButton.disabled =
                    true;

                customOrderButton.textContent =
                    "Request Submitted";

            }


            /* =================================
               RESET FORM
               ================================= */

            customOrderForm.reset();


            /* =================================
               RESTORE BUTTON
               ================================= */

            setTimeout(
                function() {

                    if (customOrderButton) {

                        customOrderButton.disabled =
                            false;

                        customOrderButton.textContent =
                            "Submit Custom Request";

                    }

                },
                2500
            );

        }
    );

}