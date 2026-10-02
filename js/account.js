/* =========================================
   TATS DESIGN - ACCOUNT DASHBOARD
   ========================================= */


/* =========================================
   GET CURRENT USER
   ========================================= */

const currentUser =
    JSON.parse(
        localStorage.getItem("tatsDesignCurrentUser")
    );


/* =========================================
   PAGE PROTECTION
   ========================================= */

if (!currentUser) {

    window.location.href = "login.html";

}


/* =========================================
   DISPLAY CUSTOMER INFORMATION
   ========================================= */

if (currentUser) {

    const customerFirstName =
        document.getElementById(
            "customerFirstName"
        );

    const customerName =
        document.getElementById(
            "customerName"
        );

    const customerEmail =
        document.getElementById(
            "customerEmail"
        );

    const customerPhone =
        document.getElementById(
            "customerPhone"
        );


    if (customerFirstName) {

        customerFirstName.textContent =
            currentUser.firstName;

    }


    if (customerName) {

        customerName.textContent =
            currentUser.firstName +
            " " +
            currentUser.lastName;

    }


    if (customerEmail) {

        customerEmail.textContent =
            currentUser.email;

    }


    if (customerPhone) {

        customerPhone.textContent =
            currentUser.phone || "Not provided";

    }

}


/* =========================================
   GET WISHLIST COUNT
   ========================================= */

function updateAccountWishlistCount() {

    const wishlist =
        JSON.parse(
            localStorage.getItem(
                "tatsDesignWishlist"
            )
        ) || [];


    const wishlistCount =
        document.getElementById(
            "wishlistCount"
        );


    if (wishlistCount) {

        wishlistCount.textContent =
            wishlist.length;

    }

}


/* =========================================
   GET CART COUNT
   ========================================= */

function updateAccountCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem(
                "tatsDesignCart"
            )
        ) || [];


    const cartCount =
        document.getElementById(
            "cartCount"
        );


    if (cartCount) {

        const totalItems =
            cart.reduce(
                function(total, item) {

                    return total + item.quantity;

                },
                0
            );


        cartCount.textContent =
            totalItems;

    }

}


/* =========================================
   GET ORDER COUNT
   ========================================= */

function updateAccountOrderCount() {

    const orderCount =
        document.getElementById(
            "orderCount"
        );


    if (!orderCount) return;


    const savedOrder =
        JSON.parse(
            localStorage.getItem(
                "tatsDesignOrder"
            )
        );


    if (savedOrder) {

        orderCount.textContent = "1";

    } else {

        orderCount.textContent = "0";

    }

}


/* =========================================
   LOGOUT
   ========================================= */

const logoutButton =
    document.getElementById(
        "logoutButton"
    );


if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function() {

            localStorage.removeItem(
                "tatsDesignCurrentUser"
            );


            window.location.href =
                "login.html";

        }
    );

}


/* =========================================
   INITIALIZE ACCOUNT DASHBOARD
   ========================================= */

updateAccountWishlistCount();

updateAccountCartCount();

updateAccountOrderCount();

/* =========================================
   CUSTOM REQUESTS
   ========================================= */

function displayCustomRequests() {

    const customRequests =
        document.getElementById("customRequests");

    if (!customRequests) {
        return;
    }


    const savedRequests =
        JSON.parse(
            localStorage.getItem(
                "tatsDesignCustomOrders"
            )
        ) || [];


    if (savedRequests.length === 0) {

        customRequests.innerHTML = `

            <div class="account-orders-empty">

                <h3>
                    No Custom Requests
                </h3>

                <p>
                    You have not submitted any
                    custom footwear requests yet.
                </p>

                <a
                    href="custom-order.html"
                    class="btn btn-primary"
                >
                    Create Custom Request
                </a>

            </div>

        `;

        return;
    }


    customRequests.innerHTML =
        savedRequests
            .slice()
            .reverse()
            .map(function(request) {

                const requestDate =
                    new Date(
                        request.createdAt
                    );


                const formattedDate =
                    requestDate.toLocaleDateString(
                        "en-NG",
                        {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        }
                    );


                return `

                    <div class="custom-request-item">


                        <div class="custom-request-header">

                            <div>

                                <h3>
                                    ${request.footwear.type}
                                </h3>

                                <p>
                                    ${request.requestNumber}
                                </p>

                            </div>


                            <span class="custom-request-status">
                                ${request.status}
                            </span>

                        </div>



                        <div class="custom-request-details">

                            <div>

                                <span>
                                    Size
                                </span>

                                <strong>
                                    ${request.footwear.size}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Color
                                </span>

                                <strong>
                                    ${request.footwear.color}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Material
                                </span>

                                <strong>
                                    ${request.footwear.material}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Submitted
                                </span>

                                <strong>
                                    ${formattedDate}
                                </strong>

                            </div>

                        </div>



                        <div class="custom-request-description">

                            <span>
                                Design Description
                            </span>

                            <p>
                                ${request.description}
                            </p>

                        </div>


                    </div>

                `;

            })
            .join("");

}


displayCustomRequests();