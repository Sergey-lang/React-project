import {getAuthUserData} from './auth-reducer';

const INITIALIZED_SUCCESS = 'INITIALIZED-SUCCESS';

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

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});

export const initializeApp = () => (dispatch) => {

   let promise = dispatch(getAuthUserData())

   Promise.all([promise])
      .then(() => {
         dispatch(initializedSuccess())
      })
}
