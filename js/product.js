/* =========================================
   TATS DESIGN
   PRODUCT DATA
========================================= */
let backendProducts = [];
const products = [
    {
        id: 1,
        name: "Classic Leather Loafers",
        category: "men",
        categoryName: "Men's Shoes",
        price: 45000,
        rating: 5,
        reviews: 12,
        sizes: "40–45",
        badge: "NEW",
        description: "A refined leather loafer designed for Nigerian professionals and anyone who wants a clean, comfortable and confident everyday look.",
        material: "Premium Leather",
        stock: 12,
        colors: ["black", "brown", "tan"],
        care: "Clean with a soft cloth and store in a cool, dry place."
    },
    {
        id: 2,
        name: "Everyday Classic Sneakers",
        category: "sneakers",
        categoryName: "Sneakers",
        price: 38500,
        rating: 5,
        reviews: 18,
        sizes: "39–45",
        badge: "POPULAR"
    },

    {
        id: 3,
        name: "Elegant Leather Flats",
        category: "women",
        categoryName: "Women's Shoes",
        price: 32000,
        rating: 5,
        reviews: 15,
        sizes: "36–41",
        badge: "NEW"
    },

    {
        id: 4,
        name: "Premium Comfort Sandals",
        category: "sandals",
        categoryName: "Sandals",
        price: 25000,
        rating: 5,
        reviews: 21,
        sizes: "36–45",
        badge: "BESTSELLER"
    },

    {
        id: 5,
        name: "Executive Leather Shoes",
        category: "corporate",
        categoryName: "Corporate Shoes",
        price: 52000,
        rating: 5,
        reviews: 10,
        sizes: "40–46",
        badge: "PREMIUM"
    },

    {
        id: 6,
        name: "Urban Street Sneakers",
        category: "sneakers",
        categoryName: "Sneakers",
        price: 42000,
        rating: 4,
        reviews: 16,
        sizes: "39–45",
        badge: "NEW"
    },

    {
        id: 7,
        name: "Classic Women's Loafers",
        category: "women",
        categoryName: "Women's Shoes",
        price: 35000,
        rating: 5,
        reviews: 14,
        sizes: "36–41",
        badge: "POPULAR"
    },

    {
        id: 8,
        name: "Comfort Leather Sandals",
        category: "sandals",
        categoryName: "Sandals",
        price: 28000,
        rating: 4,
        reviews: 9,
        sizes: "36–45",
        badge: "NEW"
    },

    {
        id: 9,
        name: "Premium Casual Loafers",
        category: "casual",
        categoryName: "Casual Shoes",
        price: 39000,
        rating: 5,
        reviews: 17,
        sizes: "40–45",
        badge: "POPULAR"
    },

    {
        id: 10,
        name: "Everyday Casual Shoes",
        category: "casual",
        categoryName: "Casual Shoes",
        price: 30000,
        rating: 4,
        reviews: 11,
        sizes: "39–45",
        badge: "NEW"
    },

    {
        id: 11,
        name: "Premium Men's Sneakers",
        category: "men",
        categoryName: "Men's Shoes",
        price: 44000,
        rating: 5,
        reviews: 20,
        sizes: "40–46",
        badge: "BESTSELLER"
    },

    {
        id: 12,
        name: "Elegant Women's Sandals",
        category: "women",
        categoryName: "Women's Shoes",
        price: 27000,
        rating: 5,
        reviews: 13,
        sizes: "36–41",
        badge: "NEW"
    }

];

/* =========================================
   LOAD PRODUCTS FROM BACKEND
========================================= */

async function loadProductsFromBackend() {

    try {

        const response = await fetch(
            "http://localhost:3000/api/products"
        );

        if (!response.ok) {
            throw new Error("Unable to load products.");
        }

        const data = await response.json();

        if (data.success && Array.isArray(data.products)) {

            backendProducts = data.products;

            console.log(
                "Products loaded from backend:",
                backendProducts
            );

        }

    } catch (error) {

        console.error(
            "Backend product loading failed:",
            error
        );

    }

}
/* =========================================
   SHOP PRODUCT DISPLAY
========================================= */

const shopProducts = document.getElementById("shopProducts");
const productCount = document.getElementById("productCount");
const noProducts = document.getElementById("noProducts");


/* =========================================
   FORMAT PRICE
========================================= */

function formatPrice(price) {

    return "₦" + price.toLocaleString("en-NG");

}


/* =========================================
   CREATE STAR RATING
========================================= */

