const express = require('express');
const router = express.Router();
const {User, Order, Card, Invoice} = require("../models");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// create a nodemailer transporter for sending emails using the Gmail
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'noreply.pidev@gmail.com',
        pass: 'naabnjyuqiuehxit'
    }
});

//http://localhost:3001/user/email
router.post('/email', async (req, res) => {
    try {
        const { email } = req.body;

        const token = jwt.sign({ email }, 'votre_clé_secrète');

        const verificationLink = `http://localhost:3001/verifier-compte?token=${token}`;

        const mailOptions = {
            from: 'noreply.pidev@gmail.com',
            to: email,
            subject: 'Account Verification Required',
            html:
                '<body style="margin: 0; padding: 0; font-size: 14px;">\n' +
                '    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #f3f3f3; min-width: 350px; font-size: 1px; line-height: normal;">\n' +
                '        <tr>\n' +
                '            <td align="center" valign="top">\n' +
                '                <table cellpadding="0" cellspacing="0" border="0" width="750" class="table750" style="width: 100%; max-width: 750px; min-width: 350px; background: #f3f3f3;">\n' +
                '                    <tr>\n' +
                '                        <td class="mob_pad" width="25" style="width: 25px; max-width: 25px; min-width: 25px;">&nbsp;</td>\n' +
                '                        <td align="center" valign="top" style="background: #ffffff;">\n' +
                '                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100% !important; min-width: 100%; max-width: 100%; background: #f3f3f3;">\n' +
                '                                <tr>\n' +
                '                                    <td align="right" valign="top">\n' +
                '                                        <div class="top_pad" style="height: 25px; line-height: 25px; font-size: 23px;">&nbsp;</div>\n' +
                '                                    </td>\n' +
                '                                </tr>\n' +
                '                            </table>\n' +
                '                            <table cellpadding="0" cellspacing="0" border="0" width="88%" style="width: 88% !important; min-width: 88%; max-width: 88%;">\n' +
                '                                <tr>\n' +
                '                                    <td align="left" valign="top">\n' +
                '                                        <div style="height: 39px; line-height: 39px; font-size: 37px;">&nbsp;</div>\n' +
                '                                        <a href="http://localhost:3000/" target="_blank" style="display: flex; align-items: center; text-decoration: none;">\n' +
                '                                            <span style="font-family: \'Source Sans Pro\', Arial, Tahoma, Geneva, sans-serif; color: #001e8c; font-size: 32px; line-height: 40px; font-weight: 300; letter-spacing: -1.5px; font-style: italic; font-weight: bold; text-decoration: none;">TT Speed Link</span>\n' +
                '                                        </a>\n' +
                '                                        <div style="height: 73px; line-height: 73px; font-size: 71px;">&nbsp;</div>\n' +
                '                                    </td>\n' +
                '                                </tr>\n' +
                '                            </table>\n' +
                '                            <table cellpadding```javascript 0" cellspacing="0" border="0" width="88%" style="width: 88% !important; min-width: 88%; max-width: 88%;">\n' +
                    '                                <tr>\n' +
                '                                    <td align="left" valign="top">\n' +
                '                                        <div style="height: 33px; line-height: 33px; font-size: 31px;">&nbsp;</div>\n' +
                '                                        <font face="\'Source Sans Pro\', sans-serif" color="#585858" style="font-size: 16px; line-height: 24px;">\n' +
                '                                            <span style="font-family: \'Source Sans Pro\', Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 16px; line-height: 24px;">We hope this email finds you well. It has come to our attention that your account with Tunisie Télécom requires verification to ensure the security and integrity of your personal information.</span>\n' +
                '                                        </font>\n' +
                '                                        <div style="height: 20px; line-height: 20px; font-size: 18px;">&nbsp;</div>\n' +
                '                                        <font face="\'Source Sans Pro\', sans-serif" color="#585858" style="font-size: 16px; line-height: 24px;">\n' +
                '                                            <span style="font-family: \'Source Sans Pro\', Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 16px; line-height: 24px;">To proceed with the verification process, we kindly request that you follow the instructions provided below:</span>\n' +
                '                                        </font>\n' +
                '                                        <br>\n' +
                '                                        <font face="\'Source Sans Pro\', sans-serif" color="#585858" style="font-size: 16px; line-height: 24px;">\n' +
                '                                            <span style="font-family: \'Source Sans Pro\', Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 16px; line-height: 24px;">\n' +
                '                                                1- Visit our official website at <a href="http://localhost:3000/" style="text-decoration: none; font-weight: bold; color: #8100e3;">TT Speed Link Website</a>\n' +
                '                                            </span>\n' +
                '                                        </font>\n' +
                '                                        <br>\n' +
                '                                        <font face="\'Source Sans Pro\', sans-serif" color="#585858" style="font-size: 16px; line-height: 24px;">\n' +
                '                                            <span style="font-family: \'Source Sans Pro\', Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 16px; line-height: 24px;">\n' +
                '                                                2- Log in to your account using your registered email address and password.\n' +
                '                                            </span>\n' +
                '                                        </font>\n' +
                '                                        <br>\n' +
                '                                        <font face="\'Source Sans Pro\', sans-serif" color="#585858" style="font-size: 16px; line-height: 24px;">\n' +
                '                                            <span style="font-family: \'Source Sans Pro\', Arial, Tahoma, Geneva,```javascript sans-serif; color: #000000; font-size: 16px; line-height: 24px;">\n' +
                    '                                                3- Navigate to the account settings or profile section.\n' +
                '                                            </span>\n' +
                '                                        </font>\n' +
                '                                        <br>\n' +
                '                                        <font face="\'Source Sans Pro\', sans-serif" color="#585858" style="font-size: 16px; line-height: 24px;">\n' +
                '                                            <span style="font-family: \'Source Sans Pro\', Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 16px; line-height: 24px;">\n' +
                '                                                4- Locate the "Account Verification" option and select it.\n' +
                '                                            </span>\n' +
                '                                        </font>\n' +
                '                                        <br>\n' +
                '                                        <font face="\'Source Sans Pro\', sans-serif" color="#585858" style="font-size: 16px; line-height: 24px;">\n' +
                '                                            <span style="font-family: \'Source Sans Pro\', Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 16px; line-height: 24px;">\n' +
                '                                                Follow the prompts to complete the verification process.\n' +
                '                                            </span>\n' +
                '                                        </font>\n' +
                '                                        <div style="height: 33px; line-height: 33px; font-size: 31px;">&nbsp;</div>\n' +
                '                                        <table class="mob_btn" cellpadding="0" cellspacing="0" border="0" style="background: #FF1493; border-radius: 4px;">\n' +
                '                                            <tr>\n' +
                '                                                <td align="center" valign="top">\n' +
                '                                                    <a href="#" target="_blank" style="display: block; border: 1px solid #d63384; border-radius: 4px; padding: 8px 16px; font-family: \'Source Sans Pro\', Arial, Verdana, Tahoma, Geneva, sans-serif; font-size: 14px; line-height: 20px; color: #ffffff; text-decoration: none; font-weight: bold;">Verify Account</a>\n' +
                '                                                </td>\n' +
                '                                            </tr>\n' +
                '                                        </table>\n' +
                '                                        <div style="height: 33px; line-height: 33px; font-size: 31px;">&nbsp;</div>\n' +
                '                                    </td>\n' +
                '                                </tr>\n' +
                '                            </table>\n' +
                '                        </td>\n' +
                '                        <td class="mob_pad" width="25" style="width: 25px; max-width: 25px; min-width: 25px;">&nbsp;</td>\n' +
                '                    </tr>\n' +
                '                </table>\n' +
                '                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #f3f3f3; min-width: 350px; font-size: 1px; line-height: normal;">\n' +
                '                    <tr>\n' +
                '                        <td```javascript align="center" valign="top">\n' +
                    '                            <div style="height: 25px; line-height: 25px; font-size: 23px;">&nbsp;</div>\n' +
                '                        </td>\n' +
                '                    </tr>\n' +
                '                </table>\n' +
                '            </td>\n' +
                '        </tr>\n' +
                '    </table>\n' +
                '</body>'
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Verification email sent.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while sending the email' });
    }
});

//http://localhost:3001/user
router.get("/", async (req, res) => {
    try {
        const listOfUsers = await User.findAll();
        res.json(listOfUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching users" });
    }
});

//http://localhost:3001/user/id
router.get("/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while searching for the user" });
    }
});

