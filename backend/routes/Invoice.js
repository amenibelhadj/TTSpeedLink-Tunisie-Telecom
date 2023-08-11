const express = require('express')
const router = express.Router()
const pdf = require('html-pdf');
const {Invoice} = require("../models")
const PDFDocument = require('pdfkit');
const moment = require('moment');
const { Op } = require('sequelize');
const { sequelize, DataTypes } = require('sequelize');


//http://localhost:3001/invoice
router.get("/", async (req, res) => {
    try {
        const listOfInvoices = await Invoice.findAll();
        res.json(listOfInvoices);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching Invoices" });
    }
});

//http://localhost:3001/invoice/id
router.get("/:id", async (req, res) => {
    const invoiceId = req.params.id;

    try {
        const invoice = await Invoice.findByPk(invoiceId);

        if (!invoice) {
            return res.status(404).json({ error: "invoice not found" });
        }

        res.json(invoice);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while searching for the invoice" });
    }
});

//http://localhost:3001/invoice
router.post("/", async (req, res) => {
    const invoice = req.body;

    try {
        await Invoice.create(invoice);
        res.json(invoice);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while creating the Invoice" });
    }
});

//http://localhost:3001/invoice/id
router.delete("/:id", async (req, res) => {
    const invoiceId = req.params.id;

    try {
        const invoice = await Invoice.findByPk(invoiceId);

        if (!invoice) {
            return res.status(404).json({ error: "invoice not found" });
        }

        await invoice.destroy();

        res.json({ message: "invoice deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting the invoice" });
    }
});

//http://localhost:3001/invoice/id
router.put("/:id", async (req, res) => {
    const invoiceId = req.params.id;
    const updatedinvoice = req.body;

    try {
        const invoice = await Invoice.findByPk(invoiceId);

        if (!invoice) {
            return res.status(404).json({ error: "invoice not found" });
        }

        await invoice.update(updatedinvoice);

        res.json(invoice);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating the invoice" });
    }
});

const logoPath ='C:\\Users\\Ameni\\Desktop\\Stage TT\\dev\\ttspeedlink-fullstackJS\\frontend\\src\\LOGO_TT_.jpg'
router.post('/print-pdf', (req, res) => {
    const user = req.body.user;

    // Create a new PDF document
    const doc = new PDFDocument();

    // Set response headers for PDF file download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="invoice.pdf"');

    // Pipe the PDF document to the response
    doc.pipe(res);


    doc.image(logoPath, {
        fit: [100, 100],
        align: 'right',
        valign: 'top',
    });

    // Function to add a line separator
    function addSeparator() {
        doc.moveDown(1);
        doc.strokeColor('#000').lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
        doc.moveDown(1);
    }

    // Iterate through user orders
    user.orders.forEach((order, index) => {
        doc.fontSize(22).font('Helvetica-Bold').text('Invoice', { align: 'right', underline: true, color: '#003366' ,valign: 'top'});
        doc.fontSize(13).font('Helvetica-Bold').text(`Invoice N°: ${order.id}`, { align: 'right', color: '#FF0000',valign: 'top' });
        doc.moveDown(1);

        // Add user information
        doc.fontSize(14).font('Helvetica-Bold').text('Client Information:', { underline: true });
        doc.moveDown();
        doc.fontSize(12).font('Helvetica').text(`   Name: ${user.name}`);
        doc.fontSize(12).font('Helvetica').text(`   Email: ${user.email}`);
        doc.fontSize(12).font('Helvetica').text(`   Address: ${user.address}`);
        doc.fontSize(12).font('Helvetica').text(`   CIN: ${user.cin}`);
        doc.moveDown();

        addSeparator();

        // Iterate through order cards
        doc.fontSize(14).font('Helvetica-Bold').text('Invoice Line-Item Details:', { underline: true });
        doc.moveDown();
        order.cards.forEach((card, cardIndex) => {
            const formattedDate = moment(order.date).format('DD MMMM YYYY HH:mm:ss');
            doc.fontSize(12).font('Helvetica').text(`   Order Date: ${formattedDate}`);
            doc.fontSize(12).font('Helvetica-Bold').text(`   Card Number: ${card.number}`);
            doc.fontSize(12).font('Helvetica').text(`   PIN Code Number: ${card.pinCode}`);
            const formattedDateTime = moment(card.activationDate).format('DD/MM/YYYY HH:mm:ss');
            doc.fontSize(12).font('Helvetica').text(`   Activation Date: ${formattedDateTime}`);
            doc.moveDown();
        });
        addSeparator();
        // Add invoice amount
        if (order.invoice) {
            doc.fontSize(12).font('Helvetica-Bold').text(`Total Amount Due: ${order.invoice.amount} dt`, { align: 'right' });
        } else {
            doc.fontSize(12).font('Helvetica-Bold').text(`Total Amount Due: 0.00 dt`, { align: 'right' });
        }
        doc.moveDown();
        doc.fontSize(10).font('Helvetica-Oblique').text('Thank you for choosing Tunisie Télécom!', { align: 'right' });

        // Add spacing between orders
        if (index !== user.orders.length - 1) {
            doc.addPage();
        }
    });

    // End the document creation
    doc.end();
});

router.get('/invoices/sum', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        const whereClause = {};

        // Si les dates de début et de fin sont fournies, filtrer les résultats en conséquence
        if (startDate && endDate) {
            whereClause.date = {
                [Op.between]: [new Date(startDate), new Date(endDate)],
            };
        }

        // Requête pour compter la somme des amounts par jour
        const sumByDay = await Invoice.findAll({
            attributes: [
                [Invoice.sequelize.fn('date', Invoice.sequelize.col('date')), 'day'],
                [Invoice.sequelize.fn('sum', Invoice.sequelize.col('amount')), 'total'],
            ],
            where: whereClause,
            group: [Invoice.sequelize.fn('date', Invoice.sequelize.col('date'))],
        });

        // Requête pour compter la somme des amounts par semaine
        const sumByWeek = await Invoice.findAll({
            attributes: [
                [Invoice.sequelize.fn('week', Invoice.sequelize.col('date')), 'week'],
                [Invoice.sequelize.fn('sum', Invoice.sequelize.col('amount')), 'total'],
            ],
            where: whereClause,
            group: [Invoice.sequelize.fn('week', Invoice.sequelize.col('date'))],
        });

        // Requête pour compter la somme des amounts par mois
        const sumByMonth = await Invoice.findAll({
            attributes: [
                [Invoice.sequelize.fn('month', Invoice.sequelize.col('date')), 'month'],
                [Invoice.sequelize.fn('sum', Invoice.sequelize.col('amount')), 'total'],
            ],
            where: whereClause,
            group: [Invoice.sequelize.fn('month', Invoice.sequelize.col('date'))],
        });

        // Requête pour compter la somme des amounts par année
        const sumByYear = await Invoice.findAll({
            attributes: [
                [Invoice.sequelize.fn('year', Invoice.sequelize.col('date')), 'year'],
                [Invoice.sequelize.fn('sum', Invoice.sequelize.col('amount')), 'total'],
            ],
            where: whereClause,
            group: [Invoice.sequelize.fn('year', Invoice.sequelize.col('date'))],
        });

        // Requête pour calculer le total de tous les temps
        const totalAllTime = await Invoice.sum('amount', {
            where: whereClause,
        });

        res.json({
            sumByDay,
            sumByWeek,
            sumByMonth,
            sumByYear,
            totalAllTime,
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});





module.exports = router