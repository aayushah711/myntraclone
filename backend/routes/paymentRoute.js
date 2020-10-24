const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Razorpay = require('razorpay');
const dotenv = require('dotenv');
var request = require('request');

dotenv.config();

const instance = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY_ID,
    key_secret: process.env.RAZOR_PAY_KEY_SECRET
});

router.get('/order', (req, res) => {
    try {
        const options = {
            amount: 10 * 100,
            currency: 'INR',
            receipt: uuidv4(),
            payment_capture: 0
        };
        instance.orders.create(options, (error, order) => {
            if (error) {
                return res.status(500).json({ message: 'Something went wrong' });
            } else {
                return res.status(200).json(order);
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Something went wrong'
        });
    }
});

router.post('/capture/:paymentId', (req, res) => {
    try {
        return request(
            {
                method: 'POST',
                url: `https://${process.env.RAZOR_PAY_KEY_ID}:${process.env
                    .RAZOR_PAY_KEY_SECRET}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
                form: {
                    amount: 10 * 100,
                    currency: 'INR'
                }
            },
            async function(error, response, body) {
                if (error) {
                    return res.status(500).json({
                        message: 'Something Went Wrong1'
                    });
                }
                return res.status(200).json(body);
            }
        );
    } catch (err) {
        return res.status(500).json({
            message: 'Something Went Wrong2'
        });
    }
});

module.exports = router;
