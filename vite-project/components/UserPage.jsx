import noteServices from "../services/noteServices";
import { useEffect, useState } from "react";
import NoteForm from "./NoteForm";

const UserPage = (props) => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        noteServices
            .getUserNotes(props.user)
            .then(notes => setNotes(notes));
    }, [props.user])
    return (
        <>
            <p>Welcome, {props.username}!</p>
            {props.notes.map(note => {
                return (
                    <p key={note._id}>{note.text} is important {note.important}</p>
                )
            })}
            {notes.map(note => {
                return (
                    <p key={note._id}>{note.text} is important {note.important}</p>
                )
            })}
            <button onClick={props.handleLogin}>logout</button>
            <NoteForm notes={notes} setNotes={setNotes}/>
        </>
    )
}

export default UserPage;