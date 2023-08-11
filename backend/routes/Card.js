const express = require('express')
const router = express.Router()
const {Card} = require("../models")
const {Stock} = require("../models")

//http://localhost:3001/card
router.get("/", async (req, res) => {
    try {
        // Retrieve a list of cards from the database
        const listOfCards = await Card.findAll();

        // Send the list of cards as the response
        res.json(listOfCards);
    } catch (error) {
        console.error(error);
        // If an error occurs, send an error response with a status code of 500
        res.status(500).json({ error: "An error occurred while fetching cards" });
    }
});

//http://localhost:3001/card/id
router.get("/:id", async (req, res) => {
    const cardId = req.params.id;

    try {
        // Retrieve the card with the specified ID from the database
        const card = await Card.findByPk(cardId);

        // Check if the card exists
        if (!card) {
            // If the card is not found, send a 404 error response
            return res.status(404).json({ error: "Card not found" });
        }

        // Send the card as the response
        res.json(card);
    } catch (error) {
        console.error(error);
        // If an error occurs, send an error response with a status code of 500
        res.status(500).json({ error: "An error occurred while searching for the card" });
    }
});


//http://localhost:3001/card
router.post("/", async (req, res) => {
    const card = req.body;

    try {
        // Create a new card in the database using the provided data
        await Card.create(card);

        // Send the created card as the response
        res.json(card);
    } catch (error) {
        console.error(error);
        // If an error occurs, send an error response with a status code of 500
        res.status(500).json({ error: "An error occurred while creating the card" });
    }
});

//delete + update stock
//http://localhost:3001/card/id
router.delete("/:id", async (req, res) => {
    const cardId = req.params.id;

    try {
        // Retrieve the card with the specified ID from the database
        const card = await Card.findByPk(cardId);

        // Check if the card exists
        if (!card) {
            // If the card is not found, send a 404 error response
            return res.status(404).json({ error: "Card not found" });
        }

        // Retrieve the stockId of the card
        const stockId = card.stockId;

        // Delete the card from the database
        await card.destroy();

        // Count the remaining cards with the same stockId
        const cardCount = await Card.count({ where: { stockId } });

        // Retrieve the corresponding stock from the database
        const stock = await Stock.findByPk(stockId);

        // Update the quantity of the stock based on the cardCount
        stock.quantity = cardCount;

        // Save the updated stock
        await stock.save();

        // Send a success response
        res.json({ message: "Card deleted successfully" });
    } catch (error) {
        console.error(error);
        // If an error occurs, send an error response with a status code of 500
        res.status(500).json({ error: "An error occurred while deleting the card" });
    }
});


//http://localhost:3001/card/id
router.put("/:id", async (req, res) => {
    const cardId = req.params.id;
    const updatedCard = req.body;

    try {
        // Retrieve the card with the specified ID from the database
        const card = await Card.findByPk(cardId);

        // Check if the card exists
        if (!card) {
            // If the card is not found, send a 404 error response
            return res.status(404).json({ error: "Card not found" });
        }

        // Update the card with the provided data
        await card.update(updatedCard);

        // Send the updated card as the response
        res.json(card);
    } catch (error) {
        console.error(error);
        // If an error occurs, send an error response with a status code of 500
        res.status(500).json({ error: "An error occurred while updating the card" });
    }
});


//http://localhost:3001/card/stock/stockId
router.get('/stock/:stockId', async (req, res) => {
    const stockId = req.params.stockId;

    try {
        // Retrieve all cards associated with the specified stockId from the database
        const cards = await Card.findAll({ where: { stockId } });

        // Send the cards as the response
        res.json(cards);
    } catch (err) {
        console.error('An error occurred while fetching cards :', err);
        // If an error occurs, send an error response with a status code of 500
        res.status(500).json({ error: 'An error occurred while fetching cards' });
    }
});

//http://localhost:3001/card/count
router.get('/count', async (req, res) => {
    try {
        // Retrieve the count of all cards from the database
        const count = await Card.count();

        // Send the count as the response
        res.json({ count });
    } catch (error) {
        console.error(error);
        // If an error occurs, send an error response with a status code of 500
        res.status(500).json({ error: 'An error occurred while getting cards number' });
    }
});

//http://localhost:3001/card/order/cardId
router.put("/order/:cardId", async (req, res) => {
    const { cardId } = req.params;
    const { orderId } = req.body;

    try {
        // Retrieve the card with the specified cardId from the database
        const card = await Card.findByPk(cardId);

        if (!card) {
            res.status(404).json({ error: "Card not found" });
            return;
        }

        // Update the card properties
        card.orderId = orderId;
        card.activationDate = new Date();
        card.status = "activated";

        // Save the updated card to the database
        await Promise.all([card.save()]);

        res.json({ message: "The card.orderId updated successfully" });
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ error: "An error occurred while updating the card.orderId" });
    }
});




module.exports = router