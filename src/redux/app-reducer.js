import {getAuthUserData} from './auth-reducer';

let initializeState = {
   initialized: false
};

export const appReducer = (state = initializeState, action) => {
   switch (action.type) {
      case INITIALIZED_SUCCESS: {
         return {...state, initialized: true}
      }
      default:
         return state;
   }
}

//Actions type
const INITIALIZED_SUCCESS = 'APP/INITIALIZED-SUCCESS';

//Actions
export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});

//Thunks
export const initializeApp = () => (dispatch) => {

   let promise = dispatch(getAuthUserData())

   Promise.all([promise])
      .then(() => {
         dispatch(initializedSuccess())
      })
}