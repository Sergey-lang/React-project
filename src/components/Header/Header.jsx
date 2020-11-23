import React from 'react';
import s from './Header.module.css';
import {NavLink} from 'react-router-dom';

export const Header = (props) => {
   return (
      <header className={s.header}>
         <img alt={'header'} src="https://img.icons8.com/carbon-copy/100/000000/minecraft-logo.png"/>
         <div className={s.logo_name}>Social netWork</div>
         <div className={s.login}>
            {props.isAuth
               ? <div> {props.login} - <button onClick={props.logout}>logout</button></div>
               : <NavLink to={'/login'}>Login</NavLink>}
         </div>
      </header>
   )
}


