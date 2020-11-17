import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/preloader/Preloader';
import ProfileStatus from './ProfileStatus';

const ProfileInfo = (props) => {
   if (!props.profile) {
      return <Preloader/>
   }

   return (
      <div>
         <div className={s.descriptionBlock}>
            <img alt={'Images'} className={s.personalPhoto} src={props.profile.photos.large}/>
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

export default ProfileInfo;

