import React from 'react'
import {CreateField, Input, Textarea} from '../../../../u2-components/common/FormsControls/FormControls'
import {reduxForm} from 'redux-form'
import s from '../../../Login/Login.module.css'

export const ProfileDataForm = ({handleSubmit, profile,error}) => {
   return (
       //using custom Element from "formControls" input,textarea
       <form onSubmit={handleSubmit}>
          <div>
             <button>Save</button>
             {error && <div className={s.formSummaryError}>{error}</div>}
          </div>
          <div>
             Full name:
             {CreateField('Full name', 'fullName', [], Input)}
          </div>
          <div>
             Looking For A Job:
             {CreateField('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
          </div>
          <div>
             My professional skills:
             {CreateField('My professional skills', 'lookingForAJobDescription', [], Textarea)}
          </div>
          <div>
             About Me:
             {CreateField('About Me', 'aboutMe', [], Textarea)}
          </div>
          <div>
             <b>Contacts</b>: {Object.keys(profile.contacts)
              //important!!'contacts.' name and DOT in the end. Name = name for server put request
              .map((key, index) => {
                 return <div key={key}>
                    {key}: {CreateField(key, 'contacts.' + key, [], Input)}
                 </div>
              })}
             <p>{profile.userId}</p>
          </div>
       </form>
   )
}

export const ProfileDataReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)