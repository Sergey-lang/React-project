import {profileAPI} from '../api/profile-api';

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const GET_USER_PROFILE_STATUS = 'SET-USER-PROFILE-STATUS';
const SET_OWN_PROFILE_STATUS = 'UPDATE-PROFILE-STATUS';

let initializeState = {
   posts: [
      {id: 1, message: 'Hi, how do you feel? I have not seen you since I was in Berlin!', likesCount: 12},
      {id: 2, message: 'Wow! It is great! When are you going there?', likesCount: 12}
   ],
   newPostText: '',
   profile: null,
   status: '',
};

const profileReducer = (state = initializeState, action) => {
   switch (action.type) {
      case ADD_POST:
         let newPost = {
            id: 3,
            message: state.newPostText,
            likesCount: 0
         };
         return {
            ...state,
            posts: [newPost,...state.posts],
            newPostText: ''
         };
      case UPDATE_NEW_POST_TEXT: {
         return {
            ...state,
            newPostText: action.newText
         };
      }
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

export const addPostActionCreator = () => ({type: ADD_POST});
export const updateNewPostTextActionCreator = (text) =>
   ({type: UPDATE_NEW_POST_TEXT, newText: text});

export const setUserProfileData = (profile) =>
   ({type: SET_USER_PROFILE, profile})

//STATUS
export const getUserStatus = (userStatus) => ({type: GET_USER_PROFILE_STATUS, userStatus});
export const setOwnProfileStatus = (status) => ({type: SET_OWN_PROFILE_STATUS, status});


//Thunks
export const getUserProfileData = (userId) => {
   return (dispatch) => {
      profileAPI.getProfile(userId)
         .then(data => {
            dispatch(setUserProfileData(data));
         });
   }
}

export const getStatusFomUser = (userId) => (dispatch) => {
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

export default profileReducer;