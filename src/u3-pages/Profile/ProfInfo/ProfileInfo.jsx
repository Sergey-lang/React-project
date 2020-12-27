import React, {useState} from 'react'
import s from './ProfileInfo.module.css'
import {Preloader} from '../../../u2-components/common/preloader/Preloader'
import avatar from '../../../u1-assets/images/avatar.png'
import {ProfileStatusWithHooks} from './ProfileStatus/ProfileStatusWithHooks'
import {ProfileDataReduxForm} from './ProfileDataForm/ProfileDataForm'

export const ProfileInfo = ({profile, status, updateOwnProfileStatus, isOwner, savePhoto, saveProfile}) => {

   const [editMode, setEditMode] = useState(false)

   if (!profile) {
      return <Preloader/>
   }
   const mainPhotoSelect = (e) => {
      if (e.target.files.length) {
         savePhoto(e.target.files[0])
      }
   }

   const onSubmit = (formData) => {
      //if thunk resolver - change edit mode,otherwise show error message
      saveProfile(formData).then(
          () => setEditMode(false)
      )
      //console.log(formData) all data from form
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
                <div>
                   Status:
                   <ProfileStatusWithHooks status={status}
                                           updateOwnProfileStatus={updateOwnProfileStatus}/>
                </div>

             </div>
             {
                editMode
                    ? <ProfileDataReduxForm initialValues={profile}
                                            onSubmit={onSubmit}
                                            profile={profile}
                    />
                    : <ProfileData profile={profile}
                                   isOwner={isOwner}
                                   goToEditMode={setEditMode}
                    />
             }
          </div>
       </div>
   )
}

const ProfileData = ({profile, isOwner, goToEditMode}) => {
   return (
       <div>
          {
             isOwner && <div>
                <button onClick={() => goToEditMode(true)}>Edit Profile</button>
             </div>
          }

          <div>Full name: {profile.fullName}</div>
          <div>
             Looking For A Job: {profile.lookingForAJob ? 'yes' : 'no'}
          </div>
          {
             profile.lookingForAJob && <p>My professional skills: {profile.lookingForAJobDescription}</p>
          }
          <div>
             About Me: {profile.aboutMe}
          </div>
          <div>
             {profile.contacts.instagram}
          </div>
          <div>
             <b>Contacts</b>: {Object.keys(profile.contacts)
              .map((key, index) => {
                 return <Contact key={index}
                                 contactTitle={key}
                                 contactValue={profile.contacts[key]}/>
              })}
             <p>{profile.userId}</p>
          </div>
       </div>
   )
}

export const Contact = ({contactTitle, contactValue}) => {
   return (
       <div>
          {contactTitle}:{contactValue}
       </div>
   )
}




