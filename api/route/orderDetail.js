const express = require('express');
const orderDetailRoutes = express.Router();

const orderDetail = require('../models/orderDetail.js');

// GET - Get all orderDetails from MongoDB
orderDetailRoutes.route('/').get(async (req, res) => {
    try {
        const orderDetails = await orderDetail.find({});
        res.send(orderDetails);
    } catch (err) {
        console.log('Error:', err);
        res.status(500).send('An error occurred while retrieving orderDetails.');
    }
});

// POST - Create a new orderDetail
orderDetailRoutes.route('/').post(async (req, res) => {
    try {
        const newOrderDetail = new orderDetail(req.body);
        const savedOrderDetail = await newOrderDetail.save();
        res.status(201).send(savedOrderDetail);
    } catch (err) {
        console.log('Error:', err);
        res.status(500).send('An error occurred while creating the orderDetail.');
    }
});

// GET - Get a specific orderDetail by ID
orderDetailRoutes.route('/:id').get(async (req, res) => {
    try {
        const anOrderDetail = await orderDetail.findById(req.params.id);
        if (!anOrderDetail) {
            res.status(404).send('OrderDetail not found.');
        } else {
            res.send(anOrderDetail);
        }
    } catch (err) {
        console.log('Error:', err);
        res.status(500).send('An error occurred while retrieving the orderDetail.');
    }
});

// PUT - Update a specific orderDetail by ID
orderDetailRoutes.route('/:id').put(async (req, res) => {
    try {
        const updatedOrderDetail = await orderDetail.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!updatedOrderDetail) {
            res.status(404).send('OrderDetail not found.');
        } else {
            res.send(updatedOrderDetail);
        }
    } catch (err) {
        console.log('Error:', err);
        res.status(500).send('An error occurred while updating the orderDetail.');
    }
});

// DELETE - Delete a specific orderDetail by ID
orderDetailRoutes.route('/:id').delete(async (req, res) => {
    try {
        const deletedOrderDetail = await orderDetail.findByIdAndRemove(req.params.id);
        if (!deletedOrderDetail) {
            res.status(404).send('OrderDetail not found.');
        } else {
            res.sendStatus(204);
        }
    } catch (err) {
        console.log('Error:', err);
        res.status(500).send('An error occurred while deleting the orderDetail.');
    }
});

module.exports = orderDetailRoutes;
