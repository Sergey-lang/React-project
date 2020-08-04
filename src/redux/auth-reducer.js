import { authAPI } from '../api/api';
const TOGGLE_IS_FETCHING = 'IS_FETCHING';
const SET_USER_DATA = 'SET_USER_DATA'

let initializeState = {
    id: null,
    email: null,
    login: null,
    isFetching: true,
    isAuth: false
};

const authReducer = (state = initializeState, action) => {
    switch (action.type) {
        case SET_USER_DATA:

            return {
                ...state,
                ...action.data,
                isAuth: true
            };
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        default:
            return state;
    }
}


export const setAuthUserData = (id, email, login) => (
    { type: SET_USER_DATA, data: { id, email, login } });
export const toggleIsFetching = (isFetching) => (
    { type: TOGGLE_IS_FETCHING, isFetching });

export default authReducer;

export const getAuthUserData = () => {
    return (dispatch) => {
        authAPI.authMe()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let { id, login, email } = response.data.data;
                    dispatch(setAuthUserData(id, login, email));
                }
            });
    }
}