import React from 'react'
import { useState, useEffect } from 'react'
import Form from './Form'
import NoteService from './NoteService'
import Show from './Show'

function Exercise4() {
  const [notes, setNotes] = useState([])
  const [effect, setEffect] = useState(0)
  const [showAll, setShowAll] = useState(true)

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
   
   let found = notes.find(note => note.name.toUpperCase() === name.toUpperCase())

   if (found === undefined)
   {
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
   else
   {
        const replaceNote = {...found, number}

        NoteService
        .update(found.id, replaceNote)
        .then(response => {
            setNotes(notes.map(note => note.id !== found.id ? note: response))
            callBackSetNewName('')
            callBackSetNewNumber('')
        })


   }
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
    <h3>Phonebook {showAll? "ALL": "IMPORTANT"}</h3>
    <button onClick={() => setShowAll(!showAll)}>{showAll? "Show Important": "Show All"}</button>
    <Show notes= {showAll? notes: notes.filter(note => note.important === true)} handleDelete = {handleDelete} handleToggle = {handleToggle} />
    </>
  )
}

export default Exercise4
