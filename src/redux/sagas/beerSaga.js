import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';

// worker Saga: will be fired on "FETCH_BEER" actions
function* fetchBeer() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        // the config includes credentials which
        // allow the server session to recognize the user
        // If a user is logged in, this will return their information
        // from the server session (req.user)
        const response = yield axios.get('api/beer', config);

        // now that the session has given us a user object
        // with an id and username set the client-side user object to let
        // the client-side code know the user is logged in
        yield put({ type: 'SET_BEER', payload: response.data });
    } catch (error) {
        console.log('Beer get request failed', error);
    }
}

// worker Saga: will be fired on "FETCH_BEER" actions
function* fetchOurBeer(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        // the config includes credentials which
        // allow the server session to recognize the user
        // If a user is logged in, this will return their information
        // from the server session (req.user)
        const response = yield axios.get(`api/beer/portfolio?id=${action.payload}`, config);

        // now that the session has given us a user object
        // with an id and username set the client-side user object to let
        // the client-side code know the user is logged in
        yield put({ type: 'SET_BEER', payload: response.data });
    } catch (error) {
        console.log('Beer get request failed', error);
    }
}// end fetchOurBeer

// worker Saga: will be fired on "POST_BEER" actions
function* postBeer(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        // the config includes credentials which
        // allow the server session to recognize the user
        // If a user is logged in, this will return their information
        // from the server session (req.user)

        // const response = yield axios.post('api/beer', action.payload , config);
        // yield call(axios.post, '/api/beer', action.payload, config);

        yield axios.post('api/beer', action.payload, config);


        // now that the session has given us a user object
        // with an id and username set the client-side user object to let
        // the client-side code know the user is logged in
        yield put({ type: 'FETCH_BEER'});

    } catch (error) {
        console.log('Beer POST request failed', error);
    }
    yield put(push("/home"));

}

function* beerSaga() {
    yield takeLatest('FETCH_OUR_BEER', fetchOurBeer);
    yield takeLatest('FETCH_BEER', fetchBeer);
    yield takeLatest('POST_BEER', postBeer);
}

export default beerSaga;

