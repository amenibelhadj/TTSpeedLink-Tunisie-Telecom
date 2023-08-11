const express = require('express')
const router = express.Router()
const {Payment} = require("../models")


router.get("/", async (req, res) => {
    try {
        const listOfPayments = await Payment.findAll();
        res.json(listOfPayments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching payments" });
    }
});

router.get("/:id", async (req, res) => {
    const paymentId = req.params.id;

    try {
        const payment = await Payment.findByPk(paymentId);

        if (!payment) {
            return res.status(404).json({ error: "Payment not found" });
        }

        res.json(payment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while searching for the payment" });
    }
});

router.post("/", async (req, res) => {
    const payment = req.body;

    try {
        await Payment.create(payment);
        res.json(payment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while creating the payment" });
    }
});

router.delete("/:id", async (req, res) => {
    const paymentId = req.params.id;

    try {
        const payment = await Payment.findByPk(paymentId);

        if (!payment) {
            return res.status(404).json({ error: "Payment not found" });
        }

        await payment.destroy();

        res.json({ message: "payment deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting the payment" });
    }
});

router.put("/:id", async (req, res) => {
    const paymentId = req.params.id;
    const updatedPayment = req.body;

    try {
        const payment = await Payment.findByPk(paymentId);

        if (!payment) {
            return res.status(404).json({ error: "payment not found" });
        }

        await payment.update(updatedPayment);

        res.json(payment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating the payment" });
    }
});


module.exports = router