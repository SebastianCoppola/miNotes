import React, { useEffect, useState } from 'react'
import useAuth from '../../auth/useAuth';


const CreateNote = () => {
    const auth = useAuth();

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
            auth.setLoadingNotes(true);
        })
    }

    return (
        <form onSubmit={handleSubmit} className="create-note">
            <h4>Create a Note</h4>
            <input className="create-note-input" type="text" maxLength="18" name="title" placeholder='Title' />
            <input className="create-note-input" type="text" maxLength="60" name="content" placeholder='Details' />
            <div className="create-note-priority">
                <input className="create-note-radio" type="radio" name="priority" value="today" required />
                <label className="create-note-label">Due Today</label><br />
            </div>
            <div className="create-note-priority">
                <input className="create-note-radio" type="radio" name="priority" value="tomorrow" required />
                <label className="create-note-label">Due Tomorrow</label>
            </div>
            <button>Save Note</button>
        </form>
    )
}

export default CreateNote;
