import React from 'react'
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import useLang from '../../context/useLang';


export const UserCard = ({name, surname}) => {
    const lang = useLang();

    return (
        <div className="profile-card">
            <div className="profile-card-header" style={{margin:0}}>
                <PermContactCalendarIcon className="profile-logo" fontSize="large" />
                <h4 className="profile-name"> {lang.texts.hi} {name}!</h4>
            </div>
            <div className="profile-card-body" style={{margin:0}}>
                <p className="profile-p-1"> {lang.texts.hip1} </p>
                <p className="profile-p-2"> {lang.texts.hip2} </p>
            </div>
        </div>
    )
}

export default UserCard;