const express = require("express");

const router = express.Router();

/*
=========================================
TEMPORARY CUSTOMER STORAGE
=========================================

This is only for Phase 17T testing.

Later, this will be replaced with
a real database.
*/

const customers = [];


/*
=========================================
REGISTER CUSTOMER
=========================================
*/

router.post("/register", function (req, res) {

    const {
        firstName,
        lastName,
        email,
        phone,
        password
    } = req.body;


    /* VALIDATION */

    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !password
    ) {

        return res.status(400).json({

            success: false,

            message: "All fields are required."

        });

    }


    /* CHECK EXISTING EMAIL */

    const existingCustomer = customers.find(function (customer) {

        return customer.email.toLowerCase() ===
            email.toLowerCase();

    });


    if (existingCustomer) {

        return res.status(409).json({

            success: false,

            message: "An account with this email already exists."

        });

    }


    /* CREATE CUSTOMER */

    const customer = {

        id: "customer-" + Date.now(),

        firstName: firstName,

        lastName: lastName,

        email: email.toLowerCase(),

        phone: phone,

        password: password,

        createdAt: new Date().toISOString()

    };


    customers.push(customer);


    res.status(201).json({

        success: true,

        message: "Customer registered successfully.",

        customer: {

            id: customer.id,

            firstName: customer.firstName,

            lastName: customer.lastName,

            email: customer.email,

            phone: customer.phone

        }

    });

});


/*
=========================================
CUSTOMER LOGIN
=========================================
*/

router.post("/login", function (req, res) {

    const {
        email,
        password
    } = req.body;


    /* VALIDATION */

    if (!email || !password) {

        return res.status(400).json({

            success: false,

            message: "Email and password are required."

        });

    }


    /* FIND CUSTOMER */

    const customer = customers.find(function (item) {

        return (
            item.email.toLowerCase() ===
            email.toLowerCase() &&
            item.password === password
        );

    });


    if (!customer) {

        return res.status(401).json({

            success: false,

            message: "Invalid email or password."

        });

    }


    /* LOGIN SUCCESS */

    res.json({

        success: true,

        message: "Login successful.",

        customer: {

            id: customer.id,

            firstName: customer.firstName,

            lastName: customer.lastName,

            email: customer.email,

            phone: customer.phone

        }

    });

});


/*
=========================================
GET CUSTOMER
=========================================
*/

router.get("/:id", function (req, res) {

    const customer = customers.find(function (item) {

        return item.id === req.params.id;

    });


    if (!customer) {

        return res.status(404).json({

            success: false,

            message: "Customer not found."

        });

    }


    res.json({

        success: true,

        customer: {

            id: customer.id,

            firstName: customer.firstName,

            lastName: customer.lastName,

            email: customer.email,

            phone: customer.phone

        }

    });

});


module.exports = router;