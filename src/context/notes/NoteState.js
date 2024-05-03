import React, { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {

    const notesInitials = [
        {
          "_id": "65fe89be31a554005f6e002a",
          "user": "65fe80a97a2706e93cfccac5",
          "title": "First Note updated",
          "description": "Hello world and universe",
          "tag": "General",
          "date": "2024-03-23T07:50:22.762Z",
          "__v": 0
        },
        {
          "_id": "65fe9bc4f91440096b9ebe62",
          "user": "65fe80a97a2706e93cfccac5",
          "title": "First Note",
          "description": "Hello world",
          "tag": "General",
          "date": "2024-03-23T09:07:16.080Z",
          "__v": 0
        }
      ];

      const [notes, setNotes] = useState(notesInitials);

      // Add a Note
      const addNote = (title, description, tag)=>{
        // TODO: API Call
        console.log("Adding a new note")
        
        const note = {
          "_id": "61322f119553781a8ca8d0e08",
          "user": "6131dc5e3e4037cd4734a0664",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2021-09-03T14:20:09.668Z",
          "__v": 0
        };
        setNotes(notes.concat(note)) 
      }

      // Delete a Note
      const deleteNote = ()=>{

      }
      // Edit a Note
      const editNote = ()=>{

      }

    return(
        
        <noteContext.Provider value={{notes, addNote,deleteNote, editNote }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;