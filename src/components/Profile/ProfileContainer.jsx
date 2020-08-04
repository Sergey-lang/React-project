import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import {getUserProfile} from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';


class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = 2;
        }
        this.props.getUserProfile(userId)
    }

    render() {
        //insted of return presentation comp we return login
        if(!this.props.isAuth) return <Redirect to='/login'/>
        return <Profile {...this.props} profile={this.props.profile}/>
    }
}

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
})



export default connect (mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent)

