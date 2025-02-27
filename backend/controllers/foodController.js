import foodModel from "../models/foodModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Add food item
const addFood = async (req, res) => {
    try {
        let image_filename = req.file ? req.file.filename : null;

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            normalPrice: req.body.normalPrice,
            fullPrice: req.body.fullPrice,
            Image: image_filename,
            category: req.body.category
        });

        await food.save();
        res.json({ success: true, message: 'Food item added successfully' });
    } catch (error) {
        console.error("Error adding food:", error);
        res.status(500).json({ success: false, message: 'Failed to add food item' });
    }
};

// List food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.error("Error listing food:", error);
        res.status(500).json({ success: false, message: 'Failed to list food items' });
    }
};

// Remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        if (!food) {
            return res.status(404).json({ success: false, message: 'Food item not found' });
        }

        if (food.Image) {
            const imagePath = path.join(__dirname, "uploads", food.Image);
            fs.unlink(imagePath, (err) => {
                if (err) console.error("Error removing image file:", err);
            });
        }

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: 'Food item removed successfully' });
    } catch (error) {
        console.error("Error removing food:", error);
        res.status(500).json({ success: false, message: 'Failed to remove food item' });
    }
};

// Edit food item
const editFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.status(404).json({ success: false, message: 'Food item not found' });
        }

        if (food.Image && req.file) {
            const oldImagePath = path.join(__dirname, "uploads", food.Image);
            fs.unlink(oldImagePath, (err) => {
                if (err) console.error("Error removing old image file:", err);
            });
        }

        const updatedFood = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            normalPrice: req.body.normalPrice,
            fullPrice: req.body.fullPrice,
            category: req.body.category,
            Image: req.file ? req.file.filename : food.Image
        };

        await foodModel.findByIdAndUpdate(req.body.id, updatedFood);
        res.json({ success: true, message: 'Food item updated successfully' });
    } catch (error) {
        console.error("Error updating food:", error);
        res.status(500).json({ success: false, message: 'Failed to update food item' });
    }
};

export { addFood, listFood, removeFood, editFood };
