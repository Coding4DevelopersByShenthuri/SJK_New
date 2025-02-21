import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';



// app config
const app = express();
const port = 5000

// middlewares
app.use(express.json());
app.use(cors());

// db Connection
connectDB();


app.get('/', (req, res) => {
    res.send('API Working!')
})

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})



