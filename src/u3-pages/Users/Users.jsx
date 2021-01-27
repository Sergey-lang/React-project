import React from 'react'
import s from './Users.module.css'
import {Paginator} from '../../u2-components/common/Paginator/Paginator'
import {User} from './User/User'

export const Users = ({currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props}) => {

    return (
        <div className={s.users_wrapper}>
            <div className={s.paginator}>
                <Paginator currentPage={currentPage}
                           onPageChanged={onPageChanged}
                           totalItemsCount={totalUsersCount}
                           pageSize={pageSize}
                />
            </div>
            <div className={s.users}>
                {users.map((u, i) => <User user={u}
                                           followingInProgress={props.followingInProgress}
                                           key={`${u.id}_${i}`}
                                           unfollow={props.unfollow}
                                           follow={props.follow}/>)
                }
            </div>
        </div>
    )
}
