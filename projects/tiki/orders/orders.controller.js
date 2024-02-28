const Product = require('../products/products.model')
const Cart = require('../carts/carts.model')
const Order = require('../orders/orders.model')
const { dollarToCents, sendConfirmationEmail } = require('./orders.utils')
const Stripe = require('stripe')


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Stripe Checkout
 * @get /orders/checkout
 * @property {array} req.body.items - [{ id: 131, metadata: {quantity: 1} }] items to checkout 
 * @property {object} req.body.metadata - { cartID, email }
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

    } catch (err) {
        err.errorCode = 'orders_001'
        next(err);
    }
}

/**
 * Webhook to listen to stripe events
 * @property  
 * @returns 
 */

const webhook = async (req, res, next) => {
    try {
        let event = req.body;
        // Only verify the event if you have an endpoint secret defined.
        // Otherwise use the basic event deserialized with JSON.parse

        const endpointSecret = process.env.ENDPOINT_SECRET;

        if (endpointSecret) {
            // Get the signature sent by Stripe
            const signature = req.headers['stripe-signature'];
            try {
                event = stripe.webhooks.constructEvent(
                    req.body,
                    signature,
                    endpointSecret
                );
            } catch (err) {
                console.log(`⚠️  Webhook signature verification failed.`, err.message);
                return res.json({ error: err.message })
            }
        }

        // Handle the event
        switch (event.type) {
            case 'charge.succeeded':

                const charge = event.data.object;

                const { cartID, email } = charge.metadata;

                await Cart.findByIdAndUpdate(cartID, { status: 'closed' })

                const cart = await Cart.findById(cartID).populate({
                    path: 'items.product',
                    select: 'name price quantity'
                });

                const payload = {
                    total: charge.amount / 100,
                    paymentIntentID: charge.payment_intent,
                    paymentMethodID: charge.payment_method,
                    chargeID: charge.id,
                    payment_status: "uncaptured",
                    last4: charge.payment_method_details?.card?.last4,
                    status: "open",
                    cartID,
                    email,
                    items: cart.items.map(item => ({
                        product: item.product._id,
                        quantity: item.quantity,
                        price: item.product.price,
                        total: item.product.price * item.quantity
                    })),
                    shipTo: {
                        name: charge.shipping.name,
                        address1: charge.shipping.address.line1,
                        address2: charge.shipping.address.line2,
                        city: charge.shipping.address.city,
                        state: charge.shipping.address.state,
                        zip: charge.shipping.address.postal_code,
                    }
                }

                const order = await Order.create(payload);

                // if (paymentIntent.status !== "succeeded") {
                //     await stripe.paymentIntents.capture(charge.payment_intent);
                //     await OrderModel.update({ paymentStatus: "succeeded" }, { where: { orderID: createdOrder.orderID } });
                // }

                for (const item of order.items) {
                    const { product, quantity } = item;
                    await Product.findByIdAndUpdate(
                        product,
                        { $inc: { quantity: quantity * -1 } },
                        { new: true }
                    )
                }

                await sendConfirmationEmail(email);

                break;
            case 'payment_method.attached':
                const paymentMethod = event.data.object;
                // Then define and call a method to handle the successful attachment of a PaymentMethod.
                // handlePaymentMethodAttached(paymentMethod);
                break;
            default:
                // Unexpected event type
                console.log(`Unhandled event type ${event.type}.`);
        }

        // Return a 200 response to acknowledge receipt of the event
        res.json({
            message: 'success'
        });
    } catch (err) {
        err.errorCode = 'orders_002'
        next(err);
    }
}

/**
 * Get orders
 * @get /orders
 * @query search
 * @query category
 * @returns { data: [{Product}]}
 */
const getOrders = async (req, res, next) => {
    try {
        const { customerID, search } = req.query;

        const options = {};

        if (search) {
            options.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { short_description: { $regex: search, $options: 'i' } }
            ]
        }

        if (customerID) {
            options.customerID = customerID;
        }

        const orders = await Order.find(options)
            .sort({ createdAt: -1 });

        res.json({
            data: orders
        });
    } catch (err) {
        err.errorCode = 'orders_003'
        next(err);
    }
}


/**
 * Create Order
 * @post /orders
 * @returns { Order }
 */
const createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body)
        res.send(order);
    } catch (err) {
        next(err);
    }
}

/**
 * testing
 * @get /orders/test
 * @returns { Order }
 */
const test = async (req, res) => {
    try {

        res.json(response);
    } catch (err) {
        err.errorCode = 'orders_004'
        next(err);
    }
}



module.exports = {
    checkout,
    webhook,
    createOrder,
    getOrders,
    test
}