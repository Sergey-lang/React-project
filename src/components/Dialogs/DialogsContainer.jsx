import React from 'react';
import {sendMessageCreator, updateNewMessageTextActionCreator,}
from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";

// const DialogsContainer = () => {
// return (
//     <StoreContext.Consumer>
//         {(store) => {
//             let state = store.getState().dialogsPage;
//             let onAddMessage = () => {
//                 store.dispatch(sendMessageCreator());
//             }
//             let onMessageChange = (text) => {
//                 let action = updateNewMessageTextCreator(text)
//                 store.dispatch(action);
//             }
//             return <Dialogs
//                 addMessage={onAddMessage}
//                 updateNewMessageText={onMessageChange}
//                 dialogsPage={state}/>
//             }
//         }
//     </StoreContext.Consumer>)
// }

const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addMessage: () => {
            dispatch(sendMessageCreator())
        },
        updateNewMessageText: (text) => {
            let action = updateNewMessageTextActionCreator(text);
            dispatch(action);
        },
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;