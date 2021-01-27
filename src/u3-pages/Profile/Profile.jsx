import React from 'react'
import {ProfileInfo} from './ProfInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'

import s from './Profile.module.css'

export const Profile = (props) => {
   return (
       <div className={s.content}>
          <ProfileInfo profile={props.profile}
                       status={props.status}
                       updateOwnProfileStatus={props.updateOwnProfileStatus}
                       savePhoto={props.savePhoto}
                       isOwner={props.isOwner}
                       saveProfile={props.saveProfile}
          />
          <MyPostsContainer/>
       </div>
   )
}


