const express = require('express')
const router = express.Router()
const {Shop} = require("../models")


router.get("/", async (req, res) => {
    try {
        const listOfShops = await Shop.findAll();
        res.json(listOfShops);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching shops" });
    }
});

router.get("/:id", async (req, res) => {
    const shopId = req.params.id;

    try {
        const shop = await Shop.findByPk(shopId);

        if (!shop) {
            return res.status(404).json({ error: "Shop not found" });
        }

        res.json(shop);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while searching for the shop" });
    }
});

router.post("/", async (req, res) => {
    const shop = req.body;

    try {
        await Shop.create(shop);
        res.json(shop);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while creating the shop" });
    }
});

router.delete("/:id", async (req, res) => {
    const shopId = req.params.id;

    try {
        const shop = await Shop.findByPk(shopId);

        if (!shop) {
            return res.status(404).json({ error: "Shop not found" });
        }

        await shop.destroy();

        res.json({ message: "Shop deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting the shop" });
    }
});

router.put("/:id", async (req, res) => {
    const shopId = req.params.id;
    const updatedShop = req.body;

    try {
        const shop = await Shop.findByPk(shopId);

        if (!shop) {
            return res.status(404).json({ error: "Shop not found" });
        }

        await shop.update(updatedShop);

        res.json(shop);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating the shop" });
    }
});


module.exports = router