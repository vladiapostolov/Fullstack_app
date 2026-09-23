import { Note, User } from "../mongo.js";
import bcrypt from "bcrypt";
import express from 'express';

const userRouter = express.Router();

userRouter.get('/', async (request, response) => {
    const users = await User.find({});

    response.status(200).json(users);
})

userRouter.post('/', async (request, response, next) => {
    const {username, password} = request.body;

    if(!username || !password){
        return response.status(400).json({error: "wrong params"});
    }

    const user = await User.findOne({username});

    if(user){
        return response.status(401).json({error: "Username does exist"});
    }

    const hashedPassword =await bcrypt.hash(password, 10);
    const userToSave = new User({username, password: hashedPassword, notes: []});
    
    try{
        await userToSave.save();
        response.status(201).json(userToSave);
    }catch(e){
        next(e);
    }
})

export {userRouter};