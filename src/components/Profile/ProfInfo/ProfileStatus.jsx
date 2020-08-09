import React from 'react';
import s from './ProfileInfo.module.css';

class ProfileStatus extends React.Component {

	state = {
		editMode: false
	}
	activatedMode() {
		this.setState({ editMode: true })
	}
	deactivatedMode() {
		this.setState({ editMode: false })
	}

	render() {
		return (
			<div>
				{!this.state.editMode ?
					<div>
						<span onDoubleClick={this.activatedMode.bind(this)}>{this.props.status}</span>
					</div> :
					<div>
						<input autoFocus={true} onBlur={this.deactivatedMode.bind(this)} value={this.props.status} />
					</div>
				}
			</div>
		)
	}
}



export default ProfileStatus;