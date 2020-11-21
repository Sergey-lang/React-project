import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Profile} from './Profile';
import {getStatusFomUser, getUserProfileData, updateOwnProfileStatus} from '../../redux/profile-reducer';
import {withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../hoc/withAuthRedirect';

class ProfileContainer extends React.Component {
   componentDidMount = () => {
      let userId = this.props.match.params.userId;
      if (!userId) {
         userId = 7567
      }
      this.props.getUserProfileData(userId);
      this.props.getStatusFomUser(userId);
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
})

export default compose(
   connect(mapStateToProps, {getUserProfileData, getStatusFomUser, updateOwnProfileStatus}),
   withRouter,
   withAuthRedirect
)(ProfileContainer)


