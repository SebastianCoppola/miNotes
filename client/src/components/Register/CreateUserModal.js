import { Modal } from '@mui/material'
import React, { useRef } from 'react'
import useLang from '../../context/useLang'
import { BASE_URL } from '../../utils/url'

const CreateUserModal = ({modalCU, openCloseModalCU, openCloseModalThanks, setMessageH2, setMessageP}) => {
    const lang = useLang()
    const warningsSignUp = useRef()

    const handleCreate = (e) => {
        e.preventDefault()
        const new_user = {
            name : e.target.name.value,
            surname : e.target.surname.value,
            mail : e.target.mail.value,
            password : e.target.password.value
        }
        fetch(`${BASE_URL}/user`, {
            method: 'POST',
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(new_user)
        })
        .then( res => {
            if(res.status === 409){
                warningsSignUp.current.innerHTML = lang.texts.register8  
            } else if (res.status === 400){
                setMessageH2(lang.texts.register9)
                setMessageP(lang.texts.register10)
                openCloseModalThanks(res.status)
            } else if (res.status === 500){
                setMessageH2(lang.texts.register9)
                setMessageP(lang.texts.register11)
                openCloseModalThanks(res.status)
            } else if (res.status === 200){
                setMessageH2(lang.texts.register12)
                setMessageP(lang.texts.register13)
                openCloseModalThanks(res.status)
            }
        })
    }

    return (
        <Modal open={modalCU} onClose={openCloseModalCU}>
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
        </Modal>
    )
}

export default CreateUserModal