const express = require('express');

// creates an instance of the Express application
const app = express();

//imports the CORS middleware for handling cross-origin requests.
const cors = require('cors');

//sets up middleware to parse incoming JSON requests.
app.use(express.json());

//enables CORS for all routes.
app.use(cors());

//imports the Sequelize database connection and models.
const db = require('./models');

const userRouter = require("./routes/User");
app.use("/user",userRouter);
const stockRouter = require("./routes/Stock");
app.use("/stock",stockRouter);
const shopRouter = require("./routes/Shop");
app.use("/shop",shopRouter);
const paymentRouter = require("./routes/Payment");
app.use("/payment",paymentRouter);
const orderRouter = require("./routes/Order");
app.use("/order",orderRouter);
const invoiceRouter = require("./routes/Invoice");
app.use("/invoice",invoiceRouter);
const cardRouter = require("./routes/Card");
app.use("/card",cardRouter);
const saleRouter = require("./routes/Sale");
app.use("/sale",saleRouter);

// synchronizes the database models with the actual database schema.
db.sequelize.sync().then(()=> {
    //starts the server to listen on port 3001.
    app.listen(3001, ()=>{
        console.log("Server running on port 3001");
    });
});


