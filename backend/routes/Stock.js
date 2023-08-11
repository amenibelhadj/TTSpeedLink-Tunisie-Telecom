const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const {Stock,Card} = require("../models")
const crypto = require('crypto');
const cron = require('node-cron');
router.use(bodyParser.json());

//Updates the quantity of a stock based on the count of cards
const calculateQuantity = async () => {
    try {
        // Count the cards with status 'none'
        const cardCount = await Card.count({ where: { status: 'none' } });

        // Update the quantity of all stocks to the cardCount
        await Stock.update({ quantity: cardCount }, { where: {} });

        // Log the success message and the current quantity
        console.log(`Quantity Updated successfully : ${cardCount}`);
    } catch (error) {
        console.error('Error while updating quantity :', error);
    }
};

// Schedule the execution of calculateQuantity function every 10 minutes
cron.schedule('*/10 * * * *', calculateQuantity);


//http://localhost:3001/stock
router.get("/", async (req, res) => {
    try {
        const listOfStocks = await Stock.findAll();
        res.json(listOfStocks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching stocks" });
    }
});

//http://localhost:3001/stock/id
router.get("/:id", async (req, res) => {
    const stockId = req.params.id;

    try {
        const stock = await Stock.findByPk(stockId);

        if (!stock) {
            return res.status(404).json({ error: "Stock not found" });
        }

        res.json(stock);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while searching for the stock" });
    }
});

//http://localhost:3001/stock
router.post("/", async (req, res) => {
    const stock = req.body;

    try {
        await Stock.create(stock);
        res.json(stock);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while creating the stock" });
    }
});

//http://localhost:3001/stock/id
router.delete("/:id", async (req, res) => {
    const stockId = req.params.id;

    try {
        const stock = await Stock.findByPk(stockId);

        if (!stock) {
            return res.status(404).json({ error: "Stock not found" });
        }

        await stock.destroy();

        res.json({ message: "Stock deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting the stock" });
    }
});

//http://localhost:3001/stock/id
router.put("/:id", async (req, res) => {
    const stockId = req.params.id;
    const updatedStock = req.body;

    try {
        const stock = await Stock.findByPk(stockId);

        if (!stock) {
            return res.status(404).json({ error: "Stock not found" });
        }

        await stock.update(updatedStock);

        res.json(stock);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating the stock" });
    }
});

//http://localhost:3001/stock/stockId/cards
router.post('/:stockId/cards', async (req, res) => {
    try {
        // Extract the stockId and number from the request parameters and body
        const { stockId } = req.params;
        const { number } = req.body;

        // Find the stock with the specified stockId
        const stock = await Stock.findByPk(stockId);
        if (!stock) {
            return res.status(404).json({ message: 'Stock not found' });
        }

        // Calculate the quantity of cards to be created
        const quantity = number.length;

        // Create multiple cards using bulkCreate and map the cardNumber to card object
        const cards = await Card.bulkCreate(
            number.map((cardNumber) => ({
                number: cardNumber,
                pinCode: generatePinCode(),
                status: 'none',
                stockId: stock.id,
            }))
        );

        // Update the stock quantity
        stock.quantity += quantity;
        await stock.save();

        // Send a success response with the created cards
        res.status(201).json({ cards });
    } catch (error) {
        console.error(error);
        // If an error occurs, send an error response with a status code of 500
        res.status(500).json({ message: 'Internal server error' });
    }
});

//Generates a random four-digit pin code
function generatePinCode() {
    //generates a random number between 1000 and 9999
    const pin = Math.floor(1000 + Math.random() * 9000);
    return pin.toString();
}

//http://localhost:3001/stock/stockId/cards/check
//Checks for the existence of specific card numbers associated with a given stock
router.post('/:stockId/cards/check', (req, res) => {
    const stockId = req.params.stockId;
    const { number } = req.body;

    const Card = require('../models/card');

    Card.findAll({
        where: {
            stockId: stockId,
            number: number,
        },
        attributes: ['number'],
    })
        .then((existingCards) => {
            const existingNumbers = existingCards.map((card) => card.number);
            res.json({ existingNumbers });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while cards checking' });
        });
});

//http://localhost:3001/stock/shop/shopId
router.get('/shop/:shopId', async (req, res) => {
    try {
        // Extract the shopId from the request parameters
        const { shopId } = req.params;

        // Retrieve all stocks associated with the specified shopId from the database
        const stocks = await Stock.findAll({ where: { ShopId: shopId } });

        // Send the stocks as the response
        res.json(stocks);
    } catch (error) {
        console.error(error);
        // If an error occurs, send an error response with a status code of 500
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router