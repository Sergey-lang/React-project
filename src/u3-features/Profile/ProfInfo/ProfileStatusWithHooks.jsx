import React, {useState} from 'react';

export const ProfileStatusWithHooks = (props) => {

   let [editMode, setEditMode] = useState(false)
   let [status, setStatus] = useState(props.status)

   const activateEditMode = () => {
      setEditMode(true)
   }

   const deactivateEditMode = () => {
      setEditMode(false)
      props.updateOwnProfileStatus(status)
   }

   const onStatusChange = (e) => {
      setStatus(e.currentTarget.value)
   }

   return (
      <div>
         {!editMode &&
         <div>
               <span onDoubleClick={activateEditMode}>
                  {props.status || '-----'}
               </span>
         </div>}
         {editMode &&
         <div>
            <input autoFocus={true}
                   onBlur={deactivateEditMode}
                   onChange={onStatusChange}
                   value={status}
            />
         </div>}
      </div>
   )
}