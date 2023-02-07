import React, { useState } from 'react';
import "./Note.css";

const Note = (props) => {
  const {pinIds}=props;
  const {note}=props;

  function handleNoteEdit(id){
    props.edit(id)
  }
  function handleNoteDelete(id){
    props.delete(id)
  }
  function handleNotePin(id){
    props.pinnedId(id)  
  }

  return (
    <div className='note' key={note.key}>
        <h1 className="noteHeading">{note.title}</h1>
        <p className="noteTagline">{note.tagline}</p>
        <p className="noteBody">{note.body}</p>
        <div className="btnDiv">
          <button className='btn btn-active' onClick={()=>handleNotePin(note.id)}>{pinIds.includes(note.id) ? 'UnPin' : 'Pin'}</button>
          <button className='btn btn-active' onClick={()=>handleNoteEdit(note.id)}>Edit</button>
          <button type="submit" className='btn btn-active' onClick={()=>handleNoteDelete(note.id)}>Delete</button>
        </div>
    </div>
  )
}

export default Note;