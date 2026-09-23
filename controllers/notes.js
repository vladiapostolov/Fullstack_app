import express from 'express';
import jwt from 'jsonwebtoken';
import { Note, User } from "../mongo.js";

const notesRouter = express.Router();

const getToken = (header) => {
    return header.authorization.replace("Bearer ", "");
}

notesRouter.get("/", async(req, res) => {
    const notes = await Note.find({});

    res.status(200).json(notes);
})

notesRouter.get("/:id", async(req, res) => {
    const {id} = req.params.id;

    if(!id){
        return res.status(404).json({error: "Content missing: ID"});
    }

    try{
        jwt.verify(getToken(req.headers), process.env.JWT_SECRET_KEY);
    }catch(e){
        next(e);
    }

    const note = await Note.findById({id});
    if(!note){
        return response.status(404).json({error: "Note not found"});
    }

    res.status(200).json(note);
})

notesRouter.post('/', async(req, res, next) => {
    if(!req.body){
        return res.status(401).json({error: "Content missing"});
    }

    const data = jwt.verify(getToken(req.headers), process.env.JWT_SECRET_KEY);
    const user = await User.findById(data.id);
    const noteToAdd = new Note({ text: req.body.text, important: req.body.important });
    try{
        console.log(noteToAdd);
        await noteToAdd.save();
        await User.findByIdAndUpdate(data.id, {
            $push : {notes: noteToAdd}
        }, {new: true});

        res.status(200).json(noteToAdd);
    }catch(e){
        next(e);
    }
})

notesRouter.delete("/:id", async(req, res, next) => {
    const id = req.params.id;

    const noteToDelete = await Note.findById(id);
    if(!noteToDelete){
        res.status(404).json({error: "No such note to delete"});
    }

    try{
        await Note.findByIdAndDelete(id);
        res.status(200).send("Note deleted");
    }catch(e){
        next(e);
    }
})

export {notesRouter};