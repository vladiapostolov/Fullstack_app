import { useState } from "react";
import noteServices from "../services/noteServices";

const NoteForm = (props) => {
    const [content, setContent] = useState("");
    const [important, setImportant] = useState(true);
    const [isClicked, setisClicked] = useState(false);
    
    const handleChange = (e) => {
        setContent(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        noteServices
                    .sendUserNote({content, important})
                    .then(jsonNote => 
                            props.setNotes([...props.notes, jsonNote]));
        setContent("");
        setImportant(!important);
    }

    const handleClick = (e) => {
        e.preventDefault();
        setisClicked(!isClicked);
    }

    const showForm = () => {
        return (
            <>
                <form className="Note form" onSubmit={handleSubmit}>
                    Add note:
                    <label>
                        Content:
                        <input type="text" 
                                value={content} 
                                onChange={handleChange}
                        >
                        </input>
                    </label>
                    <br/>
                    <label>
                        Toggle importance
                        <button type="button" 
                                value={important} 
                                onClick={(e) =>{
                                    e.preventDefault();
                                    setImportant(!important);
                                }}>
                            {
                                important ? "True" : "False"
                            }
                        </button>
                    </label>
                    <br/>
                    <button>Save</button>
                </form>
            </>
        )
    }

    return (
        <>
        <br/>
        <button onClick={handleClick}>Add new note</button>
        {isClicked && showForm()}
        </>
    )
}

export default NoteForm;