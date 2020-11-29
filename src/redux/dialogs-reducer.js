let initializeState = {
   dialogs: [
      {id: 1, name: 'Egor'},
      {id: 2, name: 'Andrew'},
      {id: 3, name: 'David'}
   ],
   messages: [
      {id: 1, message: 'Hi'},
      {id: 2, message: 'How are you?'},
      {id: 3, message: 'I can met with you'}
   ],
};

export const dialogsReducer = (state = initializeState, action) => {
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

//Actions Type
const SEND_MESSAGE = 'DIALOGS/ADD-MESSAGE';

//Actions
export const sendMessageCreator = (messageText) => ({type: SEND_MESSAGE, messageText});


