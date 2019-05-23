import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers'; //this is short for import from ./reducers/index.js

/*the createStore receives 3 arguments, first are the reducers
second is the initial state of the application
third is the applyMiddleware function
reduxthunk will see that the action returns a function and will pass it
as an argument*/
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

/*To the Provider tag we pass the store we create as a prop*/
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