//http://localhost:3001/user
router.post("/", async (req, res) => {
    const user = req.body;

    try {
        await User.create(user);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while creating the user" });
    }
});

//http://localhost:3001/user/id
router.delete("/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        await user.destroy();

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting the user" });
    }
});

//http://localhost:3001/user/id
router.put("/:id", async (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        await user.update(updatedUser);

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating the user" });
    }
});

//http://localhost:3001/user/register
router.post('/register', async (req, res) => {
    try {
        const { name, password, cin, address, region, email, role, shopId } = req.body;

        // Generate a salt for password encryption
        const salt = await bcrypt.genSalt(10);

        // Hash the password using bcrypt and the generated salt
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user record in the database
        const user = await User.create({
            name,
            password: hashedPassword,
            cin,
            address,
            region,
            email,
            role,
            shopId
        });

        // Send a success response with a message and the user ID
        res.status(200).json({ message: 'Registration successful!', id: user.id });
    } catch (error) {
        console.error(error);
        // If an error occurs, send an error response with a status code of 500
        res.status(500).json({ message: 'An error occurred during registration.' });
    }
});

//http://localhost:3001/user/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Retrieve the user from the database based on the email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Incorrect password!!' });
        }

        // Generate a JWT token with the user's ID as the payload
        const token = jwt.sign({ userId: user.id }, 'EDXoMfW3D00DNrhqA0AvTuE1zX7r6a3Z');

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred during authentication.' });
    }
});

//http://localhost:3001/user/users/cards
router.get("/users/cards", async (req, res) => {
    try {
        const users = await User.findAll({
            where: {
                role: "client"
            },
            include: [
                {
                    model: Order,
                    as: "orders",
                    include: [
                        {
                            model: Card,
                            as: "cards",
                        },
                    ],
                },
            ],
        });

        //creates an array of user cards objects containing user information and their associated card information
        const userCards = users.map((user) => ({
            userId: user.id,
            name: user.name,
            email: user.email,
            cin:user.cin,
            region:user.region,
            cards: user.orders.flatMap((order) => order.cards.map((card) => ({
                number: card.number,
                pinCode: card.pinCode,
                status: card.status,
                activationDate: card.activationDate,
                forfait: card.forfait
            })))
        }));

        res.json(userCards);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "An error occurred during user and card retrieving"
        });
    }
});

router.get('/users/all', async (req, res) => {
    User.findAll({
        include: [
            {
                model: Order,
                as: 'orders',
                include: [
                    {
                        model: Card,
                        as: 'cards'
                    },
                    {
                        model: Invoice,
                        as: 'invoice'
                    }
                ]
            }
        ]
    })
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            console.log('Error:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});


module.exports = router