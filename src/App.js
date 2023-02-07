import React, { useState } from "react";
import "./App.css"
import CreateNote from "./components/CreateNote";
import Header from "./components/Header";
import Note from "./components/Note";
import Modal from "./components/Modal";
import EditNote from "./components/EditNote";
// import data from "./DummyData";
import Pagination from "./components/Pagination";

const App = () =>{
    const [notes,setNotes]=useState([]);
    const [showModal,setShowModal]=useState(false);
    const [selectedNote,setSelectedNote]=useState();
    const [pins,setPins]=useState([]);
    const [currentPage,setCurrentPage]=useState(1);
    const [notePerPage,setNotesPerPage]=useState(6);

    const indexOfLastNote=currentPage*notePerPage;
    const indexOfFirstNote=indexOfLastNote-notePerPage;
    const currentNote=notes.slice(indexOfFirstNote,indexOfLastNote)

    const paginate=(pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    function handleAddNote(note){
        setNotes(prevNote=>{
            return [...prevNote,note]
        })
    }

    function handleEditNote(id){
        const editNote=[...notes];
        const findEditNote=editNote.find(note=>{
            return note.id===id
        })
        setSelectedNote(findEditNote)
        setShowModal(true);
    }

    function handleDeleteNote(id){
        const deleteNote=[...notes];
        const newNotes=deleteNote.filter(note=>{
            return note.id!==id
        });
        setNotes(newNotes)
    }

    function handleUpdateNote(updatedNote){
        const oldNotes=[...notes];
        let index=oldNotes.findIndex(note=>note.id===updatedNote.id);
        oldNotes[index]=updatedNote
        setNotes(oldNotes)
        setShowModal(false)
    }

    function handleModalClose(){
        setShowModal(false)
    }

    function handlePinIds(id){
        if(pins.includes(id)){
            setPins(pins.filter(pin=>pin!==id))
        }else{
            setPins(prevPin=>{
                return [...prevPin,id]
            })
        }
    }

    return(
        <>
            <Header />
            {showModal && <Modal selected={selectedNote}><EditNote update={handleUpdateNote} selected={selectedNote} close={handleModalClose} /></Modal>}
            <div className="main">
                <CreateNote add={handleAddNote} />
                <div className="notes">
                    {currentNote.filter(note=>pins.includes(note.id)).map((note)=>{
                        return(
                            <Note note={note} edit={handleEditNote} delete={handleDeleteNote} pinnedId={handlePinIds} pinIds={pins} key={note.id} />
                        )
                    })}
                    {currentNote.filter(note=>!pins.includes(note.id)).map(note=>{
                        return(
                            <Note note={note} edit={handleEditNote} delete={handleDeleteNote} pinnedId={handlePinIds} pinIds={pins} key={note.id} />
                        )
                    })}
                </div>
                <Pagination notePerPage={notePerPage} totalNotes={notes.length} paginate={paginate} />
            </div>
        </>
    )
}

export default App;