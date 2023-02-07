import React, { useEffect, useId, useState } from 'react';
import "./CreateUpdateNote.css";

const CreateNote = (props) => {
    const id=useId();
    const [note, setNote] = useState({
        id: '',
        title: '',
        tagline: '',
        body: ''
    });

    const [isBtnDisable,setIsBtnDisable]=useState(false);

    const [showNoteForm,setShowNoteForm]=useState(false);

    function handleNote(event){
        const {name,value}=event.target;
        setNote(prevNote=>{
            return {...prevNote,[name]:value}
        })
    }

    function addNote(event){
        event.preventDefault();
        const addingNote={...note,id:new Date().getTime().toString()};
        props.add(addingNote);
        setNote({
            id: '',
            title: '',
            tagline: '',
            body: ''
        })
        setShowNoteForm(false)
    }

    function handleShowNoteForm(){
        setShowNoteForm(true)
    }

    function handleNoteShowNoteForm(){
        setShowNoteForm(false)
    }

    useEffect(()=>{
        if(note.title.length>0 && note.tagline.length>0 && note.body.length>0){
            setIsBtnDisable(true)
        }else{
            setIsBtnDisable(false)
        }
    },[note])

    return (
        <div className='create-note'>
            <form className='createNoteForm' onSubmit={addNote}>
                {showNoteForm && <input className='titleField' type="text" name="title" onChange={handleNote} value={note.title} placeholder='Title' />}
                {showNoteForm && <input className='taglineField' type="text" name="tagline" onChange={handleNote} value={note.tagline} placeholder='Tagline' />}
                <textarea className='bodyField' name="body" onChange={handleNote} value={note.body} placeholder="Take a note..." rows="3" onClick={handleShowNoteForm} />
                {showNoteForm && <div className="btnDiv">
                    <button className='btn btn-active' onClick={handleNoteShowNoteForm}>Cancel</button>
                    <button type="submit" className={`btn ${!isBtnDisable ? 'btn-inactive' : 'btn-active'}`} disabled={!isBtnDisable}>Add</button>
                </div>}
            </form>
        </div>
    )
}

export default CreateNote;