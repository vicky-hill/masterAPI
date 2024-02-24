const Product = require('../products/products.model')
const { dollarToCents } = require('./orders.utils')
const Stripe = require('stripe')

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Stripe Checkout
 * @get /orders/checkout
 * @property {array} req.body.items - [{ id: 131, metadata: {quantity: 1} }] items to checkout 
 * @property {object} req.body.metadata - { cartID }
 * @property {number} req.body.shipping - shipping cost
 * @returns clientSecret
 */
const checkout = async (req, res, next) => {
    try {
        const productIDs = req.body.items.map(item => item.id);
        const products = await Product.find({ _id: productIDs });

        const calculateSubTotal = (items) => {
            const itemsWithPrice = items.map(item => ({
                id: item.id,
                quantity: item.metadata.quantity,
                price: products.find(product => product._id.toString() === item.id).price
            }))

            const subtotal = itemsWithPrice.reduce((acc, cur) => {
                return acc + Number(cur.price) * cur.quantity
            }, 0)

            return subtotal;
        }

        const calculateOrderAmount = (items) => {
            const subtotal = calculateSubTotal(items);
            const total = dollarToCents(subtotal + (req.body.shipping || 0) + (req.body.metadata.tax || 0));

            return total;
        };

        const { items } = req.body;

        const amount = calculateOrderAmount(items);

        let paymentIntent;

        paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            },
            payment_method_options: {
                card: {
                    capture_method: 'manual'
                }
            },
            metadata: req.body.metadata
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
            id: paymentIntent.id
        });

    } catch (e) {
        next(e);
    }
}

module.exports = {
    checkout
}