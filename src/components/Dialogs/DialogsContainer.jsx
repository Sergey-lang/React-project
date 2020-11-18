import React from 'react';
import {sendMessageCreator, updateNewMessageTextActionCreator,}
   from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withAuthRedirect} from '../hoc/withAuthRedirect';

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

export default compose(
   connect(mapStateToProps, mapDispatchToProps),
   withAuthRedirect
)(Dialogs);