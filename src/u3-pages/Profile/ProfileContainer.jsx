import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {Profile} from './Profile'
import {getStatusFromUser, getUserProfileData, savePhoto, updateOwnProfileStatus} from '../../u4-redux/profile-reducer'
import {withRouter} from 'react-router-dom'

class ProfileContainer extends React.Component {

   refreshProfile() {
      let userId = this.props.match.params.userId
      if (!userId) {
         userId = this.props.authorizedUserId
         if (!userId) {
            this.props.history.push('/login')
         }
      }
      this.props.getUserProfileData(userId)
      this.props.getStatusFromUser(userId)
   }

   componentDidMount() {
      this.refreshProfile()
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
      if (this.props.match.params.userId !== prevProps.match.params.userId) {
         this.refreshProfile()
      }
   }

   render() {
      return <Profile {...this.props}
                      isOwner={!this.props.match.params.userId}
                      profile={this.props.profile}
                      status={this.props.status}
                      savePhoto={this.props.savePhoto}
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
    connect(mapStateToProps, {getUserProfileData, getStatusFromUser, updateOwnProfileStatus,savePhoto}),
    withRouter,
)(ProfileContainer)


