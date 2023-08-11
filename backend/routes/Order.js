const express = require('express')
const router = express.Router()
const {Order} = require("../models")

//http://localhost:3001/order
router.get("/", async (req, res) => {
    try {
        const listOfOrders = await Order.findAll();
        res.json(listOfOrders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching Orders" });
    }
});

//http://localhost:3001/order/id
router.get("/:id", async (req, res) => {
    const orderId = req.params.id;

    try {
        const order = await Order.findByPk(orderId);

        if (!order) {
            return res.status(404).json({ error: "order not found" });
        }

        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while searching for the order" });
    }
});

//http://localhost:3001/order
router.post("/", async (req, res) => {
    const order = req.body;

    try {
        await Order.create(order);
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while creating the order" });
    }
});

//http://localhost:3001/order/id
router.delete("/:id", async (req, res) => {
    const orderId = req.params.id;

    try {
        const order = await Order.findByPk(orderId);

        if (!order) {
            return res.status(404).json({ error: "order not found" });
        }

        await order.destroy();

        res.json({ message: "order deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting the order" });
    }
});

//http://localhost:3001/order/id
router.put("/:id", async (req, res) => {
    const orderId = req.params.id;
    const updatedorder = req.body;

    try {
        const order = await Order.findByPk(orderId);

        if (!order) {
            return res.status(404).json({ error: "order not found" });
        }

        await order.update(updatedorder);

        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating the order" });
    }
});

//http://localhost:3001/order/user
router.post('/user', async (req, res) => {
    try {
        // Extract the date and userId from the request body
        const { date, userId } = req.body;

        // Create a new order in the database with the provided data
        const order = await Order.create({ date, userId });

        // Send a success response with the order ID
        res.status(200).json({ message: 'Order Done!', id: order.id });
    } catch (error) {
        console.error(error);
        // If an error occurs, send an error response with a status code of 500
        res.status(500).json({ error: 'An error occurred while creating the order' });
    }
});

router.post('/dates', (req, res) => {
    const { order } = req.body;
    const dates = order.map(item => item.date);

    res.json(dates);
});


router.get('/orders/stat', (req, res) => {
    res.json(orders);
});


module.exports = router