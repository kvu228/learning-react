import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Order from "../model/orderModel.js";

//@desc     Create new order
//@route    Post /api/orders
//@access   Prive
const addOrderItems = expressAsyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error("No order items");
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
        });
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
});

//@desc     GET order by ID
//@route    GET /api/orders/:id
//@access   Prive
const getOrderById = expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );
    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});

//@desc     Update order to paid
//@route    PUT /api/orders/:id/pay
//@access   Prive
const updateOrderToPaid = expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_Address: req.body.payer.email_Address,
        };

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});

//@desc     Get loged in user's orders
//@route    GET /api/orders/myorders
//@access   Prive
const getMyOrders = expressAsyncHandler(async (req, res) => {
    const userLoginID = req.user._id;
    const orders = await Order.find({ user: userLoginID });
    res.json(orders);
});

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders };
