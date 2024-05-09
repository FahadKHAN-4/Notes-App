import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

export default function Notes() {
    const context = useContext(noteContext);
    const { notes, GetAllNotes } = context;

    useEffect(() => {
        GetAllNotes()
    }, [])

    return (
        <div>
            <AddNote />
            <h1>Your Notes</h1>
            <div className='row'>{notes.map((note) => {
                return <NoteItem note={note} key={note._id} />
            }
            )}</div>

        </div>
    )
}
