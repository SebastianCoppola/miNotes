import React from 'react'
import { Link } from 'react-router-dom';
import useAuth from '../../context/useAuth';
import useLang from '../../context/useLang';
import { BASE_URL } from '../../utils/url';

const Header = () => {
    const auth = useAuth();
    const lang = useLang();

    const handleClick = () => {
        fetch(`${BASE_URL}/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${auth.token.token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            auth.logout();
        })
    }

    return (
    <div className="dashboard-header">
        <div className="dashboard-header-logo-box">
            <h1>miNotes</h1>
        </div>
        <div className="dashboard-header-control-box">
            <Link className="dhcb-link" to='/'>{lang.texts.navnotes}</Link>
            <Link className="dhcb-link" to='/user'>{lang.texts.navuser}</Link>
            <Link className="dhcb-link" to='/about'>{lang.texts.navabout}</Link>
            <button className="dhcb-link" onClick={handleClick}>{lang.texts.navlogout}</button>
            <div className="lang-controlls">
                <button className="dhcb-link lang" onClick={lang.changeEs}>ES</button>
                <button className='dhcb-link lang'>|</button>
                <button className="dhcb-link lang" onClick={lang.changeEn}>EN</button>
            </div>
            
        </div>
    </div>
    )
}

export default Header;
