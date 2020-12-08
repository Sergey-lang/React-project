import React from 'react';
import s from './User.module.css';
import userPhoto from '../../../u1-assets/images/user.png'
import {NavLink} from 'react-router-dom';

export const User = ({user, followingInProgress, unfollow, follow, ...props}) => {

    return (
        <div>
            <div>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img alt={'user'} className={s.avatar}
                             src={user.photos.small != null ? user.photos.small : userPhoto}/>
                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button disabled={followingInProgress.some(id => id === user.id)}
                                  className={s.unfollow_button}
                                  onClick={() => {
                                      unfollow(user.id)
                                  }}>Unfollow</button>
                        :
                        <button disabled={followingInProgress.some(id => id === user.id)}
                                className={s.follow_button}
                                onClick={() => {
                                    follow(user.id)
                                }}>Follow</button>}
                </div>
            </div>
            <div>
                <div>{user.name}</div>
                <div>{user.status}</div>
            </div>
        </div>
    )
}

