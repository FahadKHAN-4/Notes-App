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

    return(
        <noteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;