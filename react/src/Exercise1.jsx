import { useState, useEffect } from 'react'
import axios from 'axios'
import Form from './Form'

function Exercise1() {
  const [notes, setNotes] = useState([])
  //const [newNote, setNewNote] = useState('')
  //const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    axios
      .get("http://localhost:3001/notes")
      .then(response => {
        console.log(response.data)
        setNotes(response.data)
      })
  },[])

  const addNote = (event,name,number) => {
   event.preventDefault()
   const note = {
    id: notes.length +1,
    name,
    number,
    important: Math.random() > 0.5
   }
   
   axios
      .post("http://localhost:3001/notes", note)
      .then(response => {
        setNotes(notes.concat(response.data))
        })
  }

  return (
    <>
    <h3>Add new number</h3>
    <Form addNote = {addNote}/>
    <h3>Phonebook</h3>
    <ul style = {{listStyleType: "none"}}>
    {notes.map((note) => <li key = {note.id}>{note.id} {note.name} {note.number}</li>)}
    </ul>
    </>
  )
}

export default Exercise1
