import React, { useState, useEffect } from 'react';
import Spinner from '../commons/Spinner';
import useAuth from '../../context/useAuth';
import useLang from '../../context/useLang';

const User = () => {
    const [loading, setLoading] = useState(true);
    const auth = useAuth();
    const lang = useLang();

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
                        <h3>{lang.texts.userform1}</h3>
                        <p>{lang.texts.userform2}</p>
                    </div>
                    <form onSubmit={handleSave} className="user-info-form">
                        <label>{lang.texts.userform3}</label>
                        <input className="" name="name" defaultValue={auth.user.name} required />
                        <label>{lang.texts.userform4}</label>
                        <input className="" name="surname" defaultValue={auth.user.surname} required />
                        <label>{lang.texts.userform5}</label>
                        <input className="" name="mail" defaultValue={auth.user.mail} required />
                        <label>{lang.texts.userform6}</label>
                        <input className="" name="password" required />
                        <div className="user-info-form-controlls">
                            <button type="submit">{lang.texts.userform7}</button>
                            <button onClick={handleDelete}>{lang.texts.userform8}</button>
                        </div>
                    </form>
                </div>
            }
        </>
    )
}

export default User;
