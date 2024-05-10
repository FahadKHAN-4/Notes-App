import React, { useState, useContext } from 'react';
import noteContext from '../context/notes/NoteContext';

function NoteItem({ note }) {
    
    const context = useContext(noteContext);
    const { deleteNote, editNote } = context;

    const [editMode, setEditMode] = useState(false);
    const [editedNote, setEditedNote] = useState({ ...note });

    const handleEdit = () => {
        editNote(editedNote._id, editedNote.title, editedNote.description, editedNote.tag);
        setEditMode(false);
    };

    return (
        <div className='col-md-3 my-3'>
            <div className="card">
                <div className="card-body">
                    {editMode ? (
                        <>
                            <input type="text" value={editedNote.title} onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })} />
                            <textarea value={editedNote.description} onChange={(e) => setEditedNote({ ...editedNote, description: e.target.value })}></textarea>
                            <input type="text" value={editedNote.tag} onChange={(e) => setEditedNote({ ...editedNote, tag: e.target.value })} />
                            <button onClick={handleEdit}>Save</button>
                        </>
                    ) : (
                        <>
                            <h5 className="card-title">{note.title}</h5>
                            <p className="card-text">{note.description}</p>
                            <i className="fa-solid fa-trash" onClick={() => deleteNote(note._id)}></i>
                            <i className="fa-solid fa-pen-to-square mx-2" onClick={() => setEditMode(true)}></i>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default NoteItem;