function createRating(rating, reviews) {

    let stars = "";

    for (let i = 1; i <= 5; i++) {

        if (i <= rating) {
            stars += "★";
        } else {
            stars += "☆";
        }

    }

    return `
        <div class="shop-product-rating">
            ${stars}
            <span>(${reviews})</span>
        </div>
    `;

}


/* =========================================
   DISPLAY PRODUCTS
========================================= */

function displayProducts(productList) {

    if (!shopProducts) {
        return;
    }

    shopProducts.innerHTML = "";


    if (productList.length === 0) {

        if (noProducts) {
            noProducts.style.display = "block";
        }

        if (productCount) {
            productCount.textContent = "0";
        }

        return;
    }


    if (noProducts) {
        noProducts.style.display = "none";
    }


    if (productCount) {
        productCount.textContent = productList.length;
    }


    productList.forEach(product => {

        const productCard = document.createElement("article");

        productCard.className = "shop-product-card";

        console.log("Creating product card:", product.name);

        productCard.innerHTML = `

            <div class="shop-product-image">

    <a
        href="product.html?id=${product.id}"
        class="shop-product-image-link"
    >
        <span>PRODUCT IMAGE</span>
    </a>

    <button
        type="button"
        class="shop-wishlist"
         data-product-id="${product.id}"
        aria-label="Add ${product.name} to wishlist"
    >
        ♡
    </button>

    <span class="shop-product-badge">
        ${product.badge}
    </span>

</div>
            <div class="shop-product-info">

                <span class="shop-product-category">
                    ${product.categoryName}
                </span>

                <h3>
                    ${product.name}
                </h3>

                ${createRating(product.rating, product.reviews)}

                <div class="shop-product-price">
                    ${formatPrice(product.price)}
                </div>

                <div class="shop-product-sizes">
                    Sizes: ${product.sizes}
                </div>

                <div class="shop-product-actions">

                    <button
                        type="button"
                        class="shop-add-cart"
                        data-product-id="${product.id}"
                    >
                        Add to Cart
                    </button>

                    <button
                        type="button"
                        class="shop-buy-now"
                        data-product-id="${product.id}"
                    >
                        Buy Now
                    </button>

                </div>

            </div>

        `;


        shopProducts.appendChild(productCard);

    });

}


/* =========================================
   INITIAL DISPLAY
========================================= */

displayProducts(getActiveProducts());


/* =========================================
   SEARCH
========================================= */

const productSearch = document.getElementById("productSearch");

if (productSearch) {

    productSearch.addEventListener("input", function () {

        applyFilters();

    });

}


/* =========================================
   CATEGORY FILTER
========================================= */

const categoryButtons = document.querySelectorAll(
    ".shop-category-button"
);

categoryButtons.forEach(button => {

    button.addEventListener("click", function () {

        categoryButtons.forEach(item => {

            item.classList.remove("active");

        });

        this.classList.add("active");

        applyFilters();

    });

});


/* =========================================
   SORT PRODUCTS
========================================= */

const sortProducts = document.getElementById(
    "sortProducts"
);

if (sortProducts) {

    sortProducts.addEventListener("change", function () {

        applyFilters();

    });

}


/* =========================================
   FILTER + SEARCH + SORT
========================================= */

function applyFilters() {

    let filteredProducts = [...getActiveProducts()];


    /* SEARCH */

    if (productSearch) {

        const searchTerm =
            productSearch.value
                .trim()
                .toLowerCase();


        if (searchTerm !== "") {

            filteredProducts =
                filteredProducts.filter(product => {

                    return (
                        product.name
                            .toLowerCase()
                            .includes(searchTerm)

                        ||

                        product.categoryName
                            .toLowerCase()
                            .includes(searchTerm)

                        ||

                        product.category
                            .toLowerCase()
                            .includes(searchTerm)
                    );

                });

        }

    }


    /* CATEGORY */

    const activeCategory =
        document.querySelector(
            ".shop-category-button.active"
        );


    if (
        activeCategory &&
        activeCategory.dataset.category !== "all"
    ) {

        const selectedCategory =
            activeCategory.dataset.category;


        filteredProducts =
            filteredProducts.filter(product => {

                return (
                    product.category === selectedCategory
                );

            });

    }


    /* SORT */

    const sortValue =
        sortProducts
            ? sortProducts.value
            : "featured";


    if (sortValue === "price-low") {

        filteredProducts.sort((a, b) => {

            return a.price - b.price;

        });

    }


    if (sortValue === "price-high") {

        filteredProducts.sort((a, b) => {

            return b.price - a.price;

        });

    }


    if (sortValue === "rating") {

        filteredProducts.sort((a, b) => {

            return b.rating - a.rating;

        });

    }


    if (sortValue === "newest") {

        filteredProducts.sort((a, b) => {

            return b.id - a.id;

        });

    }


    /* DISPLAY RESULTS */

    displayProducts(filteredProducts);

}
/* =========================================
   PHASE 7 - PRODUCT DETAILS
========================================= */

