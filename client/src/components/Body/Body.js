import React from 'react'
import useAuth from '../../context/useAuth'
import {Outlet} from 'react-router-dom'
import UserCard from '../UserCard/UserCard'
import CreateNote from '../CreateNote/CreateNote'

const Body = () => {

    const auth = useAuth()

    return (
        <div className="dashboard-body">
            <div className="dashboard-body-left">
                <UserCard 
                    name={auth && auth.user && auth.user.name} 
                    surname={auth && auth.user && auth.user.surname} 
                />
                <CreateNote />
            </div>
            <div className="dashboard-body-right">
                <Outlet />
            </div>
        </div>
    )
}

export default Body;
