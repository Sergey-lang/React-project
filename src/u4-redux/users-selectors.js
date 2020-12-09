export const getUsers = (state) => {
   return state.usersPage.users
}
export const getPageSize = (state) => {
   return state.usersPage.pageSize
}

export const getTotalUsersCount = (state) => {
   return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state) => {
   return state.usersPage.currentPage
}
export const getIsFetching = (state) => {
   return state.usersPage.isFetching
}
export const getFollowingInProgress = (state) => {
   return state.usersPage.followingInProgress
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