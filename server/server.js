const express = require("express");

const cors = require("cors");

const productRoutes = require("./routes/productRoutes");

const app = express();

const PORT = 3000;


/* =========================================
   MIDDLEWARE
========================================= */

app.use(express.json());
app.use(cors());

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


/* =========================================
   START SERVER
========================================= */

app.listen(PORT, function () {

    console.log(
        `Tats Design server is running on http://localhost:${PORT}`
    );

});