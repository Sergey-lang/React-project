import React from 'react';
import s from './Users.module.css';
import userPhoto from '../../asets/images/user.png'
import {NavLink} from 'react-router-dom';


let Users = (props) => {
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
                                     //give this to thunk in users-reducer
                                     // props.toggleFollowingProgress(true, u.id);
                                     // usersAPI.unfollow(u.id)
                                     //     .then(response => {
                                     //         if (response.resultCode == 0) {
                                     //             props.unfollow(u.id);
                                     //         }
                                     //         props.toggleFollowingProgress(false, u.id);
                                     //     })
                                     //old request for delete
                                     // axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                     //     withCredentials: true,
                                     //     headers: {
                                     //         'API-KEY': 'be9a3549-d8d6-4d97-a73c-6593dde1f694'}})
                                  }}>Unfollow</button>
                        :
                        <button disabled={props.followingInProgress.some(id => id === u.id)} className={s.follow_button}
                                onClick={() => {
                                   props.follow(u.id)
                                   //give this to thunk in users-reducer
                                   // props.toggleFollowingProgress(true, u.id);
                                   // usersAPI.follow(u.id)
                                   // .then(response => {
                                   //         if (response.resultCode == 0) {
                                   //             props.follow(u.id);
                                   //         }
                                   //         props.toggleFollowingProgress(false, u.id);
                                   //     })
                                   //old request for post
                                   // axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,{}, {
                                   //     withCredentials: true,
                                   //     headers: {
                                   //         'API-KEY': 'be9a3549-d8d6-4d97-a73c-6593dde1f694'
                                   //     }})
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

export default Users;