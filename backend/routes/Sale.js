const express = require('express');
const { Op } = require('sequelize');
const { User,Card, Order } = require('../models');
const router = express.Router();
const { Sequelize, DataTypes } = require('sequelize');

// Route pour compter le nombre de cartes SIM vendues par jour
router.get('/day', async (req, res) => {
    try {
        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999);

        console.log('startDate:', startDate);
        console.log('endDate:', endDate);

        const count = await Card.count({
            where: {
                status: 'activated',
                activationDate: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });

        console.log('count:', count);

        res.json({ count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
});

// Route pour compter le nombre de cartes SIM vendues par mois
router.get('/month', async (req, res) => {
    try {
        const startDate = new Date();
        startDate.setDate(1);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(0);
        endDate.setHours(23, 59, 59, 999);

        const count = await Card.count({
            where: {
                status: 'activated',
                activationDate: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });

        res.json({ count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
});

// Route pour compter le nombre de cartes SIM vendues par année
router.get('/year', async (req, res) => {
    try {
        const startDate = new Date();
        startDate.setMonth(0);
        startDate.setDate(1);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date();
        endDate.setMonth(11);
        endDate.setDate(31);
        endDate.setHours(23, 59, 59, 999);

        const count = await Card.count({
            where: {
                status: 'activated',
                activationDate: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });

        res.json({ count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
});

router.get('/week', async (req, res) => {
    try {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - startDate.getDay());
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date();
        endDate.setDate(startDate.getDate() + 6);
        endDate.setHours(23, 59, 59, 999);

        const count = await Card.count({
            where: {
                status: 'activated',
                activationDate: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });

        res.json({ count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
});

router.get('/stats', async (req, res) => {
    try {
        const stats = await Order.findAll({
            attributes: [
                [Order.sequelize.literal('DATE(`Order`.`date`)'), 'date'],
                [Order.sequelize.fn('COUNT', sequelize.col('Cards.id')), 'count'],
            ],
            include: [{ model: Card, as: 'cards', where: { status: 'activated' } }],
            group: [sequelize.literal('DATE(`Order`.`date`)')],
        });


        const formattedStats = stats.map((stat) => ({
            date: stat.dataValues.date.toISOString().split('T')[0],
            count: parseInt(stat.dataValues.count),
        }));

        res.json(formattedStats);
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

router.get('/jour', async (req, res) => {
    try {
        const startDate = new Date(req.query.startDate); // Get startDate from query parameters
        const endDate = new Date(req.query.endDate); // Get endDate from query parameters
        endDate.setHours(23, 59, 59, 999);

        console.log('startDate:', startDate);
        console.log('endDate:', endDate);

        const salesData = await Card.findAll({
            where: {
                status: 'activated',
                activationDate: {
                    [Op.between]: [startDate, endDate],
                },
            },
            attributes: [
                [Card.sequelize.literal('DATE(activationDate)'), 'date'], // Extract only the date part
                [Card.sequelize.fn('COUNT', Card.sequelize.col('id')), 'totalSales'], // Count the sales for each day
            ],
            group: [Card.sequelize.literal('DATE(activationDate)')],
            order: [[Card.sequelize.literal('DATE(activationDate)'), 'ASC']],
        });

        console.log('salesData:', salesData);

        res.json(salesData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
});

router.get('/region/mostRepeated', async (req, res) => {
    try {
        // Utiliser Sequelize pour compter le nombre d'occurrences de chaque région
        const result = await User.findAll({
            attributes: ['region', [User.sequelize.fn('COUNT', Sequelize.col('region')), 'count']],
            group: ['region'],
            order: [[User.sequelize.literal('count'), 'DESC']],
            limit: 3, // Récupérer les trois régions les plus répétées
        });

        // Vérifier si des régions ont été trouvées
        if (result && result.length > 0) {
            const top3Regions = result.map((item) => ({
                region: item.region,
                count: item.get('count'),
            }));

            return res.status(200).json(top3Regions);
        } else {
            // Aucune région trouvée (base de données vide)
            return res.status(404).json({ message: 'Aucune région trouvée dans la base de données.' });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des régions les plus répétées:', error);
        return res
            .status(500)
            .json({ message: 'Erreur serveur lors de la récupération des régions les plus répétées.' });
    }
});



module.exports = router;
