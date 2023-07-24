import React from 'react'
import useLang from '../../context/useLang';

const LoginHeader = () => {
    const lang = useLang();

    return (
    <div className="login-header">
        <p>{lang.texts.loginheader}</p>
        <div className="dashboard-header-control-box login-header-control-box ">
            <div className="lang-controlls">
                <button className="dhcb-link lang" onClick={lang.changeEs}>ES</button>
                <button className='dhcb-link lang'>|</button>
                <button className="dhcb-link lang" onClick={lang.changeEn}>EN</button>
            </div>
        </div>
    </div>
    )
}

export default LoginHeader;
