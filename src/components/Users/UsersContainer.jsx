import React from 'react';
import {connect} from 'react-redux';
import {follow, requestUsers, setCurrentPage, toggleFollowingProgress, unfollow,} from '../../redux/users-reducer';
import {Users} from './Users';
import {Preloader} from '../common/preloader/Preloader';
import {compose} from 'redux';
import {
   getCurrentPage,
   getFollowingInProgress,
   getIsFetching,
   getPageSize,
   getTotalUsersCount,
   getUsers,
} from '../../redux/users-selectors';

class UsersContainer extends React.Component {
   componentDidMount() {
      this.props.requestUsers(this.props.currentPage, this.props.pageSize)
   }

   onPageChanged = (pageNumber) => {
      this.props.requestUsers(pageNumber, this.props.pageSize)
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

/*const mapStateToProps = (state) => {
   return {
      users: state.usersPage.users,
      pageSize: state.usersPage.pageSize,
      totalUsersCount: state.usersPage.totalUsersCount,
      currentPage: state.usersPage.currentPage,
      isFetching: state.usersPage.isFetching,
      followingInProgress: state.usersPage.followingInProgress
   }
}*/

const mapStateToProps = (state) => {
   return {
      users: getUsers(state),
      pageSize: getPageSize(state),
      totalUsersCount: getTotalUsersCount(state),
      currentPage: getCurrentPage(state),
      isFetching: getIsFetching(state),
      followingInProgress: getFollowingInProgress(state)
   }
}

export default compose(
   connect(mapStateToProps, {
      follow, unfollow, setCurrentPage,
      toggleFollowingProgress, requestUsers,
   }),
)(UsersContainer)