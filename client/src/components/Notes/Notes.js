import React from 'react'
import { useState, useEffect } from 'react';
import useAuth from '../../context/useAuth';
import Spinner from '../commons/Spinner';
// ICONS
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import { BASE_URL } from '../../utils/url';


const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true)
    const auth = useAuth();

    useEffect(()=>{
        if(loading){
            auth.setLoadingNotes(true)
            if(setLoading) setLoading(false)
        }
    })

    //DELETE NOTE:
    const handleDeleteNote = (e) => {
        if(e.target.parentElement.id){
            const id = { "id" : e.target.parentElement.id };
            fetch(`${BASE_URL}/note`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${auth.token.token}`
                },
                body: JSON.stringify(id)
            })
            .then(res => res.json())
            .then(res => auth.setLoadingNotes(true))
        }
    }

    //EDIT NOTE: 
    const handleEditOn = (e) => {
        if(e.target.parentElement.id){
            e.target.parentElement.parentElement.classList.toggle("hidden");
            e.target.parentElement.parentElement.nextElementSibling.classList.toggle("hidden")
            const inputsCol = e.target.parentElement.parentElement.parentElement.previousElementSibling.children;
            const inputsArr = Array.from(inputsCol);
            inputsArr.forEach(input => {
                input.toggleAttribute("disabled");
            });
            inputsArr[0].focus();
        }
    }
    const handleEditOff = (e) => {
        if(e.target.parentElement.id){
            e.target.parentElement.parentElement.classList.toggle("hidden");
            e.target.parentElement.parentElement.previousElementSibling.classList.toggle("hidden");
            const inputsCol = e.target.parentElement.parentElement.parentElement.previousElementSibling.children;
            const inputsArr = Array.from(inputsCol);
            inputsArr.forEach(input => {
                input.toggleAttribute("disabled");
            })
            const edited_note = {
                id : e.target.parentElement.id,
                title : inputsArr[0].value,
                content : inputsArr[1].value,
                priority : inputsArr[2].value
            }
            fetch(`${BASE_URL}/note`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${auth.token.token}`
                },
                body: JSON.stringify(edited_note)
            })
            .then(res => res.json())
            .then(data => {
                auth.setLoadingNotes(true);
            })
        }
    }

    //CARGAR TODAS LAS NOTAS:
    useEffect(() => {
        if(auth.loadingNotes){
            fetch(`${BASE_URL}/note/${auth.user._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + `Bearer ${auth.token.token}`
                }
            })
            .then(res => res.json())
            .then(res => {
                setNotes(res)
                auth.setLoadingNotes(false)
            })
        }
    },[auth.loadingNotes])


    return (
        <>
            {
                auth.loadingNotes 
                ?
                <Spinner />
                :
                notes.length > 0 
                ?
                notes.map( note =>
                    <form key={note._id} className={`${ note.priority === "today" ? 'note-card-today' : 'note-card-tomorrow' }`}>
                        <div>
                            <input className="note-card-input nci-title" type="text" name="title" defaultValue={note.title} disabled />
                            <textarea className="note-card-input nci-content" type="text" name="content" defaultValue={note.content} disabled/>
                            <input className="note-card-input nci-priority hidden" type="text" name="priority" defaultValue={note.priority} />
                        </div>
                        <div className="note-card-controlls">
                            <DeleteIcon className="note-card-controlls-icons" id={note._id} onClick={handleDeleteNote} />
                            <span className="">
                                <EditOffIcon className="note-card-controlls-icons edit-off-icon" id={note._id} onClick={handleEditOn} />
                            </span>
                            <span className="hidden">
                                <EditIcon className="note-card-controlls-icons edit-on-icon" id={note._id} onClick={handleEditOff} />
                            </span>
                        </div>
                    </form>
                )
                : 
                <div className="no-tasks">
                    <h4>There no tasks waiting.</h4>
                </div>
            }
        </>
    )
}
export default Notes;
