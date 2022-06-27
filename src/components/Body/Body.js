import React from 'react'
import { useState, useEffect } from 'react';
import useAuth from '../../auth/useAuth';
// ICONS
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Body = () => {

    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const auth = useAuth();

    //CREATE NOTE:
    const handleSubmit = (e) => {
        e.preventDefault()
        const new_note = {
            userId : auth.user._id,
            title : e.target.title.value,
            content : e.target.content.value,
            priority : e.target.priority.value
        }
        fetch("/note", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${auth.token.token}`
            },
            body: JSON.stringify(new_note)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setLoading(true)
        })
    }

    //DELETE NOTE:
    const handleDelete = (e) => {
        const id = { "id" : e.target.id };
        fetch("/note", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${auth.token.token}`
            },
            body: JSON.stringify(id)
        })
        .then(res => res.json())
        .then(res => setLoading(true))
    }

    //EDIT-PRODUCT MODAL:
    const [modalEN, setModalEN] = useState(false);
    const [noteId, setNoteId] = useState();
    const [noteInfo, setNoteInfo] = useState({
        title : null,
        content : null,
        priority : null
    });
    // const getNoteInfo = (id) => {
    //     const filteredNote = Object.values(notes).filter( note => note._id === id );
    //     setNoteInfo(filteredNote[0])
    // }
    const openModalEN = (e) => {
        e.preventDefault();
        setModalEN(true);
        // setNoteId(e.target.id);
        // getNoteInfo(e.target.id);
    }
    const closeModalEN = (e) => {
        e.preventDefault();
        setModalEN(false);
    }
    const handleEdit = (e) => {
        e.preventDefault();
        console.log("edited")
        // const edited_note = {
        //     id : noteId,
        //     title : e.target.title.value,
        //     content : e.target.content.value,
        //     priority : e.target.priority.value
        // }
        // fetch("/notes", {
        //     method: 'PUT',
        //     headers: {
        //         "content-type" : "application/json",
        //         "Authorization" : `Bearer ${auth.token.token}`
        //     },
        //     body: JSON.stringify(edited_note)
        // })
        // .then(() => setLoading(true));
    }
    const modalEditNote = (
        <div className='modal-box'>
            <h2>Edit Note</h2>
            <form onSubmit={handleEdit} className="modal-form">
                <input type="text" placeholder="Title" name="title" defaultValue={noteInfo.title}/>
                <input type="text" placeholder="Content" name="description" defaultValue={noteInfo.content} />
                <select name="priority" defaultValue={noteInfo.priority}>
                    <option value="today">Must do it today</option>
                    <option value="tomorrow">Can do it tomorrow</option>
                </select>
                <div className="modal-controllers">
                    <button>SAVE</button>
                    <button onClick={closeModalEN} id="cancel">CANCEL</button>
                </div>
            </form>
        </div>
    )

    //CARGAR TODAS LAS NOTAS:
    useEffect(() => {
        if(loading){
            fetch(`/note/${auth.user._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + `Bearer ${auth.token.token}`
                    }
            })
            .then(res => res.json())
            .then(res => {
                setNotes(res)
                setLoading(false)
            })
        }
    },[loading])
    return (
        <div className="dashboard-body">
            <div className="dashboard-body-left">
                <div className="profile-card">
                    <div className="profile-card-header">
                        <PermContactCalendarIcon className="profile-logo" fontSize="large" />
                        <h4 className="profile-name"> Hi {auth.user.name} {auth.user.surname}!</h4>
                    </div>
                    <div className="profile-card-body">
                        <p className="profile-p"> These are your tasks for today. Tomorrow you will only find the green ones.</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="create-note">
                    <h4>Create a Note</h4>
                    <input className="create-note-input" type="text" name="title" placeholder='Title' />
                    <input className="create-note-input" type="text" name="content" placeholder='Content' />
                    <div className="create-note-priority">
                        <input className="create-note-radio" type="radio" name="priority" value="today" required />
                        <label className="create-note-label">Must do it today</label><br />
                    </div>
                    <div className="create-note-priority">
                        <input className="create-note-radio" type="radio" name="priority" value="tomorrow" required />
                        <label className="create-note-label">Can do it tomorrow</label>
                    </div>
                    <button>Save Note</button>
                </form>
            </div>
            <div className="dashboard-body-right">
                {
                    notes.length > 0 ?
                    notes.map( note =>
                            <form className="note-card" key={note._id}>
                                <div>
                                    <input className="note-card-input nci-title" type="text" name="title" value={note.title} disabled/>
                                    <input className="note-card-input nci-content" type="text" name="content" value={note.content} disabled/>
                                    <input className="note-card-input nci-priority" type="text" name="content" value={note.priority} disabled/>
                                </div>
                                <div className="note-card-controlls">
                                    <button id={note._id} onClick={handleDelete}><DeleteIcon /></button>
                                    <button id={note._id} onClick={openModalEN}><EditIcon /></button>
                                </div>
                            </form>
                    )
                    : "...cargando"
                }
            </div>
        </div>
    )
}

export default Body;
