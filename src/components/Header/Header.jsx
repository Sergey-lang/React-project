import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return (
        <header className={s.header}>
            <img alt={'header'} src="https://img.icons8.com/carbon-copy/100/000000/minecraft-logo.png" />
            <div className={s.logo_name}>Social netWork</div>
            <div className={s.login}>
                {props.isAuth ? props.login:<NavLink to={'/login'}>Login</NavLink>}
                
            </div>
        </header>
    )
}

export default Header;

