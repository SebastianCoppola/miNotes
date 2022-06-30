import React from 'react'
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';


export const UserCard = ({name, surname}) => {
    return (
        <div className="profile-card">
            <div className="profile-card-header">
                <PermContactCalendarIcon className="profile-logo" fontSize="large" />
                <h4 className="profile-name"> Hi {name} {surname}!</h4>
            </div>
            <div className="profile-card-body">
                <p className="profile-p"> These are your notes for today. <br/><br/> Today's notes will be automatically deleted by the end of the day. Procastination is your worst enemy!</p>
            </div>
        </div>
    )
}

export default UserCard;