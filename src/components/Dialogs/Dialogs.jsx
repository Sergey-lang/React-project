import React from 'react';
import s from './Dialogs.module.css';
import Message from './Message/Message';
import DialogItem from './Dialog/Dialog';
import {Field, reduxForm} from 'redux-form';

const Dialogs = (props) => {

   let state = props.dialogsPage;

   let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>);
   let messagesElements = state.messages.map(m => <Message key={m.id} message={m.message}/>);

   let addNewMessage = (value) => {
      props.addMessage(value.newMessageText);
   }

   return (
      <div className={s.dialogs}>
         <div className={s.dialogsItems}>
            {dialogsElements}
         </div>
         <div className={s.messages}>
            <div>{messagesElements}</div>
            <div className={s.addMessage}>
               <AddMessageReduxForm onSubmit={addNewMessage}/>
            </div>
         </div>
      </div>
   )
}

const AddMessageForm = (props) => {
   return (
      <form onSubmit={props.handleSubmit}>
         <div>
            <Field component={'textarea'}
                   name={'newMessageText'}
                   placeholder={'Enter your message'}
            />
         </div>
         <div>
            <button>Send message</button>
         </div>
      </form>
   )
}

const AddMessageReduxForm = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm)

export default Dialogs;