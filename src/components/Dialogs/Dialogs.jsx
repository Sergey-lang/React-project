import React from 'react';
import s from './Dialogs.module.css';
import Message from "./Message/Message";
import DialogItem from "./Dialog/Dialog";

const Dialogs = (props) => {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>);
    let messagesElements = state.messages.map(m => <Message key={m.id} message={m.message}/>);

    let newMessageElement = React.createRef();

    let onSendMessage = () => {
        props.addMessage();
    }
    let onMessageChange = () => {
        let text = newMessageElement.current.value;
        props.updateNewMessageText(text);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div className={s.addMessage}>
                <textarea onChange={onMessageChange}
                          placeholder='Enter your message'
                          cols='35'
                          rows='5'
                          ref={newMessageElement}
                          value={props.newMessageText}/>
                    <div>
                        <button onClick={onSendMessage} className={s.add_post}>Send message</button>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Dialogs;