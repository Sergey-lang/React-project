import React from 'react';
import s from './User.module.css';
import userPhoto from '../../../u1-assets/images/user.png'
import {NavLink} from 'react-router-dom';
import {Button} from 'antd';

export const User = ({user, followingInProgress, unfollow, follow, ...props}) => {

    return (
        <div className={s.userBlock}>
            <div>
                <NavLink to={'/profile/' + user.id}>
                    <img alt={'user'} className={s.avatar}
                         src={user.photos.small != null ? user.photos.small : userPhoto}/>
                </NavLink>
            </div>
            <div>
                <div className={s.userName}>{user.name}</div>
            </div>
            <div>
                {user.followed
                    ? <Button disabled={followingInProgress.some(id => id === user.id)}
                              className={s.unfollow_button}
                              onClick={() => {
                                  unfollow(user.id)
                              }}>Unfollow</Button>
                    :
                    <Button disabled={followingInProgress.some(id => id === user.id)}
                            className={s.follow_button}
                            onClick={() => {
                                follow(user.id)
                            }}>Follow</Button>}
            </div>
        </div>
    )
}

