import React from 'react';
import {sendMessageCreator,} from '../../redux/dialogs-reducer';
import {Dialogs} from './Dialogs';
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
      addMessage: (messageText) => {
         dispatch(sendMessageCreator(messageText))
      },
   }
}

export default compose(
   connect(mapStateToProps, mapDispatchToProps),
   withAuthRedirect
)(Dialogs);