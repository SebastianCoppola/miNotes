import React from 'react'

const Header = () => {
    return (
    <div className="dashboard-header">
        <div className="dashboard-header-logo-box">
            <h1>miNotes</h1>
        </div>
        <div className="dashboard-header-control-box">
            <a href="#">Notes</a>
            <a href="#">User</a>
            <a href="#">About</a>
            <a href="#">Logout</a>
        </div>
    </div>
    )
}

export default Header;
