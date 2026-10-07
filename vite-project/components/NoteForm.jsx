import { useState } from "react";
// import { useNotesActions } from "../src/store"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import noteServices from "../services/noteServices";

const NoteForm = () => {
    const [content, setContent] = useState("");
    const [important, setImportant] = useState(true);
    const [isClicked, setisClicked] = useState(false);
    //const {add} = useNotesActions();
    const queryClient = useQueryClient()

    const addNoteMutation = useMutation({
        mutationFn: (note) => {return noteServices.sendUserNote(note)},
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['notes']})
        }
    })

    const handleChange = (e) => {
        setContent(e.target.value);
    }

    const handleClick = () => {
        setisClicked(!isClicked);
    }

    const showForm = () => {
        return (
            <>
                <form className="Note form" onSubmit={(e)=>{
                    e.preventDefault();
                    addNoteMutation.mutate({content, important})
                    }}>
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
                                    setImportantMutation.mutate({content, important});
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