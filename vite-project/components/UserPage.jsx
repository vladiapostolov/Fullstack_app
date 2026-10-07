import NoteForm from "./NoteForm";
import { useNavigate } from "react-router-dom";
import { useUsername, useId, useUserActions } from "../src/user-store";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import noteServices from "../services/noteServices";

const UserPage = () => {
    //const notes = useNotes();
    const queryClient = useQueryClient()
    const username = useUsername();
    const id = useId();
    const userActions = useUserActions();
    const navigate = useNavigate();

    const { status, data, error } = useQuery({
        queryKey: ['notes'],
        queryFn: () => noteServices.getUserNotes(id),
        refetchOnWindowFocus: false
    })

    const toggleImportantMutation = useMutation({
        mutationFn: (note) => noteServices.updateNote(note),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['notes']})
        }
    })

    const deleteNoteMutation = useMutation({
        mutationFn: (note) => noteServices.deleteNote(note),
        onSuccess: () => 
            queryClient.invalidateQueries({queryKey: ['notes']})
    })

    if (status==="pending") {
        return <div>loading data...</div>
    }
    
    const notes = data;
    console.log(data);
    const toggleImportant = (note) => {
        toggleImportantMutation.mutate({...note})
    }

    return (
        <>
            <p>Welcome, {username}!</p>
            {!error && notes.map(note => {
                return (
                    <>
                    <p key={note._id}>{note.text} is important {note.important ? "true" : "false"}</p>
                    <button onClick={() => toggleImportant(note)}>toggle important
                    </button>
                    <button onClick={()=>{deleteNoteMutation.mutate(note)}}>
                        delete
                    </button>
                    <button onClick={
                        () => {
                            navigate(`/notes/${note._id}`)
                        }
                    }>
                        inspect note
                    </button>
                    
                    </>
                )
            })}
            {error && <div>Error loading notes</div>}
            <button onClick={userActions.handleLogout}>logout</button>
            <NoteForm/>
        </>
    )
}

export default UserPage;