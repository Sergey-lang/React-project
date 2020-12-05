import React from 'react';
import s from './ProfileInfo.module.css';
import {Preloader} from '../../../u2-components/common/preloader/Preloader';
import avatar from '../../../u1-assets/images/avatar.png'
import {ProfileStatusWithHooks} from './ProfileStatusWithHooks';

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
               <ProfileStatusWithHooks status={props.status} updateOwnProfileStatus={props.updateOwnProfileStatus}/>
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


