import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Profile} from './Profile';
import {getStatusFromUser, getUserProfileData, updateOwnProfileStatus} from '../../u4-redux/profile-reducer';
import {withRouter} from 'react-router-dom';

class ProfileContainer extends React.Component {
   componentDidMount = () => {
      let userId = this.props.match.params.userId;
      if (!userId) {
         userId = this.props.authorizedUserId
         if (!userId) {
            this.props.history.push('/login')
         }
      }
      this.props.getUserProfileData(userId);
      this.props.getStatusFromUser(userId);
   }

   render() {
      return <Profile {...this.props}
                      profile={this.props.profile}
                      status={this.props.status}
                      updateOwnProfileStatus={this.props.updateOwnProfileStatus}/>
   }
}

const mapStateToProps = (state) => ({
   profile: state.profilePage.profile,
   status: state.profilePage.status,
   authorizedUserId: state.auth.id,
   isAuth: state.auth.isAuth
})

export default compose(
   connect(mapStateToProps, {getUserProfileData, getStatusFromUser, updateOwnProfileStatus}),
   withRouter,
   // withAuthRedirect
)(ProfileContainer)

