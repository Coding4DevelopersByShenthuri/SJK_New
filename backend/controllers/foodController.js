import { console } from "inspector";
import foodModel from "../models/foodModel.js";
import fs from "fs";
import path from "path";

// Add food item
const addFood = async (req, res) => {
    let image_filename = req.file.filename;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        normalPrice: req.body.normalPrice,
        fullPrice: req.body.fullPrice,
        Image: image_filename,
        category: req.body.category
    });

    try {
        await food.save();
        res.json({ success: true, message: 'Food item added successfully' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Failed to add food item' });
    }
};

// List food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        res.json({ success: false, message: 'Failed to list food items' });
    }
};

// Remove food item
const removeFood = async (req, res) => {
    try {
        // Find the food item by ID
        const food = await foodModel.findById(req.body.id);

        if (!food) {
            return res.status(404).json({ success: false, message: 'Food item not found' });
        }

        // If the food item has an associated image, remove it from the uploads folder
        if (food.Image) {
            const imagePath = path.join(__dirname, `../uploads/${food.Image}`);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.log("Error removing image file:", err);
                }
            });
        }

        // Delete the food item from the database
        await foodModel.findByIdAndDelete(req.body.id);

        res.json({ success: true, message: 'Food item removed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to remove food item' });
    }
};

// Edit food item
const editFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        if (food.Image) {
            // Remove the old image file from the uploads folder
            const imagePath = path.join(__dirname, `../uploads/${food.Image}`);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.log("Error removing old image file:", err);
                }
            });
        }

        const updatedFood = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            normalPrice: req.body.normalPrice,
            fullPrice: req.body.fullPrice,
            category: req.body.category,
        };

        // If a new image is uploaded, update the food's image
        if (req.file) {
            updatedFood.Image = req.file.filename;
        }

        await foodModel.findByIdAndUpdate(req.body.id, updatedFood);
        res.json({ success: true, message: 'Food item updated successfully' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Failed to update food item' });
    }
};

export { addFood, listFood, removeFood, editFood };
