import React from 'react';
import s from './Users.module.css';
import {Paginator} from "../../u2-components/common/Paginator/Paginator";
import {User} from "./User/User";

export const Users = ({currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props}) => {

    return (
        <div className={s.users_wrapper}>
            <Paginator currentPage={currentPage}
                       onPageChanged={onPageChanged}
                       totalUsersCount={totalUsersCount}
                       pageSize={pageSize}
            />

            {users.map(u => <User user={u}
                                  followingInProgress={props.followingInProgress}
                                  key={u.id}
                                  unfollow={props.unfollow}
                                  follow={props.follow}/>)
            }
        </div>
    )
}