const productDetails = document.getElementById("productDetails");
const relatedProducts = document.getElementById("relatedProducts");

function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);

    return Number(urlParams.get("id"));
}


function getCurrentProduct() {
    const productId = getProductIdFromUrl();

    return products.find(product => product.id === productId);
}


function displayProductDetails() {

    if (!productDetails) {
        return;
    }

    const product = getCurrentProduct();

    if (!product) {

        productDetails.innerHTML = `
            <div class="no-products">
                <h2>Product Not Found</h2>

                <p>
                    The product you are looking for could not be found.
                </p>

                <a href="shop.html" class="btn btn-primary">
                    Return to Shop
                </a>
            </div>
        `;

        return;
    }

    document.title = `${product.name} | Tats Design`;

    productDetails.innerHTML = `

        <div class="product-details-container">

            <div class="product-gallery">

                <div class="product-main-image">

                    <span>
                        PRODUCT IMAGE
                    </span>

                    <span class="product-badge">
                        ${product.badge}
                    </span>

                </div>

                <div class="product-thumbnails">

                    <div class="product-thumbnail">
                        IMAGE 1
                    </div>

                    <div class="product-thumbnail">
                        IMAGE 2
                    </div>

                    <div class="product-thumbnail">
                        IMAGE 3
                    </div>

                    <div class="product-thumbnail">
                        IMAGE 4
                    </div>

                </div>

            </div>


            <div class="product-details-content">

                <span class="product-category">
                    ${product.categoryName}
                </span>

                <h1>
                    ${product.name}
                </h1>

                <div class="product-rating">

                    <span class="product-rating-stars">
                        ★★★★★
                    </span>

                    <span>
                        ${product.rating}.0
                        (${product.reviews} reviews)
                    </span>

                </div>

                <div class="product-price">
                    ${formatPrice(product.price)}
                </div>

                <p class="product-description">
                    ${product.description || "Premium footwear carefully crafted for comfort, durability and everyday style."}
                </p>


                <div class="product-option">

                    <div class="product-option-label">

                        <strong>Select Size</strong>

                        <a
                            href="#"
                            class="size-guide-link"
                        >
                            Size Guide
                        </a>

                    </div>

                    <div class="product-sizes">

                        ${product.sizes
            .split("–")
            .map(size => `
                                <button
                                    type="button"
                                    class="size-button"
                                >
                                    ${size}
                                </button>
                            `)
            .join("")
        }

                    </div>

                </div>


                <div class="product-option">

                    <div class="product-option-label">

                        <strong>Color</strong>

                        <span>
                            Select a color
                        </span>

                    </div>

                    <div class="product-colors">

                        <button
                            type="button"
                            class="color-button black active"
                            aria-label="Black"
                        ></button>

                        <button
                            type="button"
                            class="color-button brown"
                            aria-label="Brown"
                        ></button>

                        <button
                            type="button"
                            class="color-button tan"
                            aria-label="Tan"
                        ></button>

                    </div>

                </div>


                <div class="product-option">

                    <div class="product-option-label">

                        <strong>Quantity</strong>

                    </div>

                    <div class="product-quantity">

                        <button
                            type="button"
                            class="quantity-button"
                            id="decreaseQuantity"
                        >
                            −
                        </button>

                        <span
                            class="quantity-value"
                            id="productQuantity"
                        >
                            1
                        </span>

                        <button
                            type="button"
                            class="quantity-button"
                            id="increaseQuantity"
                        >
                            +
                        </button>

                    </div>

                </div>


                <div class="product-stock">

                    ${product.stock} pairs available

                </div>


                <div class="product-actions">

                    <button
                        type="button"
                        class="product-add-cart"
                        id="productAddCart"
                        data-product-id="${product.id}"
                    >
                        Add to Cart
                    </button>

                    <button
                        type="button"
                        class="product-buy-now"
                        id="productBuyNow"
                        data-product-id="${product.id}"
                    >
                        Buy Now
                    </button>

                </div>


                <button
                    type="button"
                    class="product-wishlist"
                    id="productWishlist"
                    data-product-id="${product.id}"
                >
                    ♡ Add to Wishlist
                </button>

            </div>

        </div>
    `;


    const material = document.getElementById("productMaterial");
    const category = document.getElementById("productCategory");

    if (material) {
        material.textContent =
            product.material || "Premium Footwear Material";
    }

    if (category) {
        category.textContent = product.categoryName;
    }

    setupProductOptions(product);
    displayRelatedProducts(product);
}


