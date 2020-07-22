import React from "react";
import s from './Users.module.css';
import userPhoto from '../../asets/images/user.png'
import { NavLink } from 'react-router-dom';
import * as axios from 'axios';

let Users = (props) => {
    //вычисляем кол-во страниц для отрисовки
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        {
            pages.push(i);
        }
    }

    return (
        <div className={s.users_wrapper}>
            <div>
                {pages.map(p => {
                    return <span className={props.currentPage === p && s.selectPage}
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
                                <img className={s.avatar} src={u.photos.small != null ? u.photos.small : userPhoto} />
                            </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button className={s.unfollow_button} onClick={() => {
                                    axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                        withCredentials: true,
                                        headers: {
                                            'API-KEY': 'df7067be-2d31-4254-bfe8-1f6d53d6c9b4'
                                        }
                                    })
                                        .then(response => {
                                            if (response.data.resultCode == 0) {
                                                props.unfollow(u.id);
                                            }
                                        })
                                }}>Unfollow</button>
                                : <button className={s.follow_button} onClick={() => {
                                    axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                        withCredentials: true,
                                        headers: {
                                            'API-KEY': 'df7067be-2d31-4254-bfe8-1f6d53d6c9b4'
                                        }
                                    })
                                        .then(response => {
                                            if (response.data.resultCode == 0) {
                                                props.follow(u.id);
                                            }
                                        })
                                }}>Follow</button>}
                        </div>
                    </div>
                    <div>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </div>
                    <div>
                        <div>{"u.location.city"}</div>
                        <div>{"u.location.country"}</div>
                    </div>
                </div>)
            }
        </div>
    )
}

export default Users;