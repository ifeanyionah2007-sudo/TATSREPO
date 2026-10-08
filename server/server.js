const express = require("express");
const path = require("path");

const customerRoutes = require("./routes/customerRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(express.json());

// Serve your HTML, CSS, JS and assets
app.use(express.static(path.join(__dirname, "../HTML")));
app.use("/css", express.static(path.join(__dirname, "../css")));
app.use("/js", express.static(path.join(__dirname, "../js")));
app.use("/assets", express.static(path.join(__dirname, "../assets")));

// Homepage
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../HTML/index.html"));
});

// API
app.get("/api", function (req, res) {
    res.json({
        success: true,
        message: "Tats Design API is running."
    });
});

// API routes
app.use("/api/products", productRoutes);
app.use("/api/customers", customerRoutes);

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", function () {
    console.log(`Tats Design server is running on port ${PORT}`);
});