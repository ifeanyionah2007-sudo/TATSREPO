/* =========================================
   TATS DESIGN
   AUTHENTICATION
   PHASE 11B
========================================= */


/* =========================================
   REGISTRATION
========================================= */
if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /* =========================================
               GET FORM VALUES
            ========================================= */

            const firstName =
                document
                    .getElementById("registerFirstName")
                    .value
                    .trim();

            const lastName =
                document
                    .getElementById("registerLastName")
                    .value
                    .trim();

            const email =
                document
                    .getElementById("registerEmail")
                    .value
                    .trim()
                    .toLowerCase();

            const phone =
                document
                    .getElementById("registerPhone")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("registerPassword")
                    .value;

            const confirmPassword =
                document
                    .getElementById("registerConfirmPassword")
                    .value;


            /* =========================================
               VALIDATION
            ========================================= */

            if (
                !firstName ||
                !lastName ||
                !email ||
                !phone ||
                !password ||
                !confirmPassword
            ) {

                showRegisterMessage(
                    "Please complete all fields."
                );

                return;
            }


            if (password.length < 8) {

                showRegisterMessage(
                    "Password must be at least 8 characters."
                );

                return;
            }


            if (password !== confirmPassword) {

                showRegisterMessage(
                    "Passwords do not match."
                );

                return;
            }


            /* =========================================
               DISABLE BUTTON
            ========================================= */

            if (registerButton) {

                registerButton.disabled = true;

                registerButton.textContent =
                    "Creating Account...";

            }


            /* =========================================
               SEND CUSTOMER TO BACKEND
            ========================================= */

            try {

                const response = await fetch(
                    "http://localhost:3000/api/customers/register",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({

                            firstName: firstName,

                            lastName: lastName,

                            email: email,

                            phone: phone,

                            password: password

                        })

                    }
                );


                const data = await response.json();


                /* =========================================
                   CHECK BACKEND RESPONSE
                ========================================= */

                if (!response.ok || !data.success) {

                    showRegisterMessage(
                        data.message ||
                        "Registration failed. Please try again."
                    );


                    if (registerButton) {

                        registerButton.disabled = false;

                        registerButton.textContent =
                            "Create Account";

                    }

                    return;
                }


                /* =========================================
                   SAVE CURRENT CUSTOMER LOCALLY
                   TEMPORARILY
                ========================================= */

                const customer = data.customer;


                let customers =
                    JSON.parse(
                        localStorage.getItem(
                            "tatsDesignCustomers"
                        )
                    ) || [];


                customers.push(customer);


                localStorage.setItem(
                    "tatsDesignCustomers",
                    JSON.stringify(customers)
                );


                /* =========================================
                   SHOW SUCCESS
                ========================================= */

                showRegisterMessage(
                    "Registration successful! Redirecting to login..."
                );


                if (registerButton) {

                    registerButton.textContent =
                        "Registration Successful";

                }


                /* =========================================
                   REDIRECT TO LOGIN
                ========================================= */

                setTimeout(
                    function () {

                        window.location.href =
                            "login.html";

                    },
                    1500
                );


            } catch (error) {

                console.error(
                    "Registration error:",
                    error
                );


                showRegisterMessage(
                    "Unable to connect to the server. Please try again."
                );


                if (registerButton) {

                    registerButton.disabled = false;

                    registerButton.textContent =
                        "Create Account";

                }

            }

        }
    );

}


/* =========================================
   REGISTRATION MESSAGE
========================================= */

function showRegisterMessage(message) {

    if (!registerMessage) {
        return;
    }

    registerMessage.textContent =
        message;

    registerMessage.classList.add("show");

}


/* =========================================
   SHOW / HIDE REGISTRATION PASSWORD
========================================= */

const toggleRegisterPassword =
    document.getElementById(
        "toggleRegisterPassword"
    );

const registerPassword =
    document.getElementById(
        "registerPassword"
    );


if (
    toggleRegisterPassword &&
    registerPassword
) {

    toggleRegisterPassword.addEventListener(
        "click",
        function () {

            if (
                registerPassword.type ===
                "password"
            ) {

                registerPassword.type =
                    "text";

                toggleRegisterPassword.textContent =
                    "Hide";

            } else {

                registerPassword.type =
                    "password";

                toggleRegisterPassword.textContent =
                    "Show";

            }

        }
    );

}


