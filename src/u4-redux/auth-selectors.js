export const selectIsAuth = (state) => {
   return state.auth.isAuth
}

export const selectCurrentUserLogin = (state) => {
   return state.auth.login
}

//RESELECT library example
//can get 3 dependency
/*const SuperUserSelector = createSelector(getUsers,(users)=>{
   return users.filter(u => true)
})*/
//can get 3 dependency
/*const SuperUserSelector2 = createSelector(getUsers,getCurrentPage,(users,currentPage)=>{
   return users.filter(u => true)
})*/