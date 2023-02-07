import React, { useEffect, useState } from 'react';
import "./CreateUpdateNote.css";

const EditNote = (props) => {
    const {selected}=props;
    const [note, setNote] = useState({
        id: selected.id,
        title: selected.title,
        tagline: selected.tagline,
        body: selected.body
    });

    const [isBtnDisable,setIsBtnDisable]=useState(false);

    function handleNote(event){
        const {name,value}=event.target;
        setNote(prevNote=>{
            return {...prevNote,[name]:value}
        })
    }

    function updateNote(event){
        event.preventDefault();
        props.update(note);
    }

    function handleModalClose(){
        props.close()
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
            <form className='createNoteForm' onSubmit={updateNote}>
                <input className='titleField' type="text" name="title" onChange={handleNote} value={note.title} placeholder='Title' />
                <input className='taglineField' type="text" name="tagline" onChange={handleNote} value={note.tagline} placeholder='Tagline' />
                <textarea className='bodyField' name="body" onChange={handleNote} value={note.body} placeholder="Take a note..." rows="3" />
                <div className="btnDiv">
                    <button className='btn btn-active' onClick={handleModalClose}>Cancel</button>
                    <button type="submit" className={`btn ${!isBtnDisable ? 'btn-inactive' : 'btn-active'}`} disabled={!isBtnDisable}>Add</button>
                </div>
            </form>
        </div>
    )
}

export default EditNote;