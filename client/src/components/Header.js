import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
	//helper method
	renderContent() {
		switch (this.props.auth) {
			case null:
				return;
			case false: //case where user is logged out
				return (
					<li>
						<a href="/auth/google">Login with Google</a>
					</li>
				);
			default:
				//case where user is logged in
				return [
					<li key="1">
						<Payments />
					</li>,
					<li key="2" style={{ margin: '0 10px' }}>
						Total Credits: {this.props.auth.credits}
					</li>,
					<li key="3">
						<a href="/api/logout">Logout</a>
					</li>
				];
		}
	}

	render() {
		return (
			<nav>
				<div className="nav-wrapper">
					<Link
						to={this.props.auth ? '/surveys' : '/'}
						className="left brand-logo"
					>
						Emaily
					</Link>
					<ul id="nav-mobile" className="right">
						{this.renderContent()}
					</ul>
				</div>
			</nav>
		);
	}
}

//we are getting the auth object from the authreducer
function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Header);
