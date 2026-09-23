import { User } from "../mongo.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import express from 'express';
import  dotenv  from "dotenv";
dotenv.config();

const loginRouter = express.Router();

loginRouter.post('/', async (req, res) => {
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(401).json({error: "Missing content"});
    }

    const user = await User.findOne({ username });

    if(!user){
        return res.status(401).json({error: "No such username"});
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);
    if(!passwordCorrect){
        return res.status(401).json({error: "Wrong password"});
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }
    const token = jwt.sign(userForToken, process.env.JWT_SECRET_KEY);
    res.json({token, user });
})

export {loginRouter};