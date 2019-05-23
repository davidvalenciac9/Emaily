import axios from 'axios';
import { FETCH_USER } from './types';

/*we make an api request to our server and
		we only dispatch the action after we get the response
		from the api server*/
export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
	const res = await axios.post('/api/stripe', token);
	dispatch({ type: FETCH_USER, payload: res.data });
};
