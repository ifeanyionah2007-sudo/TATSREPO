/* =========================================
   TATS DESIGN
   WISHLIST
   PHASE 9B
========================================= */


let wishlist = JSON.parse(
    localStorage.getItem("tatsDesignWishlist")
) || [];


/* =========================================
   SAVE WISHLIST
========================================= */

function saveWishlist() {

    localStorage.setItem(
        "tatsDesignWishlist",
        JSON.stringify(wishlist)
    );

}


/* =========================================
   UPDATE WISHLIST COUNT
========================================= */

function updateWishlistCount() {

    const wishlistCountElements =
        document.querySelectorAll(".wishlist-count");

    wishlistCountElements.forEach(element => {

        element.textContent = wishlist.length;

    });

}


/* =========================================
   ADD TO WISHLIST
========================================= */

function addToWishlist(productId) {

    const product = products.find(
        item => item.id === Number(productId)
    );

    if (!product) {
        return;
    }


    const alreadySaved = wishlist.some(
        item => item.productId === product.id
    );


    if (alreadySaved) {

        alert(
            `${product.name} is already in your wishlist.`
        );

        return;

    }


    wishlist.push({

        productId: product.id,

        name: product.name,

        category: product.categoryName,

        price: product.price,

        rating: product.rating,

        reviews: product.reviews,

        sizes: product.sizes,

        badge: product.badge

    });


    saveWishlist();

    updateWishlistCount();

    alert(
        `${product.name} has been added to your wishlist.`
    );

}


/* =========================================
   DISPLAY WISHLIST
========================================= */

function displayWishlist() {

    const wishlistItems =
        document.getElementById("wishlistItems");

    const wishlistEmpty =
        document.getElementById("wishlistEmpty");

    const wishlistItemCount =
        document.getElementById("wishlistItemCount");


    if (!wishlistItems) {
        return;
    }


    /* EMPTY WISHLIST */

    if (wishlist.length === 0) {

        wishlistItems.innerHTML = "";

        if (wishlistEmpty) {
            wishlistEmpty.style.display = "block";
        }

        if (wishlistItemCount) {
            wishlistItemCount.textContent = "0 items";
        }

        return;

    }


    /* WISHLIST HAS ITEMS */

    if (wishlistEmpty) {
        wishlistEmpty.style.display = "none";
    }


    if (wishlistItemCount) {

        wishlistItemCount.textContent =
            `${wishlist.length} ${
                wishlist.length === 1
                    ? "item"
                    : "items"
            }`;

    }


    wishlistItems.innerHTML =
        wishlist.map(item => {

            return `
                <article class="wishlist-card">

                    <div class="wishlist-card-image">

                        <span class="wishlist-badge">
                            ${item.badge || "POPULAR"}
                        </span>

                        <div class="wishlist-image-placeholder">
                            ${item.name}
                        </div>

                    </div>


                    <div class="wishlist-card-content">

                        <p class="wishlist-card-category">
                            ${item.category}
                        </p>

                        <h3>
                            ${item.name}
                        </h3>

                        <div class="wishlist-rating">
                            ★ ${item.rating}
                            <span>
                                (${item.reviews} reviews)
                            </span>
                        </div>

                        <strong class="wishlist-card-price">
                            ₦${item.price.toLocaleString()}
                        </strong>

<div class="wishlist-card-actions">

    <a
        href="product.html?id=${item.productId}"
        class="wishlist-view-button"
    >
        View Product
    </a>

    <button
        type="button"
        class="wishlist-add-cart-button"
        data-product-id="${item.productId}"
    >
        Add to Cart
    </button>

    <button
        type="button"
        class="wishlist-remove-button"
        data-product-id="${item.productId}"
    >
        Remove
    </button>

</div>
 </article>
            `;

        }).join("");


    setupWishlistRemoveButtons();
    setupWishlistCartButtons();
}


/* =========================================
   REMOVE FROM WISHLIST
========================================= */

function setupWishlistRemoveButtons() {

    const removeButtons =
        document.querySelectorAll(
            ".wishlist-remove-button"
        );


    removeButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const productId =
                    Number(
                        this.dataset.productId
                    );


                wishlist =
                    wishlist.filter(
                        item =>
                            item.productId !== productId
                    );


                saveWishlist();

                updateWishlistCount();

                displayWishlist();

            }
        );

    });

}



/* =========================================
   SETUP WISHLIST BUTTONS
========================================= */

function setupWishlistButtons() {

    const wishlistButtons =
        document.querySelectorAll(
            ".shop-wishlist, .product-wishlist"
        );


    wishlistButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const productId =
                    this.dataset.productId;

                addToWishlist(productId);

            }
        );

    });

}
/* =========================================
   ADD WISHLIST ITEM TO CART
========================================= */

function setupWishlistCartButtons() {

    const addCartButtons =
        document.querySelectorAll(
            ".wishlist-add-cart-button"
        );

    addCartButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const productId =
                    Number(
                        this.dataset.productId
                    );

                const product =
                    products.find(
                        item =>
                            item.id === productId
                    );

                if (!product) {
                    alert("Product could not be found.");
                    return;
                }

                if (typeof addToCart !== "function") {
                    alert("Cart system is not available.");
                    return;
                }

                addToCart(productId);

            }
        );

    });

}


updateWishlistCount();

setupWishlistButtons();

displayWishlist();