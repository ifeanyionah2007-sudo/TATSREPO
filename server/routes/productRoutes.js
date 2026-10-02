const express = require("express");

const router = express.Router();


/* =========================================
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
        category: "men",
        categoryName: "Men's Shoes",
        price: 38000,
        rating: 4,
        reviews: 8,
        sizes: "40–45",
        badge: "",
        description: "Comfortable everyday sneakers designed for casual Nigerian lifestyles.",
        material: "Premium Fabric",
        stock: 15,
        colors: ["white", "black"],
        care: "Clean gently with a soft cloth."
    },

    {
        id: 3,
        name: "Elegant Leather Flats",
        category: "women",
        categoryName: "Women's Shoes",
        price: 32000,
        rating: 5,
        reviews: 10,
        sizes: "37–41",
        badge: "POPULAR",
        description: "Elegant leather flats designed for comfort and everyday style.",
        material: "Premium Leather",
        stock: 10,
        colors: ["black", "brown"],
        care: "Keep away from excessive moisture."
    },

    {
        id: 4,
        name: "Premium Comfort Sandals",
        category: "women",
        categoryName: "Women's Shoes",
        price: 28000,
        rating: 5,
        reviews: 9,
        sizes: "37–41",
        badge: "",
        description: "Comfortable premium sandals designed for everyday Nigerian weather.",
        material: "Premium Leather",
        stock: 14,
        colors: ["brown", "black"],
        care: "Wipe with a soft cloth and allow to dry naturally."
    },

    {
        id: 5,
        name: "Executive Leather Shoes",
        category: "men",
        categoryName: "Men's Shoes",
        price: 55000,
        rating: 5,
        reviews: 15,
        sizes: "40–45",
        badge: "BEST SELLER",
        description: "A polished executive shoe designed for formal occasions and professional environments.",
        material: "Premium Leather",
        stock: 8,
        colors: ["black", "brown"],
        care: "Polish regularly with suitable leather polish."
    },

    {
        id: 6,
        name: "Urban Street Sneakers",
        category: "men",
        categoryName: "Men's Shoes",
        price: 42000,
        rating: 4,
        reviews: 7,
        sizes: "40–45",
        badge: "",
        description: "Modern street-style sneakers combining comfort and contemporary design.",
        material: "Premium Fabric",
        stock: 11,
        colors: ["black", "white", "grey"],
        care: "Clean gently with a soft brush."
    },

    {
        id: 7,
        name: "Classic Women's Loafers",
        category: "women",
        categoryName: "Women's Shoes",
        price: 35000,
        rating: 5,
        reviews: 11,
        sizes: "37–41",
        badge: "NEW",
        description: "Classic women's loafers designed for elegance, comfort and everyday wear.",
        material: "Premium Leather",
        stock: 9,
        colors: ["black", "brown", "tan"],
        care: "Clean with a soft cloth and store in a cool, dry place."
    },

    {
        id: 8,
        name: "Comfort Leather Sandals",
        category: "women",
        categoryName: "Women's Shoes",
        price: 30000,
        rating: 4,
        reviews: 6,
        sizes: "37–41",
        badge: "",
        description: "Lightweight leather sandals designed for comfortable everyday movement.",
        material: "Premium Leather",
        stock: 13,
        colors: ["brown", "black"],
        care: "Keep clean and dry when not in use."
    },

    {
        id: 9,
        name: "Premium Casual Loafers",
        category: "men",
        categoryName: "Men's Shoes",
        price: 47000,
        rating: 5,
        reviews: 13,
        sizes: "40–45",
        badge: "POPULAR",
        description: "Premium casual loafers offering a refined look without sacrificing comfort.",
        material: "Premium Leather",
        stock: 10,
        colors: ["brown", "black"],
        care: "Use a soft cloth and suitable leather conditioner."
    },

    {
        id: 10,
        name: "Everyday Casual Shoes",
        category: "men",
        categoryName: "Men's Shoes",
        price: 36000,
        rating: 4,
        reviews: 5,
        sizes: "40–45",
        badge: "",
        description: "Versatile casual shoes designed for everyday Nigerian lifestyles.",
        material: "Premium Leather",
        stock: 16,
        colors: ["black", "brown"],
        care: "Clean gently after use."
    },

    {
        id: 11,
        name: "Premium Men's Sneakers",
        category: "men",
        categoryName: "Men's Shoes",
        price: 48000,
        rating: 5,
        reviews: 14,
        sizes: "40–45",
        badge: "BEST SELLER",
        description: "Premium sneakers designed for customers who want comfort and modern style.",
        material: "Premium Fabric",
        stock: 7,
        colors: ["black", "white"],
        care: "Clean with a soft brush and avoid excessive water."
    },

    {
        id: 12,
        name: "Elegant Women's Sandals",
        category: "women",
        categoryName: "Women's Shoes",
        price: 33000,
        rating: 5,
        reviews: 8,
        sizes: "37–41",
        badge: "",
        description: "Elegant sandals designed to provide comfort while maintaining a stylish appearance.",
        material: "Premium Leather",
        stock: 12,
        colors: ["black", "brown", "tan"],
        care: "Clean with a soft cloth and keep away from excessive moisture."
    }
];
/* =========================================
   GET ALL PRODUCTS
========================================= */

router.get("/", function (req, res) {

    res.json({
        success: true,
        message: "Products retrieved successfully.",
        products: products
    });

});


/* =========================================
   GET ONE PRODUCT
========================================= */

router.get("/:id", function (req, res) {

    const productId = Number(req.params.id);

    const product = products.find(function (item) {
        return item.id === productId;
    });

    if (!product) {

        return res.status(404).json({
            success: false,
            message: "Product not found."
        });

    }

    res.json({
        success: true,
        message: "Product retrieved successfully.",
        product: product
    });

});


module.exports = router;