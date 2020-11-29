import {profileAPI} from '../api/profile-api';

let initializeState = {
   posts: [
      {id: 1, message: 'Hi, how do you feel? I have not seen you since I was in Berlin!', likesCount: 12},
      {id: 2, message: 'Wow! It is great! When are you going there?', likesCount: 12}
   ],
   profile: null,
   status: '',
};

export const profileReducer = (state = initializeState, action) => {
   switch (action.type) {
      case ADD_POST:
         return {
            ...state,
            posts: [{id: 3, message: action.postMessageText, likesCount: 0}, ...state.posts],
         };
      case SET_USER_PROFILE: {
         return {
            ...state,
            profile: action.profile
         };
      }
      case GET_USER_PROFILE_STATUS: {
         return {
            ...state,
            status: action.userStatus
         };
      }
      case SET_OWN_PROFILE_STATUS: {
         return {
            ...state,
            status: action.status
         };
      }
      default:
         return state;
   }
}

//Actions Type
const ADD_POST = 'PROFILE/ADD-POST';
const SET_USER_PROFILE = 'PROFILE/SET-USER-PROFILE';
const GET_USER_PROFILE_STATUS = 'PROFILE/SET-USER-PROFILE-STATUS';
const SET_OWN_PROFILE_STATUS = 'PROFILE/UPDATE-PROFILE-STATUS';

//Actions
export const addPostActionCreator = (postMessageText) => ({type: ADD_POST, postMessageText});
export const setUserProfileData = (profile) =>
   ({type: SET_USER_PROFILE, profile})
//---status
export const getUserStatus = (userStatus) => ({type: GET_USER_PROFILE_STATUS, userStatus});
export const setOwnProfileStatus = (status) => ({type: SET_OWN_PROFILE_STATUS, status});

//Thunks
export const getUserProfileData = (userId) => (dispatch) => {
   profileAPI.getProfile(userId)
      .then(data => {
         dispatch(setUserProfileData(data));
      });
}

export const getStatusFromUser = (userId) => (dispatch) => {
   profileAPI.getUserStatus(userId)
      .then(res => {
         dispatch(getUserStatus(res.data));
      });
}

export const updateOwnProfileStatus = (status) => (dispatch) => {
   profileAPI.updateOwnProfileStatus(status)
      .then(data => {
         if (data.resultCode === 0) {
            dispatch(setOwnProfileStatus(status));
         }
      });
}
