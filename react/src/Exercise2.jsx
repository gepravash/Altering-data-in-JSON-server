import React from 'react'
import { useState, useEffect } from 'react'
import Form from './Form'
import NoteService from './NoteService'

function Exercise2() {
  const [notes, setNotes] = useState([])
  //const [newNote, setNewNote] = useState('')
  //const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    NoteService
      .getAll()
      .then(response => {
        setNotes(response)
      })
  },[])

  const addNote = (event,name,number) => {
   event.preventDefault()
   const note = {
    id: notes[notes.length-1].id +1,
    name,
    number,
    important: Math.random() > 0.5
   }
   
   NoteService
      .create(note)
      .then(response => {
        setNotes(notes.concat(response))
        })
      .catch(error => {
        console.log(error.name)
      })
  }

  return (
    <>
    <h3>Add new number</h3>
    <Form addNote = {addNote}/>
    <h3>Phonebook</h3>
    <ul style = {{listStyleType: "none"}}>
        {notes.map((note) => {return(
                                        <React.Fragment key = {note.id}>
                                        <li >{note.id} {note.name} {note.number}</li>
                                        </ React.Fragment>
                                    )})}
    </ul>
    </>
  )
}

export default Exercise2
