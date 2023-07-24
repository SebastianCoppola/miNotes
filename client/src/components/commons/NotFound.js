import React from 'react';
import { IconButton } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import BotonEvent from './BotonEvent';
import { useNavigate } from 'react-router-dom';


const NotFound = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }
    return (
        <div className='body'>
            <h2>Page Not Found</h2>
            <IconButton>
                <ErrorIcon fontSize="large" />
            </IconButton> <br />
            <BotonEvent variant="contained" color="success" value='GO BACK' handleClick={goBack}/>
        </div>
    )
}

export default NotFound;