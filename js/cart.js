/* =========================================
   TATS DESIGN
   SHOPPING CART
   PHASE 8C
========================================= */

let cart = JSON.parse(
    localStorage.getItem("tatsDesignCart")
) || [];


/* =========================================
   SAVE CART
========================================= */

function saveCart() {
    localStorage.setItem(
        "tatsDesignCart",
        JSON.stringify(cart)
    );
}


/* =========================================
   UPDATE CART COUNT
========================================= */

function updateCartCount() {
    const cartCountElements =
        document.querySelectorAll(".cart-count");

    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCountElements.forEach(element => {
        element.textContent = totalQuantity;
    });
}


/* =========================================
   ADD TO CART
========================================= */

function addToCart(productId) {

    const product = products.find(
        item => item.id === Number(productId)
    );

    if (!product) {
        return;
    }

    const existingItem = cart.find(
        item => item.productId === product.id
    );

    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({
            productId: product.id,
            name: product.name,
            category: product.categoryName,
            price: product.price,
            quantity: 1,
            size: product.sizes.split("–")[0],
            badge: product.badge
        });

    }

    saveCart();
    updateCartCount();

    alert(
        `${product.name} has been added to your cart.`
    );
}


/* =========================================
   SETUP ADD TO CART BUTTONS
========================================= */

function setupAddToCartButtons() {

    const addButtons =
        document.querySelectorAll(
            ".shop-add-cart, .product-add-cart"
        );

    addButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const productId =
                    this.dataset.productId;

                addToCart(productId);

            }
        );

    });
}


/* =========================================
   DISPLAY CART
========================================= */

function displayCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartEmpty =
        document.getElementById("cartEmpty");

    const cartSubtotal =
        document.getElementById("cartSubtotal");

    const cartDelivery =
        document.getElementById("cartDelivery");

    const cartTotal =
        document.getElementById("cartTotal");


    if (!cartItems) {
        return;
    }


    /* EMPTY CART */

    if (cart.length === 0) {

        cartItems.innerHTML = "";

        if (cartEmpty) {
            cartEmpty.style.display = "block";
        }

        if (cartSubtotal) {
            cartSubtotal.textContent = "₦0";
        }

        if (cartDelivery) {
            cartDelivery.textContent = "₦0";
        }

        if (cartTotal) {
            cartTotal.textContent = "₦0";
        }

        return;
    }


    if (cartEmpty) {
        cartEmpty.style.display = "none";
    }


    let subtotal = 0;


    cartItems.innerHTML = cart.map(item => {

        const itemTotal =
            item.price * item.quantity;

        subtotal += itemTotal;


        return `
            <div class="cart-item">

                <div class="cart-item-image">
                    <div class="cart-placeholder">
                        ${item.name}
                    </div>
                </div>

                <div class="cart-item-details">

                    <h3>${item.name}</h3>

                    <p>
                        ${item.category}
                    </p>

                    <p>
                        Size: ${item.size}
                    </p>

                    <strong>
                        ₦${item.price.toLocaleString()}
                    </strong>

                </div>


                <div class="cart-item-actions">

                    <div class="cart-quantity">

                        <button
                            type="button"
                            class="cart-minus"
                            data-product-id="${item.productId}"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            type="button"
                            class="cart-plus"
                            data-product-id="${item.productId}"
                        >
                            +
                        </button>

                    </div>


                    <button
                        type="button"
                        class="cart-remove"
                        data-product-id="${item.productId}"
                    >
                        Remove
                    </button>

                </div>

            </div>
        `;

    }).join("");


    /* DELIVERY */

    const delivery =
        subtotal >= 100000 ? 0 : 3000;


    const total =
        subtotal + delivery;


    if (cartSubtotal) {

        cartSubtotal.textContent =
            `₦${subtotal.toLocaleString()}`;

    }


    if (cartDelivery) {

        cartDelivery.textContent =
            delivery === 0
                ? "Free"
                : `₦${delivery.toLocaleString()}`;

    }


    if (cartTotal) {

        cartTotal.textContent =
            `₦${total.toLocaleString()}`;

    }


    setupCartButtons();

}


/* =========================================
   CART BUTTONS
========================================= */

function setupCartButtons() {

    const plusButtons =
        document.querySelectorAll(".cart-plus");

    const minusButtons =
        document.querySelectorAll(".cart-minus");

    const removeButtons =
        document.querySelectorAll(".cart-remove");


    /* PLUS */

    plusButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const productId =
                    Number(
                        this.dataset.productId
                    );

                const item =
                    cart.find(
                        item =>
                            item.productId === productId
                    );

                if (item) {

                    item.quantity += 1;

                    saveCart();

                    updateCartCount();

                    displayCart();

                }

            }
        );

    });


    /* MINUS */

    minusButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const productId =
                    Number(
                        this.dataset.productId
                    );

                const item =
                    cart.find(
                        item =>
                            item.productId === productId
                    );

                if (!item) {
                    return;
                }


                if (item.quantity > 1) {

                    item.quantity -= 1;

                } else {

                    cart =
                        cart.filter(
                            item =>
                                item.productId !== productId
                        );

                }


                saveCart();

                updateCartCount();

                displayCart();

            }
        );

    });


    /* REMOVE */

    removeButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const productId =
                    Number(
                        this.dataset.productId
                    );

                cart =
                    cart.filter(
                        item =>
                            item.productId !== productId
                    );

                saveCart();

                updateCartCount();

                displayCart();

            }
        );

    });

}


/* =========================================
   INITIALIZE CART
========================================= */

updateCartCount();

setupAddToCartButtons();

displayCart();