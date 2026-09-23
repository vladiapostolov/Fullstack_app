import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { notesRouter } from './controllers/notes.js';
import { userRouter } from './controllers/users.js';
import { loginRouter } from './controllers/login.js';

dotenv.config();

try{
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Successfull connection")
}catch(e){
    console.log("Failed to connect");
}
const app = express();

app.use(express.static('dist'))
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/notes', notesRouter);

export { app };