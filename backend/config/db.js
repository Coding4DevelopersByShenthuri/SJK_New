import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://shakthy:Shakthykitchen2025@cluster0.rbil0.mongodb.net/Projects').then(()=>console.log('DB Connected'));
}