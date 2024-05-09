import React, { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {

    const host = "http://localhost:5000"
    const notesInitials = [];
    const [notes, setNotes] = useState(notesInitials);

    // Get All Notes
    async function GetAllNotes() {
        try {
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmZTgwYTk3YTI3MDZlOTNjZmNjYWM1In0sImlhdCI6MTcxMTE3NzkwN30.D6io2zRI2rAFuEHaPnTenxuIE7FKG2sxqru5_g1um2U",
                }
            });

            const result = await response.json();
            console.log("Success:", result);
            setNotes(result);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    // Add a Note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmZTgwYTk3YTI3MDZlOTNjZmNjYWM1In0sImlhdCI6MTcxMTE3NzkwN30.D6io2zRI2rAFuEHaPnTenxuIE7FKG2sxqru5_g1um2U",
            },
            body: JSON.stringify({title, description, tag}),
        });

        const result = await response.json();
        console.log("Success:", result);
        setNotes(notes.concat(result))
    }

    // Delete a Note
    const deleteNote = async (id) => {

        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE", 
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmZTgwYTk3YTI3MDZlOTNjZmNjYWM1In0sImlhdCI6MTcxMTE3NzkwN30.D6io2zRI2rAFuEHaPnTenxuIE7FKG2sxqru5_g1um2U",
            }
        });

        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)

    }
    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        // API call to update the note on the server
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmZTgwYTk3YTI3MDZlOTNjZmNjYWM1In0sImlhdCI6MTcxMTE3NzkwN30.D6io2zRI2rAFuEHaPnTenxuIE7FKG2sxqru5_g1um2U",
            },
            body: JSON.stringify({ title, description, tag })
        });
        const result = await response.json();
        console.log("Updated Note:", result);
        
        // Update the note in the local state
        let newNotes = JSON.parse(JSON.stringify(notes)); // Creating a deep copy
        for (let index = 0; index < newNotes.length; index++) {
            if (newNotes[index]._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    };

    return (

        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, GetAllNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;