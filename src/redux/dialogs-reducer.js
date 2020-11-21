const SEND_MESSAGE = 'ADD-MESSAGE';

let initializeState = {
   dialogs: [
      {id: 1, name: 'Dimych'},
      {id: 2, name: 'Andrew'},
      {id: 3, name: 'Sveta'}
   ],
   messages: [
      {id: 1, message: 'Hi'},
      {id: 2, message: 'How are you?'},
      {id: 3, message: 'I can met with you'}
   ],
};

const dialogsReducer = (state = initializeState, action) => {
   switch (action.type) {
      case SEND_MESSAGE:
         let newMessage = action.messageText;
         return {
            ...state,
            messages: [...state.messages, {id: 6, message:newMessage}]
         };
      default:
         return state;
   }
}

export const sendMessageCreator = (messageText) => ({type: SEND_MESSAGE, messageText});

export default dialogsReducer;