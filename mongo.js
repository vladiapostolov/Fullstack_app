import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema({
    text: String,
    important: Boolean,
})


export const Note = mongoose.model("Note", noteSchema);

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Must provide a name!"]
    },
    password: String,
    notes: [{
        type:   mongoose.Schema.Types.ObjectId,
        ref: "Note"
    }]
})

export const User = mongoose.model("User", userSchema);