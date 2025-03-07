import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log(process.env.STRIPE_SECRET_KEY); // Debugging line

// Initialize Stripe with your secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order from frontend
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";

    try {
        // Create a new order
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();

        // Update the user's basketData to empty after order placement
        await userModel.findByIdAndUpdate(req.body.userId, { basketData: {} });

        // Map over the items to create line items for Stripe
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "lkr", // Currency
                product_data: {
                    name: item.name, // Product name
                },
                unit_amount: item.price * 100 * 80 // Price in cents, adjusted by 80 (exchange rate or factor)
            },
            quantity: item.quantity // Quantity of the product
        }));

        // Adding delivery charges to line items
        line_items.push({
            price_data: {
                currency: "lkr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 250 * 100 * 80
            },
            quantity: 1 // Only 1 delivery charge
        });

        // Create a Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`, // Correct string interpolation
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`, // Correct string interpolation
        });

        // Return the session URL to the frontend for redirect
        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error); // Log the error for debugging
        res.json({ success: false, message: 'Failed to place order' }); // Send failure response
    }
};

const verifyOrder = async (req, res) => {
    const { success, orderId } = req.body;
    try {
        if (success == 'true') {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: 'Order placed successfully' });
        }
        else {
            await orderModel.findByIdAndUpdate(orderId, { payment: false });
            res.json({ success: false, message: 'Order placement failed' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Failed to verify order' });
    }

}

// user orders for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Failed to fetch user orders' });
    }
}

export { placeOrder, verifyOrder, userOrders };
