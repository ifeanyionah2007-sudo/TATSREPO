/* =========================================
   TATS DESIGN
   CHECKOUT
   PHASE 10C
========================================= */


/* =========================================
   CHECKOUT ELEMENTS
========================================= */

const checkoutItems =
    document.getElementById("checkoutItems");

const checkoutSubtotal =
    document.getElementById("checkoutSubtotal");

const checkoutDelivery =
    document.getElementById("checkoutDelivery");

const checkoutTotal =
    document.getElementById("checkoutTotal");

const checkoutForm =
    document.getElementById("checkoutForm");

const placeOrderButton =
    document.getElementById("placeOrderButton");


/* =========================================
   GET CART
========================================= */

let checkoutCart =
    JSON.parse(
        localStorage.getItem("tatsDesignCart")
    ) || [];


/* =========================================
   FORMAT PRICE
========================================= */

function formatCheckoutPrice(price) {

    return "₦" + price.toLocaleString("en-NG");

}


/* =========================================
   DISPLAY CHECKOUT
========================================= */

function displayCheckout() {

    if (!checkoutItems) {
        return;
    }


    /* =====================================
       EMPTY CART
    ===================================== */

    if (checkoutCart.length === 0) {

        checkoutItems.innerHTML = `
            <div class="checkout-empty">

                <p>
                    Your cart is empty.
                </p>

                <a
                    href="shop.html"
                    class="btn btn-primary"
                >
                    Continue Shopping
                </a>

            </div>
        `;


        if (checkoutSubtotal) {
            checkoutSubtotal.textContent = "₦0";
        }

        if (checkoutDelivery) {
            checkoutDelivery.textContent = "₦0";
        }

        if (checkoutTotal) {
            checkoutTotal.textContent = "₦0";
        }


        if (placeOrderButton) {
            placeOrderButton.disabled = true;
        }

        return;

    }


    /* =====================================
       CART HAS PRODUCTS
    ===================================== */

    if (placeOrderButton) {
        placeOrderButton.disabled = false;
    }


    checkoutItems.innerHTML =
        checkoutCart.map(item => {

            const itemTotal =
                item.price * item.quantity;


            return `
                <div class="checkout-item">

                    <div class="checkout-item-image">
                        PRODUCT
                    </div>

                    <div class="checkout-item-info">

                        <h3>
                            ${item.name}
                        </h3>

                        <p>
                            Quantity: ${item.quantity}
                        </p>

                    </div>

                    <strong class="checkout-item-price">
                        ${formatCheckoutPrice(itemTotal)}
                    </strong>

                </div>
            `;

        }).join("");


    /* =====================================
       CALCULATE SUBTOTAL
    ===================================== */

    const subtotal =
        checkoutCart.reduce(
            (total, item) => {

                return total +
                    (item.price * item.quantity);

            },
            0
        );


    /* =====================================
       DELIVERY
    ===================================== */

    const delivery =
        subtotal >= 100000
            ? 0
            : 3000;


    /* =====================================
       TOTAL
    ===================================== */

    const total =
        subtotal + delivery;


    /* =====================================
       UPDATE SUMMARY
    ===================================== */

    if (checkoutSubtotal) {

        checkoutSubtotal.textContent =
            formatCheckoutPrice(subtotal);

    }


    if (checkoutDelivery) {

        checkoutDelivery.textContent =
            delivery === 0
                ? "FREE"
                : formatCheckoutPrice(delivery);

    }


    if (checkoutTotal) {

        checkoutTotal.textContent =
            formatCheckoutPrice(total);

    }

}


/* =========================================
   FORM VALIDATION
========================================= */

function setupCheckoutForm() {

    if (!checkoutForm) {
        return;
    }


    checkoutForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            if (checkoutCart.length === 0) {

                alert(
                    "Your cart is empty. Please add a product before checkout."
                );

                return;

            }


            const selectedPayment =
                document.querySelector(
                    'input[name="paymentMethod"]:checked'
                );


            if (!selectedPayment) {

                alert(
                    "Please select a payment method."
                );

                return;

            }


            const firstName =
                document.getElementById("firstName");

            const lastName =
                document.getElementById("lastName");

            const email =
                document.getElementById("email");

            const phone =
                document.getElementById("phone");

            const address =
                document.getElementById("address");

            const state =
                document.getElementById("state");

            const city =
                document.getElementById("city");


            if (
                !firstName.value.trim() ||
                !lastName.value.trim() ||
                !email.value.trim() ||
                !phone.value.trim() ||
                !address.value.trim() ||
                !state.value ||
                !city.value.trim()
            ) {

                alert(
                    "Please complete all required delivery and customer information."
                );

                return;

            }


            /* =================================
               TEMPORARY PAYMENT MESSAGE
            ================================= */

            const paymentMethod =
                selectedPayment.value === "paystack"
                    ? "Paystack"
                    : "Flutterwave";


            /* =========================================
               CREATE ORDER NUMBER
            ========================================= */

            const orderNumber =
                "TATS-" +
                Date.now();


            /* =========================================
               CALCULATE ORDER TOTAL
            ========================================= */

            const subtotal =
                checkoutCart.reduce(
                    (total, item) =>
                        total + (item.price * item.quantity),
                    0
                );

            const delivery =
                subtotal >= 100000 ? 0 : 3000;

            const total =
                subtotal + delivery;


            /* =========================================
               CREATE ORDER OBJECT
            ========================================= */

            const order = {

                orderNumber: orderNumber,

                customer: {

                    firstName:
                        firstName.value.trim(),

                    lastName:
                        lastName.value.trim(),

                    email:
                        email.value.trim(),

                    phone:
                        phone.value.trim(),

                    address:
                        address.value.trim(),

                    state:
                        state.value,

                    city:
                        city.value.trim(),

                    deliveryNotes:
                        document
                            .getElementById("deliveryNotes")
                            .value
                            .trim()

                },

                items: checkoutCart,

                subtotal: subtotal,

                delivery: delivery,

                total: total,

                paymentMethod: paymentMethod,

                paymentStatus: "pending",

                orderStatus: "processing",

                createdAt:
                    new Date().toISOString()

            };


            /* =========================================
               SAVE ORDER
            ========================================= */

            localStorage.setItem(
                "tatsDesignOrder",
                JSON.stringify(order)
            );


            /* =========================================
               PREVENT DOUBLE SUBMISSION
            ========================================= */

            placeOrderButton.disabled = true;

            placeOrderButton.textContent =
                "Preparing Order...";


            /* =========================================
               GO TO ORDER SUCCESS PAGE
            ========================================= */

            window.location.href =
                "order-success.html";

        });

}




/* =========================================
   INITIALIZE CHECKOUT
========================================= */

displayCheckout();

setupCheckoutForm();