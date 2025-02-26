import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    normalPrice: { type: Number, required: true },  // Added normalPrice
    fullPrice: { type: Number, required: true },    // Added fullPrice
    Image: { type: String, required: true },
    category: { type: String, required: true }
});

const foodModel = mongoose.models.food || mongoose.model('food', foodSchema);

export default foodModel;
