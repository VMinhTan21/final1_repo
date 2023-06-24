const express = require('express');
const orderRoutes = express.Router();

const order = require('../models/order.js');

// GET - Get all orders from MongoDB
orderRoutes.route('/').get(async (req, res) => {
    try {
        const orders = await order.find({});
        res.send(orders);
    } catch (err) {
        console.log('Error:', err);
        res.status(500).send('An error occurred while retrieving orders.');
    }
});

// POST - Create a new order
orderRoutes.route('/').post(async (req, res) => {
    try {
        const newOrder = new order(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).send(savedOrder);
    } catch (err) {
        console.log('Error:', err);
        res.status(500).send('An error occurred while creating the order.');
    }
});

// GET - Get a specific order by ID
orderRoutes.route('/:id').get(async (req, res) => {
    try {
        const anOrder = await order.findById(req.params.id);
        if (!anOrder) {
            res.status(404).send('Order not found.');
        } else {
            res.send(anOrder);
        }
    } catch (err) {
        console.log('Error:', err);
        res.status(500).send('An error occurred while retrieving the order.');
    }
});

// PUT - Update a specific order by ID
orderRoutes.route('/:id').put(async (req, res) => {
    try {
        const updatedOrder = await order.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!updatedOrder) {
            res.status(404).send('Order not found.');
        } else {
            res.send(updatedOrder);
        }
    } catch (err) {
        console.log('Error:', err);
        res.status(500).send('An error occurred while updating the order.');
    }
});

// DELETE - Delete a specific order by ID
orderRoutes.route('/:id').delete(async (req, res) => {
    try {
        const deletedOrder = await order.findByIdAndRemove(req.params.id);
        if (!deletedOrder) {
            res.status(404).send('Order not found.');
        } else {
            res.sendStatus(204);
        }
    } catch (err) {
        console.log('Error:', err);
        res.status(500).send('An error occurred while deleting the order.');
    }
});

module.exports = orderRoutes;
