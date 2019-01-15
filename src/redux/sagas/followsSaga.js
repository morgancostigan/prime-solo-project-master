import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "POST_TO_FOLLOWS" actions
function* postToFollows(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        /////////////////////////////////////////////////////////////////
        // the config includes credentials which
        // allow the server session to recognize the user
        // If a user is logged in, this will return their information
        // from the server session (req.user)
        yield axios.post('api/follows', action.payload, config);

        // now that the session has given us a user object
        // with an id and username set the client-side user object to let
        // the client-side code know the user is logged in
        yield put({ type: 'FETCH_FOLLOWS' });
    } catch (error) {
        console.log('Follow post request failed', error);
    }
}

// worker Saga: will be fired on "FETCH_FOLLOWS" actions
function* fetchFollows(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        // the config includes credentials which
        // allow the server session to recognize the user
        // If a user is logged in, this will return their information
        // from the server session (req.user)
        const response = yield axios.get(`api/follows/myfollows?id=${action.payload}`, config);

        // now that the session has given us a user object
        // with an id and username set the client-side user object to let
        // the client-side code know the user is logged in
        yield put({ type: 'SET_FOLLOWS', payload: response.data });
    } catch (error) {
        console.log('Follows get request failed', error);
    }
}

function* followsSaga() {
    yield takeLatest('POST_TO_FOLLOWS', postToFollows);
    yield takeLatest('FETCH_CALENDAR', fetchFollows)
}

export default followsSaga;