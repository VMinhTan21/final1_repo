const express = require('express');
const drinkRoutes = express.Router();

const drink = require('../models/drink.js');

// GET - Get all drinks from MongoDB
drinkRoutes.route('/').get(async (req, res) => {
    try {
        const drinks = await drink.find({});
        res.send(drinks);
    } catch (err) {
        console.log('Error:', err);
        res.status(500).send('An error occurred while retrieving drinks.');
    }
});

// POST - Create a new drink
drinkRoutes.route('/').post(async (req, res) => {
    try {
        const newDrink = new drink(req.body);
        const saveDrink = await newDrink.save();
        res.status(201).send(saveDrink);
    } catch (err) {
        console.log('Error:', err);
        res.status(500).send('An error occurred while creating the drink.');
    }
});

// GET - Get a specific drink by ID
drinkRoutes.route('/:id').get(async (req, res) => {
    try {
        const aDrink = await drink.findById(req.params.id);
        if (!aDrink) {
            res.status(404).send('drink not found.');
        } else {
            res.send(aDrink);
        }
    } catch (err) {
        console.log('Error:', err);
        res.status(500).send('An error occurred while retrieving the drink.');
    }
});

// PUT - Update a specific drink by ID
drinkRoutes.route('/:id').put(async (req, res) => {
    try {
        const updatedDrink = await drink.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!updatedDrink) {
            res.status(404).send('drink not found.');
        } else {
            res.send(updatedDrink);
        }
    } catch (err) {
        console.log('Error:', err);
        res.status(500).send('An error occurred while updating the drink.');
    }
});

// DELETE - Delete a specific drink by ID
drinkRoutes.route('/:id').delete(async (req, res) => {
    try {
        const deletedDrink = await drink.findByIdAndRemove(req.params.id);
        if (!deletedDrink) {
            res.status(404).send('drink not found.');
        } else {
            res.sendStatus(204);
        }
    } catch (err) {
        console.log('Error:', err);
        res.status(500).send('An error occurred while deleting the drink.');
    }
});

module.exports = drinkRoutes;
