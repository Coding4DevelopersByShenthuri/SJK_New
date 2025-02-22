import foodModel from "../models/foodModel.js";
import fs from "fs";


// add food item

const addFood = async (req, res) => {

    let image_filename =  `${req.file.filename}`;
    
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        Image: image_filename,
        category: req.body.category
    })
    try {
        await food.save();
        res.json({success: true, message:'Food item added successfully'})
    } catch (error) {
        console.log(error)
        res.json({success: false, message:'Failed to add food item'})
    }
}

// list food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success: true, data:foods})
    } catch (error) {
      res.json({success: false, message:'Failed to list food items'})
    }
}

// remove food item

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.Image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message:'Food item removed successfully'})
    } catch (error) {
        console.log(error);
        res.json({success: false, message:'Failed to remove food item'})
    }
}

export {addFood, listFood, removeFood}