import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import useAuth from '../../auth/useAuth'


export default function LoginForm() {
    const auth = useAuth();
    const navigate = useNavigate();

    //LOGIN:
    const handleLogin = (e) => {
        e.preventDefault();
        const user = { mail: e.target.mail.value, password: e.target.password.value };
        fetch("/login", {
            method: 'POST',
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            auth.login();
            navigate('/');
            window.location.reload();
        })
    }

    //CREATE USER:
    const [messageH2, setMessageH2] = useState('');
    const [messageP, setMessageP] = useState('');
    const [modalCU, setModalCU] = useState(false);
    const [modalThanks, setModalThanks] = useState(false);
    const openCloseModalCU = (e) => {
        e.preventDefault();
        setModalCU(!modalCU);
    }
    const openCloseModalThanks = (status) => {
        setModalThanks(true);
        if(status == 200){
            setTimeout(() => {
                window.location.reload();
            },3000);
        }else{
            setTimeout(() => {
                setModalThanks(false);
            },3000);
        }
    }
    const handleCreate = (e) => {
        e.preventDefault();
        const new_user = {
            name : e.target.name.value,
            surname : e.target.surname.value,
            mail : e.target.mail.value,
            password : e.target.password.value
        }
        fetch("/user", {
            method: 'POST',
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(new_user)
        })
        .then( res => {
            if(res.status == "409"){
                setMessageH2('Error');
                setMessageP("This email has already been registered");
                openCloseModalThanks(res.status);
            } else if (res.status == 400){
                setMessageH2('Error');
                setMessageP("Your information is invalid")
                openCloseModalThanks(res.status);
            } else if (res.status == 500){
                setMessageH2('Error');
                setMessageP("Server Error. Please try again later");
                openCloseModalThanks(res.status);
            } else if (res.status == 200){
                setMessageH2('Thank you for registering');
                setMessageP("Please login to start tasking you day");
                openCloseModalThanks(res.status)
            }
        })
    }
    const modalCreateUser = (
        <div className='modal-page'>
            <div className='modal-box'>
                <h2>Register</h2>
                <form onSubmit={handleCreate} className="modal-form">
                    <input type="text" placeholder="Name" name="name" required/>
                    <input type="text" placeholder="Last Name" name="surname" required/>
                    <input type="text" placeholder="E-Mail" name="mail" required/>
                    <input type="text" placeholder="Password" name="password" required/>
                    <div className="modal-controllers">
                        <button>SAVE</button>
                        <button onClick={openCloseModalCU}>CANCEL</button>
                    </div>
                </form>    
            </div>
        </div>
    )
    const modalThanksForRegistering = (
        <div className='modal-page'>
            <div className='modal-box'>
                <h2>{messageH2}</h2>
                <p>{messageP}</p>   
            </div>
        </div>
    )

    return (
        <div className='login-page'>
            <div className="login-page-left">
                <h1>miNotes</h1>
            </div>

            <div className='login-page-right'>
                <div className='login-box'>
                    <form className='login-form' onSubmit={handleLogin}>
                        <h4>Please Sign In to Access</h4>
                        <input type='text' name='mail' placeholder='E-Mail' />
                        <input type='text' name='password' placeholder='Password' />
                        <button className='submit'>Sign In</button>
                    </form>
                    <div className="signup-controlls">
                        <p><i>First time here?</i></p>
                        <button onClick={openCloseModalCU}>Register</button>
                    </div>
                    <Modal open={modalCU} onClose={openCloseModalCU}>{modalCreateUser}</Modal>
                    <Modal open={modalThanks} onClose={openCloseModalThanks}>{modalThanksForRegistering}</Modal>
                </div>
            </div>
        </div>
    )
}