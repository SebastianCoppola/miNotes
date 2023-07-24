import React from 'react'
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../context/useAuth';
import useLang from '../../context/useLang';
import usePasswordToggle from '../../hooks/usePasswordToggle';
import { CircularProgress, Modal } from '@mui/material';

export default function LoginForm() {
    const auth = useAuth();
    const navigate = useNavigate();
    const warningsLogin = useRef();
    const forgottenPassword = useRef();
    const [PasswordInputType, ToggleIcon] = usePasswordToggle();
    const [loading, setLoading] = useState(false)
    const lang = useLang();
    //LOGIN:
    const handleLogin = (e) => {
        setLoading(true)
        e.preventDefault();
        const user = { mail: e.target.mail.value, password: e.target.password.value };
        fetch("/login", {
            method: 'POST',
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => {
            if(res.status === 200){
                res.json()
                .then(res => {
                    auth.login();
                    navigate('/');
                    window.location.reload();
                })
            }else if(res.status === 401){
                res.json()
                .then(res => {
                    warningsLogin.current.innerHTML = lang.texts.login7a;
                    forgottenPassword.current.hidden = false;
                    forgottenPassword.current.id = res.mail;
                })
            }else{
                res.json()
                .then(res => {
                    forgottenPassword.current.hidden = true;
                    warningsLogin.current.innerHTML = res.message;
                })
            }
        })

    }
    const handleFortgotenPassword = (e) => {
        const mail = {mail: e.target.id};
        fetch("/login/resetPassword", {
            method: 'POST',
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(mail)
        })
        .then(res => {
            if ( res.status === 200){
                res.json()
                .then(res => {
                    console.log(res.message);
                    warningsLogin.current.innerHTML = lang.texts.login7b;
                    forgottenPassword.current.hidden = true;
                })
            } else {
                console.log(res.message);
                warningsLogin.current.innerHTML = "Server Problems. Try again later.";
                forgottenPassword.current.hidden = true;
            }
        })
    }

    //CREATE USER:
    const [messageH2, setMessageH2] = useState('');
    const [messageP, setMessageP] = useState('');
    const [modalCU, setModalCU] = useState(false);
    const [modalThanks, setModalThanks] = useState(false);
    const warningsSignUp = useRef();
    const openCloseModalCU = (e) => {
        e.preventDefault();
        setModalCU(!modalCU);
    }
    const openCloseModalThanks = (status) => {
        setModalThanks(true);
        if(status === 200){
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
            if(res.status === 409){
                warningsSignUp.current.innerHTML = lang.texts.register8;  
            } else if (res.status === 400){
                setMessageH2(lang.texts.register9);
                setMessageP(lang.texts.register10)
                openCloseModalThanks(res.status);
            } else if (res.status === 500){
                setMessageH2(lang.texts.register9);
                setMessageP(lang.texts.register11);
                openCloseModalThanks(res.status);
            } else if (res.status === 200){
                setMessageH2(lang.texts.register12);
                setMessageP(lang.texts.register13);
                openCloseModalThanks(res.status)
            }
        })
    }
    const modalCreateUser = (
        <div className='modal-page'>
            <div className='modal-box'>
                <h2>{lang.texts.register1}</h2>
                <form onSubmit={handleCreate} className="modal-form">
                    <input type="text" placeholder={lang.texts.register2} name="name" required/>
                    <input type="text" placeholder={lang.texts.register3} name="surname" required/>
                    <input type="text" placeholder={lang.texts.register4} name="mail" required/>
                    <input type="text" placeholder={lang.texts.register5} name="password" required/>
                    <p className="warnings-sigup" ref={warningsSignUp}></p>
                    <div className="modal-controllers">
                        <button>{lang.texts.register6}</button>
                        <button onClick={openCloseModalCU}>{lang.texts.register7}</button>
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
        <div className='login-body-right'>
            <div className='login-box'>
                {loading ? 
                    <CircularProgress />
                :
                    <>
                        <form className='login-form' onSubmit={handleLogin}>
                            <h4>{lang.texts.login1}</h4>
                            <div className="input-group">
                                <input type='text' name='mail' placeholder={lang.texts.login2}/>
                            </div>
                            <div className="input-group">
                                <input type={PasswordInputType} name='password' placeholder={lang.texts.login3} />
                                <span className="password-toggle-icon">{ToggleIcon}</span>
                            </div>
                            <div className="warnings-box">
                                <p className="warnings-p" ref={warningsLogin}></p>
                                <button className="warnings-button" 
                                    type='button'
                                    ref={forgottenPassword} 
                                    onClick={handleFortgotenPassword}
                                    hidden>{lang.texts.login8}</button>
                            </div>
                            <button type='submit' className='submit'>{lang.texts.login4}</button>
                        </form>
                        <div className="signup-controlls">
                            <p><i>{lang.texts.login5}</i></p>
                            <button type='button' onClick={openCloseModalCU}>{lang.texts.login6}</button>
                        </div>
                    </>
                }
                
                <Modal open={modalCU} onClose={openCloseModalCU}>{modalCreateUser}</Modal>
                <Modal open={modalThanks} onClose={openCloseModalThanks}>{modalThanksForRegistering}</Modal>
                
            </div>
        </div>
    )
}