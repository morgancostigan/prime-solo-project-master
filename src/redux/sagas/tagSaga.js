import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_TAGS" actions
function* fetchTags() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        // the config includes credentials which
        // allow the server session to recognize the user
        // If a user is logged in, this will return their information
        // from the server session (req.user)
        const response = yield axios.get('api/tags', config);

        // now that the session has given us a user object
        // with an id and username set the client-side user object to let
        // the client-side code know the user is logged in
        yield put({ type: 'SET_TAGS', payload: response.data });
    } catch (error) {
        console.log('Tag get request failed', error);
    }
}

// worker Saga: will be fired on "DELETE_BEER_TAGS" actions
function* deleteBeerTags(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        // the config includes credentials which
        // allow the server session to recognize the user
        // If a user is logged in, this will return their information
        // from the server session (req.user)
        const response = yield axios.delete(`api/tags/${action.payload.beer_id}`, config);

        // now that the session has given us a user object
        // with an id and username set the client-side user object to let
        // the client-side code know the user is logged in
        yield put({ type: 'DELETE_BEER', payload: action.payload, refresh: action.refresh});
    } catch (error) {
        console.log('Tag get request failed', error);
    }
} 

function* tagSaga() {
    yield takeLatest('FETCH_TAGS', fetchTags);
    yield takeLatest('DELETE_BEER_TAGS', deleteBeerTags)
}

export default tagSaga;