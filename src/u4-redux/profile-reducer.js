import {profileAPI} from '../u5-api/profile-api'

let initializeState = {
   posts: [
      {id: 1, message: 'Hi, how do you feel? I have not seen you since I was in Berlin!', likesCount: 12},
      {id: 2, message: 'Wow! It is great! When are you going there?', likesCount: 12}
   ],
   profile: null,
   status: '',
}

export const profileReducer = (state = initializeState, action) => {
   switch (action.type) {
      case ADD_POST:
         return {
            ...state,
            posts: [{id: 5, message: action.postMessageText, likesCount: 0}, ...state.posts],
         }
      case DELETE_POST:
         return {
            ...state,
            posts: state.posts.filter(p => p.id !== action.postId)
         }
      case SET_USER_PROFILE: {
         return {
            ...state,
            profile: action.profile
         }
      }
      case GET_USER_PROFILE_STATUS: {
         return {
            ...state,
            status: action.userStatus
         }
      }
      case SET_OWN_PROFILE_STATUS: {
         return {
            ...state,
            status: action.status
         }
      }
      default:
         return state
   }
}

//Actions Type
const ADD_POST = 'PROFILE/ADD-POST'
const SET_USER_PROFILE = 'PROFILE/SET-USER-PROFILE'
const GET_USER_PROFILE_STATUS = 'PROFILE/SET-USER-PROFILE-STATUS'
const SET_OWN_PROFILE_STATUS = 'PROFILE/UPDATE-PROFILE-STATUS'
const DELETE_POST = 'PROFILE/DELETE-POST'

//Actions
export const addPostActionCreator = (postMessageText) => ({type: ADD_POST, postMessageText})
export const setUserProfileData = (profile) => ({type: SET_USER_PROFILE, profile})
export const deletePostAC = (postId) => ({type: DELETE_POST, postId})
//---status
export const getUserStatus = (userStatus) => ({type: GET_USER_PROFILE_STATUS, userStatus})
export const setOwnProfileStatus = (status) => ({type: SET_OWN_PROFILE_STATUS, status})

//Thunks
export const getUserProfileData = (userId) => async (dispatch) => {
   let data = await profileAPI.getProfile(userId)
   dispatch(setUserProfileData(data))
}

export const getStatusFromUser = (userId) => async (dispatch) => {
   let res = await profileAPI.getUserStatus(userId)
   dispatch(getUserStatus(res.data))
}

export const updateOwnProfileStatus = (status) => async (dispatch) => {
   let data = await profileAPI.updateOwnProfileStatus(status)
   if (data.resultCode === 0) {
      dispatch(setOwnProfileStatus(status))
   }
}
