import React from 'react'
import { Link } from 'react-router-dom';
import useAuth from '../../auth/useAuth';

const Header = () => {
    const auth = useAuth();

    const handleClick = () => {
        fetch("/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${auth.token.token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            auth.logout();
        })
    }

    return (
    <div className="dashboard-header">
        <div className="dashboard-header-logo-box">
            <h1>miNotes</h1>
        </div>
        <div className="dashboard-header-control-box">
            <Link className="dhcb-link" to='/'>Notes</Link>
            <Link className="dhcb-link" to='/user'>User</Link>
            <Link className="dhcb-link" to='/about'>About</Link>
            <button className="dhcb-link" onClick={handleClick}>Logout</button>
        </div>
    </div>
    )
}

export default Header;
