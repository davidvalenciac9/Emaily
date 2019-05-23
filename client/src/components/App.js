import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';

const Dashboard = () => {
	return <h2>Dashboard</h2>;
};
const SurveyNew = () => {
	return <h2>SurveyNew</h2>;
};

class App extends Component {
	//Method to fetch current user
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<div className="container">
				<BrowserRouter>
					{/*each route will specify a rule of each possible address a user
		can reach in the app and show an scpecific component we specify*/}
					<div>
						<Header />
						<Route exact path="/" component={Landing} />
						<Route exact path="/surveys" component={Dashboard} />
						<Route path="/surveys/new" component={SurveyNew} />
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

//first argument is for map state function we will not use in this component
export default connect(
	null,
	actions
)(App);
