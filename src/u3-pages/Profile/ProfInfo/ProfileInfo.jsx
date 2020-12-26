import React from 'react'
import s from './ProfileInfo.module.css'
import {Preloader} from '../../../u2-components/common/preloader/Preloader'
import avatar from '../../../u1-assets/images/avatar.png'
import {ProfileStatusWithHooks} from './ProfileStatusWithHooks'

export const ProfileInfo = ({profile, status, updateOwnProfileStatus,isOwner, savePhoto}) => {

   if (!profile) {
      return <Preloader/>
   }
   const mainPhotoSelect = (e) => {
      if(e.target.files.length) {
         savePhoto(e.target.files[0])
      }
   }

   return (
       <div>
          <div className={s.descriptionBlock}>
             <div className={s.avatarImg}>
                <img alt='avatar' src={profile.photos.large || avatar}/>
             </div>
             {
                isOwner && <input type={'file'} onChange={mainPhotoSelect}/>
             }
             <div>
                <ProfileStatusWithHooks status={status}
                                        updateOwnProfileStatus={updateOwnProfileStatus}/>
             </div>
             <p>{profile.aboutMe}</p>
             <p>{profile.contacts.instagram}</p>
             <p>{profile.lookingForAJob}</p>
             <p>{profile.userId}</p>
             <p>{profile.lookingForAJobDescription}</p>
          </div>
       </div>
   )
}


