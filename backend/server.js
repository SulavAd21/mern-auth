import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT||5000;
import userRoutes from './routes/userRoutes.js'
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import dbConnect from './config/db.js';

dbConnect();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api/users',userRoutes)
app.get("/", (req,res)=>res.send('Server is ready'))

// app.use(notFound);
// app.use(errorHandler);

app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`))