import { Modal } from '@mui/material'
import React from 'react'
import useLang from '../../context/useLang'

const ThanksModal = ({modalThanks, openCloseModalThanks, messageH2, messageP}) => {
    const lang = useLang()

    return (
        <Modal open={modalThanks} onClose={openCloseModalThanks}>
            <div className='modal-page'>
                <div className='modal-box'>
                    <h2>{messageH2}</h2>
                    <p>{messageP}</p>   
                </div>
            </div>
        </Modal>
    )
}

export default ThanksModal