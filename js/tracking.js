/* =========================================
   TATS DESIGN - ORDER TRACKING
   ========================================= */


/* =========================================
   TRACKING ELEMENTS
   ========================================= */

const trackingForm =
    document.getElementById("trackingForm");

const orderNumberInput =
    document.getElementById("orderNumber");

const trackingMessage =
    document.getElementById("trackingMessage");

const trackingResult =
    document.getElementById("trackingResult");

const trackingButton =
    document.getElementById("trackingButton");


/* =========================================
   SHOW TRACKING MESSAGE
   ========================================= */

function showTrackingMessage(message) {

    if (!trackingMessage) {
        return;
    }

    trackingMessage.textContent = message;

    trackingMessage.classList.add("show");
}


/* =========================================
   HIDE TRACKING MESSAGE
   ========================================= */

function hideTrackingMessage() {

    if (!trackingMessage) {
        return;
    }

    trackingMessage.textContent = "";

    trackingMessage.classList.remove("show");
}


/* =========================================
   DISPLAY ORDER
   ========================================= */

function displayTrackedOrder(order) {

    if (!trackingResult) {
        return;
    }


    const customerName =
        order.customer.firstName +
        " " +
        order.customer.lastName;


    const orderDate =
        new Date(order.createdAt);


    const formattedDate =
        orderDate.toLocaleDateString(
            "en-NG",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );


    let itemsHTML = "";


    order.items.forEach(function(item) {

        const itemTotal =
            item.price * item.quantity;


        itemsHTML += `

            <div class="tracking-item">

                <div>

                    <div class="tracking-item-name">
                        ${item.name}
                    </div>

                    <div class="tracking-item-quantity">
                        Quantity: ${item.quantity}
                    </div>

                </div>


                <div class="tracking-item-price">
                    ₦${itemTotal.toLocaleString()}
                </div>

            </div>

        `;

    });


    const timelineHTML = `

        <div class="tracking-timeline">

            <h3>
                Order Progress
            </h3>


            <div class="tracking-step completed">

                <div class="tracking-step-icon">
                    ✓
                </div>

                <div class="tracking-step-content">

                    <h4>
                        Order Placed
                    </h4>

                    <p>
                        Your order has been received.
                    </p>

                </div>

            </div>


            <div class="tracking-step completed">

                <div class="tracking-step-icon">
                    ✓
                </div>

                <div class="tracking-step-content">

                    <h4>
                        Payment Confirmed
                    </h4>

                    <p>
                        Your payment is currently recorded as
                        ${order.paymentStatus}.
                    </p>

                </div>

            </div>


            <div class="tracking-step active">

                <div class="tracking-step-icon">
                    •
                </div>

                <div class="tracking-step-content">

                    <h4>
                        Processing
                    </h4>

                    <p>
                        Your order is being prepared.
                    </p>

                </div>

            </div>


            <div class="tracking-step">

                <div class="tracking-step-icon">
                    4
                </div>

                <div class="tracking-step-content">

                    <h4>
                        Shipped
                    </h4>

                    <p>
                        Your order will be updated here
                        when it has been shipped.
                    </p>

                </div>

            </div>


            <div class="tracking-step">

                <div class="tracking-step-icon">
                    5
                </div>

                <div class="tracking-step-content">

                    <h4>
                        Delivered
                    </h4>

                    <p>
                        Delivery information will appear
                        here when your order is delivered.
                    </p>

                </div>

            </div>

        </div>

    `;


    trackingResult.innerHTML = `

        <div class="tracking-order-card">


            <div class="tracking-order-header">

                <div>

                    <h2>
                        Order Details
                    </h2>

                    <div class="tracking-order-number">
                        ${order.orderNumber}
                    </div>

                </div>


                <div class="tracking-status">
                    ${order.orderStatus}
                </div>

            </div>



            <div class="tracking-order-details">


                <div class="tracking-detail-item">

                    <span class="tracking-detail-label">
                        Customer
                    </span>

                    <span class="tracking-detail-value">
                        ${customerName}
                    </span>

                </div>


                <div class="tracking-detail-item">

                    <span class="tracking-detail-label">
                        Order Date
                    </span>

                    <span class="tracking-detail-value">
                        ${formattedDate}
                    </span>

                </div>


                <div class="tracking-detail-item">

                    <span class="tracking-detail-label">
                        Total
                    </span>

                    <span class="tracking-detail-value">
                        ₦${order.total.toLocaleString()}
                    </span>

                </div>


            </div>



            ${timelineHTML}



            <div class="tracking-items">

                <h3>
                    Ordered Items
                </h3>

                ${itemsHTML}

            </div>


        </div>

    `;


    trackingResult.classList.add("show");

}


/* =========================================
   TRACK ORDER
   ========================================= */

if (trackingForm) {

    trackingForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            hideTrackingMessage();


            if (trackingResult) {
                trackingResult.classList.remove("show");
                trackingResult.innerHTML = "";
            }


            const enteredOrderNumber =
                orderNumberInput.value
                    .trim()
                    .toUpperCase();


            if (!enteredOrderNumber) {

                showTrackingMessage(
                    "Please enter your order number."
                );

                return;
            }


            const savedOrder =
                JSON.parse(
                    localStorage.getItem(
                        "tatsDesignOrder"
                    )
                );


            if (!savedOrder) {

                showTrackingMessage(
                    "No order was found. Please place an order first."
                );

                return;
            }


            if (
                savedOrder.orderNumber.toUpperCase() !==
                enteredOrderNumber
            ) {

                showTrackingMessage(
                    "Order not found. Please check your order number and try again."
                );

                return;
            }


            if (trackingButton) {

                trackingButton.disabled = true;

                trackingButton.textContent =
                    "Order Found";

            }


            displayTrackedOrder(savedOrder);


            setTimeout(function() {

                if (trackingButton) {

                    trackingButton.disabled = false;

                    trackingButton.textContent =
                        "Track Order";

                }

            }, 1000);

        }
    );

}