import React from 'react'
import { useState, useEffect } from 'react'
import Form from './Form'
import NoteService from './NoteService'

function Exercise3() {
  const [notes, setNotes] = useState([])
  const [effect, setEffect] = useState(0)

  useEffect(() => {
    NoteService
      .getAll()
      .then(response => {
        setNotes(response)
      })
  },[effect])

  const addNote = (event,name,number,callBackSetNewName, callBackSetNewNumber) => {
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
        callBackSetNewName('')
        callBackSetNewNumber('')
        })
      .catch(error => {
        console.log(error.name)
      })
  }

  const handleDelete = (id) => {
    const conform = window.confirm("Are you sure! You want to delete all the value of Id:"+ id+ "?")
    if (conform === true)
    {NoteService
       .erase(id)
       .then(response =>
        {
        if (effect < 64)
        {setEffect(effect+1)}
        else
        (setEffect(0))
        })
    }
    else
    {
        console.log("not deleted id: ", id)
    }
  }

  const handleToggle = (id) => {
    const noteT = notes.find(note => note.id === id)
    const changeNoteT = {...noteT, important: !noteT.important}

    NoteService
        .update(id,changeNoteT)
        .then(response => {
            setNotes(notes.map(note => note.id !== id ? note: response))
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
                                        <button onClick = {() => handleDelete(note.id)}>delete</button>
                                        <button onClick = {() => handleToggle(note.id)}>{note.important === true? "Set not importance": "Set important"}</button>
                                        </ React.Fragment>
                                    )})}
    </ul>
    </>
  )
}

export default Exercise3
