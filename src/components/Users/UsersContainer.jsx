import React from 'react';
import {connect} from 'react-redux';
import {
   follow,
   setCurrentPage,
   unfollow,
   toggleFollowingProgress,
   getUsers,
} from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../common/preloader/Preloader';
import {compose} from 'redux';
import {withAuthRedirect} from '../hoc/withAuthRedirect'

class UsersContainer extends React.Component {
   componentDidMount() {
      this.props.getUsers(this.props.currentPage, this.props.pageSize)
   }

   onPageChanged = (pageNumber) => {
      this.props.getUsers(pageNumber, this.props.pageSize)
      this.props.setCurrentPage(pageNumber);
   }

   render() {
      return <>
         {this.props.isFetching ? <Preloader/> : null}
         <Users pageSize={this.props.pageSize}
                totalUsersCount={this.props.totalUsersCount}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                followingInProgress={this.props.followingInProgress}
         />
      </>
   }
}

const mapStateToProps = (state) => {
   return {
      users: state.usersPage.users,
      pageSize: state.usersPage.pageSize,
      totalUsersCount: state.usersPage.totalUsersCount,
      currentPage: state.usersPage.currentPage,
      isFetching: state.usersPage.isFetching,
      followingInProgress: state.usersPage.followingInProgress
   }
}

export default compose(
   connect(mapStateToProps, {
      follow, unfollow, setCurrentPage,
      toggleFollowingProgress, getUsers,
   }),
   withAuthRedirect
)(UsersContainer)