/* =========================================
   SHOW / HIDE CONFIRM PASSWORD
========================================= */

const toggleConfirmPassword =
    document.getElementById(
        "toggleConfirmPassword"
    );

const registerConfirmPassword =
    document.getElementById(
        "registerConfirmPassword"
    );


if (
    toggleConfirmPassword &&
    registerConfirmPassword
) {

    toggleConfirmPassword.addEventListener(
        "click",
        function () {

            if (
                registerConfirmPassword.type ===
                "password"
            ) {

                registerConfirmPassword.type =
                    "text";

                toggleConfirmPassword.textContent =
                    "Hide";

            } else {

                registerConfirmPassword.type =
                    "password";

                toggleConfirmPassword.textContent =
                    "Show";

            }

        }
    );

}

/* =========================================
   TATS DESIGN
   LOGIN
   PHASE 11D
========================================= */

const loginForm =
    document.getElementById("loginForm");

const loginMessage =
    document.getElementById("loginMessage");

const loginButton =
    document.getElementById("loginButton");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* =========================================
               GET LOGIN INFORMATION
            ========================================= */

            const email =
                document
                    .getElementById("loginEmail")
                    .value
                    .trim()
                    .toLowerCase();

            const password =
                document
                    .getElementById("loginPassword")
                    .value;


            /* =========================================
               VALIDATE FORM
            ========================================= */

            if (!email || !password) {

                showLoginMessage(
                    "Please enter your email and password."
                );

                return;
            }


            /* =========================================
               GET REGISTERED CUSTOMERS
            ========================================= */

            const customers =
                JSON.parse(
                    localStorage.getItem(
                        "tatsDesignCustomers"
                    )
                ) || [];


            /* =========================================
               FIND CUSTOMER
            ========================================= */

            const customer =
                customers.find(
                    function (item) {

                        return (
                            item.email === email &&
                            item.password === password
                        );

                    }
                );


            /* =========================================
               CHECK LOGIN
            ========================================= */

            if (!customer) {

                showLoginMessage(
                    "Incorrect email or password."
                );

                return;
            }


            /* =========================================
               CREATE CURRENT USER SESSION
            ========================================= */

            const currentUser = {

                id:
                    customer.id,

                firstName:
                    customer.firstName,

                lastName:
                    customer.lastName,

                email:
                    customer.email,

                phone:
                    customer.phone

            };


            localStorage.setItem(
                "tatsDesignCurrentUser",
                JSON.stringify(currentUser)
            );


            /* =========================================
               SUCCESS MESSAGE
            ========================================= */

            showLoginMessage(
                "Login successful! Redirecting..."
            );


            /* =========================================
               DISABLE BUTTON
            ========================================= */

            if (loginButton) {

                loginButton.disabled = true;

                loginButton.textContent =
                    "Login Successful";

            }


            /* =========================================
               REDIRECT TO ACCOUNT
            ========================================= */

            setTimeout(
                function () {

                    window.location.href =
                        "account.html";

                },
                1000
            );

        }
    );

}


/* =========================================
   LOGIN MESSAGE FUNCTION
========================================= */

function showLoginMessage(message) {

    if (!loginMessage) {
        return;
    }

    loginMessage.textContent =
        message;

    loginMessage.classList.add("show");

}


/* =========================================
   SHOW / HIDE LOGIN PASSWORD
========================================= */

const toggleLoginPassword =
    document.getElementById(
        "toggleLoginPassword"
    );

const loginPassword =
    document.getElementById(
        "loginPassword"
    );


if (
    toggleLoginPassword &&
    loginPassword
) {

    toggleLoginPassword.addEventListener(
        "click",
        function () {

            if (
                loginPassword.type ===
                "password"
            ) {

                loginPassword.type =
                    "text";

                toggleLoginPassword.textContent =
                    "Hide";

            } else {

                loginPassword.type =
                    "password";

                toggleLoginPassword.textContent =
                    "Show";

            }

        }
    );

}