function setupProductOptions(product) {

    const sizeButtons =
        document.querySelectorAll(".size-button");

    sizeButtons.forEach(button => {

        button.addEventListener("click", function () {

            sizeButtons.forEach(item => {
                item.classList.remove("active");
            });

            this.classList.add("active");

        });

    });


    const colorButtons =
        document.querySelectorAll(".color-button");

    colorButtons.forEach(button => {

        button.addEventListener("click", function () {

            colorButtons.forEach(item => {
                item.classList.remove("active");
            });

            this.classList.add("active");

        });

    });


    let quantity = 1;

    const quantityDisplay =
        document.getElementById("productQuantity");

    const decreaseButton =
        document.getElementById("decreaseQuantity");

    const increaseButton =
        document.getElementById("increaseQuantity");


    if (decreaseButton) {

        decreaseButton.addEventListener("click", function () {

            if (quantity > 1) {
                quantity--;
                quantityDisplay.textContent = quantity;
            }

        });

    }


    if (increaseButton) {

        increaseButton.addEventListener("click", function () {

            if (quantity < product.stock) {
                quantity++;
                quantityDisplay.textContent = quantity;
            }

        });

    }

}


function displayRelatedProducts(currentProduct) {

    if (!relatedProducts) {
        return;
    }

    const related = products
        .filter(product =>
            product.id !== currentProduct.id &&
            product.category === currentProduct.category
        )
        .slice(0, 4);


    if (related.length === 0) {

        relatedProducts.innerHTML = `
            <p>
                More products will be available soon.
            </p>
        `;

        return;
    }


    relatedProducts.innerHTML = "";


    related.forEach(product => {

        const card =
            document.createElement("article");

        card.className =
            "related-product-card";

        card.innerHTML = `

            <a
                href="product.html?id=${product.id}"
                class="related-product-image"
            >
                <span>
                    PRODUCT IMAGE
                </span>
            </a>

            <div class="related-product-info">

                <span>
                    ${product.categoryName}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <div class="related-product-price">
                    ${formatPrice(product.price)}
                </div>

            </div>

        `;

        relatedProducts.appendChild(card);

    });

}


displayProductDetails();
loadProductsFromBackend();
/* =========================================
   GET ACTIVE PRODUCTS
========================================= */

function getActiveProducts() {

    if (backendProducts.length > 0) {
        return backendProducts;
    }

    return products;
}

/* =========================================
   LOAD PRODUCTS FROM BACKEND
========================================= */

loadProductsFromBackend();


/* =========================================
   LOAD PRODUCT DETAILS FROM BACKEND
========================================= */

async function loadProductFromBackend(productId) {

    try {

        const response = await fetch(
            "http://localhost:3000/api/products/" + productId
        );

        if (!response.ok) {
            throw new Error("Product could not be loaded.");
        }

        const data = await response.json();

        if (data.success && Array.isArray(data.products)) {

            backendProducts = data.products;

            console.log(
                "Products loaded from backend:",
                backendProducts
            );

            if (shopProducts) {
                displayProducts(backendProducts);
            }
        }

        const backendProduct =
            data.product ??
            (Array.isArray(data.products)
                ? data.products.find(item => item.id === productId)
                : null);

        if (backendProduct) {
            const existingProduct = products.find(function (item) {
                return item.id === backendProduct.id;
            });

            if (existingProduct) {
                Object.assign(
                    existingProduct,
                    backendProduct
                );
            }
        }

        displayProductDetails();

    } catch (error) {

        console.error(
            "Backend product details failed:",
            error
        );

        displayProductDetails();

    }

}


/* =========================================
   GET PRODUCT ID FROM URL
========================================= */

const urlParams =
    new URLSearchParams(window.location.search);

const productId =
    Number(urlParams.get("id"));


if (productId) {

    loadProductFromBackend(productId);

} else {

    console.log(
        "No product ID found in URL."
    );

    displayProductDetails();
}