const express = require('express');
const staffRoutes = express.Router();

const staff = require('../models/staff.js');

// GET - Get all staffs from MongoDB
staffRoutes.route('/').get(async (req, res) => {
    try {
        const staffs = await staff.find({});
        res.send(staffs);
    } catch (err) {
        console.log('Error:', err);
        res.status(500).send('An error occurred while retrieving staffs.');
    }
});

// POST - Create a new staff
staffRoutes.route('/').post(async (req, res) => {
    try {
        const newStaff = new staff(req.body);
        const savedStaff = await newStaff.save();
        res.status(201).send(savedStaff);
    } catch (err) {
        console.log('Error:', err);
        res.status(500).send('An error occurred while creating the staff.');
    }
});

// GET - Get a specific staff by ID
staffRoutes.route('/:id').get(async (req, res) => {
    try {
        const anStaff = await staff.findById(req.params.id);
        if (!anStaff) {
            res.status(404).send('Staff not found.');
        } else {
            res.send(staff);
        }
    } catch (err) {
        console.log('Error:', err);
        res.status(500).send('An error occurred while retrieving the staff.');
    }
});

// PUT - Update a specific staff by ID
staffRoutes.route('/:id').put(async (req, res) => {
    try {
        const updatedStaff = await staff.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!updatedStaff) {
            res.status(404).send('Staff not found.');
        } else {
            res.send(updatedStaff);
        }
    } catch (err) {
        console.log('Error:', err);
        res.status(500).send('An error occurred while updating the staff.');
    }
});

// DELETE - Delete a specific staff by ID
staffRoutes.route('/:id').delete(async (req, res) => {
    try {
        const deletedStaff = await staff.findByIdAndRemove(req.params.id);
        if (!deletedStaff) {
            res.status(404).send('Staff not found.');
        } else {
            res.sendStatus(204);
        }
    } catch (err) {
        console.log('Error:', err);
        res.status(500).send('An error occurred while deleting the staff.');
    }
});

module.exports = staffRoutes;
