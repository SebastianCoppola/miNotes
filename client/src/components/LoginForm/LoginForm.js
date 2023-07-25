import React, { useState, useRef } from 'react'
import useAuth from '../../context/useAuth'
import useLang from '../../context/useLang'
import usePasswordToggle from '../../hooks/usePasswordToggle'
import { useNavigate } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import { BASE_URL } from '../../utils/url'
import CreateUserModal from '../Register/CreateUserModal'
import ThanksModal from '../Register/ThanksModal'

export default function LoginForm() {
    const navigate = useNavigate()
    const auth = useAuth()
    const lang = useLang()
    const warningsLogin = useRef()
    const forgottenPassword = useRef()
    const [PasswordInputType, ToggleIcon] = usePasswordToggle()
    const [loading, setLoading] = useState(false)
    
    //LOGIN:
    const handleLogin = (e) => {
        e.preventDefault()
        setLoading(true)
        let user = { mail: e.target.mail.value, password: e.target.password.value }
        fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { "content-type" : "application/json"},
            body: JSON.stringify(user)
        })
        .then(res => {
            if(res.status === 200){
                res.json()
                .then(res => {
                    console.log(res)
                    auth.setToken('token', res.token)
                    // auth.login()
                    navigate('/')
                    window.location.reload()
                })
            }else if(res.status === 401){
                res.json()
                .then(res => {
                    warningsLogin.current.innerHTML = lang.texts.login7a
                    forgottenPassword.current.hidden = false
                    forgottenPassword.current.id = res.mail
                })
            }else{
                res.json()
                .then(res => {
                    forgottenPassword.current.hidden = true
                    warningsLogin.current.innerHTML = res.message
                })
            }
        })

    }
    const handleFortgotenPassword = (e) => {
        const mail = {mail: e.target.id};
        fetch(`${BASE_URL}/login/resetPassword`, {
            method: 'POST',
            headers: {"content-type" : "application/json"},
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
    
    const openCloseModalCU = (e) => {
        e.preventDefault()
        setModalCU(!modalCU)
    }

    const openCloseModalThanks = (status) => {
        setModalThanks(true)
        if(status === 200){
            setTimeout(() => { window.location.reload() }, 3000)
        }else{
            setTimeout(() => { setModalThanks(false) }, 3000)
        }
    }

    



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
                
                <CreateUserModal 
                    modalCU={modalCU} 
                    openCloseModalCU={openCloseModalCU} 
                    setMessageH2={setMessageH2}
                    setMessageP={setMessageP}
                    openCloseModalThanks={openCloseModalThanks}
                />
                <ThanksModal 
                    modalThanks={modalThanks} 
                    openCloseModalThanks={openCloseModalThanks} 
                    messageH2={messageH2}
                    messageP={messageP}
                />
            </div>
        </div>
    )
}