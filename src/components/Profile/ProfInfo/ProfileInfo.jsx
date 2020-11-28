import React from 'react';
import s from './ProfileInfo.module.css';
import {Preloader} from '../../common/preloader/Preloader';
import ProfileStatus from './ProfileStatus';
import avatar from './../../../asets/images/avatar.png'

export const ProfileInfo = (props) => {
   if (!props.profile) {
      return <Preloader/>
   }

   return (
      <div>
         <div className={s.descriptionBlock}>
            <div className={s.avatarImg}>
               <img alt='avatar' src={props.profile.photos.large ? props.profile.photos.large : avatar}/>
            </div>
            <div>
               <ProfileStatus status={props.status} updateOwnProfileStatus={props.updateOwnProfileStatus}/>
            </div>
            <p>{props.profile.aboutMe}</p>
            <p>{props.profile.contacts.instagram}</p>
            <p>{props.profile.lookingForAJob}</p>
            <p>{props.profile.userId}</p>
            <p>{props.profile.lookingForAJobDescription}</p>
         </div>
      </div>
   )
}


