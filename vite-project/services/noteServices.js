import userServices from "./userServices.js";

const getNotes = async () => {
    const response = await fetch("/api/notes");
    if(!response.ok){
        throw new Error("Failed to fetch data");
    }

    return response.json();
}

const getUserNotes = async (user) => {
    const response = await fetch(`/api/notes/${user._id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${userServices.getToken()}`
        }
    });

    if(!response.ok){
        throw new Error("Error with get request for Notes");
    }

    const data = await response.json();

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
            text: JSON.stringify(note.content),
            important: JSON.stringify(note.important)
        })
    })

    if(!response.ok){
        throw new Error("POST request for note creation failed");
    }

    return response.json();
}

export default { getNotes, getUserNotes, sendUserNote };