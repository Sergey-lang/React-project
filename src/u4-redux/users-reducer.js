import {usersAPI} from '../u5-api/user-api'
import {updateObjectInArray} from '../utils/objects-helpers'

let initializeState = {
   users: [],
   pageSize: 10,
   totalUsersCount: 0,
   currentPage: 1,
   isFetching: true,
   followingInProgress: [1, 2]
}

export const usersReducer = (state = initializeState, action) => {
   switch (action.type) {
      case FOLLOW:
         return {
            ...state,
            users: updateObjectInArray(state.users,
                action.userId, 'id', {followed: true})
         }
      case UNFOLLOW:
         return {
            ...state,
            users: updateObjectInArray(state.users,
                action.userId, 'id', {followed: false})
         }
      case SET_USERS: {
         return {...state, users: action.users}
      }
      case SET_CURRENT_PAGE: {
         return {...state, currentPage: action.currentPage}
      }
      case SET_TOTAL_USERS_COUNT: {
         return {...state, totalUsersCount: action.count}
      }
      case TOGGLE_IS_FETCHING: {
         return {...state, isFetching: action.isFetching}
      }
      case TOGGLE_IS_FOLLOWING_IN_PROGRESS: {
         return {
            ...state,
            followingInProgress: action.isFetching
                ? [...state.followingInProgress, action.userId]
                : state.followingInProgress.filter(id => id !== action.userId)
         }
      }
      default:
         return state
   }
}

//Actions type
const FOLLOW = 'USERS/FOLLOW'
const UNFOLLOW = 'USERS/UNFOLLOW'
const SET_USERS = 'USERS/SET_USERS'
const SET_CURRENT_PAGE = 'USERS/SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'USERS/SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'USERS/IS_FETCHING'
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = 'USERS/TOGGLE_IS_FOLLOWING_IN_PROGRESS'

//Actions
export const followSuccess = (userId) => ({type: FOLLOW, userId})
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId})
export const setUsers = (users) => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const setUsersTotalCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const toggleFollowingProgress = (isFetching, userId) => ({
   type: TOGGLE_IS_FOLLOWING_IN_PROGRESS,
   isFetching,
   userId
})

//Thunks
export const requestUsers = (requestingPage, pageSize) => async (dispatch) => {
   dispatch(toggleIsFetching(true))
   dispatch(setCurrentPage(requestingPage))
   let data = await usersAPI.getUsers(requestingPage, pageSize)
   dispatch(toggleIsFetching(false))
   dispatch(setUsers(data.items))
   dispatch(setUsersTotalCount(data.totalCount))
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
   dispatch(toggleFollowingProgress(true, userId))
   let response = await apiMethod(userId)
   if (response.resultCode === 0) {
      dispatch(actionCreator(userId))
   }
   dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId) => async (dispatch) => {
   followUnfollowFlow(dispatch, userId,
       usersAPI.follow.bind(usersAPI),
       followSuccess)
}

export const unfollow = (userId) => async (dispatch) => {
   followUnfollowFlow(dispatch, userId,
       usersAPI.unfollow.bind(usersAPI),
       unfollowSuccess)
}
