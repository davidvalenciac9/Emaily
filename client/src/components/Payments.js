import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

/*The Payments Component has the action creator available at
this.props.handleToken*/

class Payments extends Component {
	render() {
		return (
			//StripeCheckout is a component that renders a button
			//We only put the configuration
			<StripeCheckout
				name="Emaily"
				description="Add 5 credits for $5.00"
				amount={500}
				token={token => this.props.handleToken(token)}
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
			>
				<button className="btn">ADD CREDITS</button>
			</StripeCheckout>
		);
	}
}

export default connect(
	null,
	actions
)(Payments);
