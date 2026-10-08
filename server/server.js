const express = require("express");

const customerRoutes = require("./routes/customerRoutes");

const productRoutes = require("./routes/productRoutes");

const app = express();


/* =========================================
   MIDDLEWARE
========================================= */

app.use(express.json());


/* =========================================
   MAIN API TEST ROUTE
========================================= */

app.get("/api", function (req, res) {

    res.json({
        success: true,
        message: "Tats Design API is running."
    });

});


/* =========================================
   PRODUCT ROUTES
========================================= */

app.use("/api/products", productRoutes);
app.use("/api/customers", customerRoutes);

/* =========================================
   START SERVER
========================================= */
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", function () {

    console.log(
        `Tats Design server is running on http://localhost:${PORT}`
    );

});