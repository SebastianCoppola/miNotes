import React, { useState, useEffect } from 'react';
import Spinner from '../commons/Spinner';
import useAuth from '../../auth/useAuth';

const User = () => {
    const [loading, setLoading] = useState(true);
    const auth = useAuth()

    useEffect(()=>{
        setLoading(false);
    })
    
    //SAVE USER INFO
    const handleSave = (e) => {
        e.preventDefault();
        const new_user = {
            id : auth.user._id,
            name : e.target.name.value,
            surname : e.target.surname.value,
            mail : e.target.mail.value,
            password : e.target.password.value
        }
        fetch("/user", {
            method: 'PUT',
            headers: {
                "content-type" : "application/json",
                "Authorization" : `Bearer ${auth.token.token}`
            },
            body: JSON.stringify(new_user)
        })
        .then( () => { 
            auth.logout();
        })
    }
    //DELETE USER
    const handleDelete = (e) => {
        e.preventDefault();
        const id = { "id" : auth.user._id };
        fetch("/user", {
            method: 'DELETE',
            headers: {
                "content-type" : "application/json",
                "Authorization" : `Bearer ${auth.token.token}`
            },
            body: JSON.stringify(id)
        })
        .then( res => { 
            res.json();
        })
        .then( res => {
            console.log(res);
            auth.logout();
        })
    }

    return (
        <>
            {
                loading 
                ?
                <Spinner />
                :
                <div className="user-info">
                    <div className="user-info-header">
                        <h3>Your Personal Information</h3>
                        <p>Any change will require you to login again.</p>
                    </div>
                    <form onSubmit={handleSave} className="user-info-form">
                        <label>Name</label>
                        <input className="" name="name" defaultValue={auth.user.name} required />
                        <label>Last Name</label>
                        <input className="" name="surname" defaultValue={auth.user.surname} required />
                        <label>E-mail</label>
                        <input className="" name="mail" defaultValue={auth.user.mail} required />
                        <label>Password</label>
                        <input className="" name="password" required />
                        <div className="user-info-form-controlls">
                            <button type="submit">Save changes</button>
                            <button onClick={handleDelete}>Delete Account</button>
                        </div>
                    </form>
                </div>
            }
        </>
    )
}

export default User;
