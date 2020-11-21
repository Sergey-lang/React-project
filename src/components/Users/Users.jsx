import React from 'react';
import s from './Users.module.css';
import userPhoto from '../../asets/images/user.png'
import {NavLink} from 'react-router-dom';

export const Users = (props) => {
   let pages = []
   for (let i = 505; i <= 525; i++) {
      pages.push(i)
   }

   return (
      <div className={s.users_wrapper}>
         <div>
            {pages.map(p => {
               return <span key={p.id} className={props.currentPage === p && s.selectPage}
                            onClick={(e) => {
                               props.onPageChanged(p);
                            }}>{p}</span>
            })}
         </div>
         {
            props.users.map(u => <div key={u.id}>
               <div className={s.user}>
                  <div>
                     <NavLink to={'/profile/' + u.id}>
                        <img alt={'user'} className={s.avatar}
                             src={u.photos.small != null ? u.photos.small : userPhoto}/>
                     </NavLink>
                  </div>
                  <div>
                     {u.followed
                        ? <button disabled={props.followingInProgress.some(id => id === u.id)}
                                  className={s.unfollow_button}
                                  onClick={() => {
                                     props.unfollow(u.id)
                                  }}>Unfollow</button>
                        :
                        <button disabled={props.followingInProgress.some(id => id === u.id)} className={s.follow_button}
                                onClick={() => {
                                   props.follow(u.id)
                                }}>Follow</button>}
                  </div>
               </div>
               <div>
                  <div>{u.name}</div>
                  <div>{u.status}</div>
               </div>
               <div>
                  <div>{'u.location.city'}</div>
                  <div>{'u.location.country'}</div>
               </div>
            </div>)
         }
      </div>
   )
}
