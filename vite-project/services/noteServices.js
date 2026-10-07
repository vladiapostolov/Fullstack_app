import userServices from "./userServices.js";

const getNotes = async () => {
    const response = await fetch("/api/notes");
    if(!response.ok){
        throw new Error("Failed to fetch data");
    }

    return response.json();
}

const getUserNotes = async (id) => {
    const response = await fetch(`/api/notes/${id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${userServices.getToken()}`
        }
    });

    if(!response.ok){
        throw new Error("Error with get request for Notes");
    }

    const data = await response.json();
    console.log(data);
    return data;

}

const sendUserNote = async (note) => {
    const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
            "Authorization" : `Bearer ${userServices.getToken()}`,
            "content-type": "application/json",
        },
        body:JSON.stringify({
            text: note.content,
            important: note.important
        })
    })

    if(!response.ok){
        throw new Error("POST request for note creation failed");
    }

    return response.json();
}

const updateNote = async (note) => {
    const id = note._id;

    const response = await fetch("/api/notes",{
        method: "PUT",
        headers:{
            "Authorization": `Bearer ${userServices.getToken()}`,
            "content-type": "application/json"
        },
        body: JSON.stringify({
            _id: id,
            important: note.important,
            text: note.text
        })
    })

    if(!response.ok){
        throw new Error("Failed PUT request");
    }
    
    return response.json();
}

const deleteNote = async (note) => {
    const response = await fetch(`/api/notes/${note._id}`,{
        method: "DELETE",
        headers:{
            "content-type": "application/json",
            "Authorization": `Bearer ${userServices.getToken()}`
        },
        body: JSON.stringify({
            _id: note._id,
        })
    })
    
    if(!response.ok){
        throw new Error("Failed DELETE request");
    }
}

const getNote = async (note_id) => {
    const response = await fetch(`/api/notes/${note_id}`,{
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${userServices.getToken()}`
        }
    });

    if(!response.ok){
        throw new Error("Failed GET request for specific note");
    }

    return await response.json();
}

export default { getNotes, getUserNotes, sendUserNote, updateNote, deleteNote, getNote };