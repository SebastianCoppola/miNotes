import React, { useEffect, useState } from 'react'
import useAuth from '../../context/useAuth';
import useLang from '../../context/useLang';


const CreateNote = () => {
    const auth = useAuth();
    const lang = useLang();

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
            <h4>{lang.texts.crearnotatitle}</h4>
            <input className="create-note-input" type="text" maxLength="18" name="title" placeholder={lang.texts.crearnotainput1} />
            <input className="create-note-input" type="text" maxLength="60" name="content" placeholder={lang.texts.crearnotainput2} />
            <div className="create-note-priority">
                <input className="create-note-radio" type="radio" name="priority" value="today" required />
                <label className="create-note-label">{lang.texts.crearnotadue1a}<mark className="today-label">{lang.texts.crearnotadue1b}</mark>.</label><br />
            </div>
            <div className="create-note-priority">
                <input className="create-note-radio" type="radio" name="priority" value="tomorrow" required />
                <label className="create-note-label">{lang.texts.crearnotadue2a}<mark className="tomorrow-label">{lang.texts.crearnotadue2b}</mark>.</label>
            </div>
            <button>{lang.texts.crearnotasave}</button>
        </form>
    )
}

export default CreateNote;
