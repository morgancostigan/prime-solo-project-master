import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

// worker Saga: will be fired on "SEARCH_BREWERY_RELEASE_TAG" actions
function* fetchSearchBreweryReleaseTagResults(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        const { brewery, release1, release2, tag1 } = action.payload;
        const response = yield axios.get(`api/search/BRT/${brewery}/${release1}/${release2}/${tag1}`, config);/////////////////////////////

        yield put({ type: 'SET_SEARCH_RESULTS', payload: response.data });
    } catch (error) {
        console.log('Search get request failed', error);
    }
}

// worker Saga: will be fired on "SEARCH_BREWERY_RELEASE" actions
function* fetchSearchBreweryReleaseResults(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        const { brewery, release1, release2 } = action.payload;
        const response = yield axios.get(`api/search/BR/${brewery}/${release1}/${release2}`, config);/////////////////////////////

        yield put({ type: 'SET_SEARCH_RESULTS', payload: response.data });
    } catch (error) {
        console.log('Search get request failed', error);
    }
}

// worker Saga: will be fired on "SEARCH_BREWERY_TAG" actions
function* fetchSearchBreweryTagResults(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        const {brewery, tag1} = action.payload;
        const response = yield axios.get(`api/search/BT/${brewery}/${tag1}`, config);/////////////////////////////

        yield put({ type: 'SET_SEARCH_RESULTS', payload: response.data });
    } catch (error) {
        console.log('Search get request failed', error);
    }
}

// worker Saga: will be fired on "SEARCH_RELEASE_TAG" actions
function* fetchSearchReleaseTagResults(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        const { release1, release2, tag1 } = action.payload;
        const response = yield axios.get(`api/search/RT/${release1}/${release2}/${tag1}`, config);/////////////////////////////

        yield put({ type: 'SET_SEARCH_RESULTS', payload: response.data });
    } catch (error) {
        console.log('Search get request failed', error);
    }
}

// worker Saga: will be fired on "SEARCH_BREWERY" actions
function* fetchSearchBreweryResults(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        const response = yield axios.get(`api/search/B?brewery=${action.payload.brewery}`, config);/////////////////////////////

        yield put({ type: 'SET_SEARCH_RESULTS', payload: response.data });

        yield put(push("/search-results"));
    } catch (error) {
        console.log('Search get request failed', error);
    }
}

// worker Saga: will be fired on "SEARCH_RELEASE" actions
function* fetchSearchReleaseResults(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        const { release1, release2 } = action.payload;
        const response = yield axios.get(`api/search/R/${release1}/${release2}`, config);

        yield put({ type: 'SET_SEARCH_RESULTS', payload: response.data });
    } catch (error) {
        console.log('Search get request failed', error);
    }
}

// worker Saga: will be fired on "SEARCH_TAG" actions
function* fetchSearchTagResults(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        const { tag1 } = action.payload;
        const response = yield axios.get(`api/search/T?tag=${action.payload.tag1}`, config);/////////////////////////////

        yield put({ type: 'SET_SEARCH_RESULTS', payload: response.data });
    } catch (error) {
        console.log('Search get request failed', error);
    }
}

function* searchSaga() {
    yield takeLatest('SEARCH_BREWERY_RELEASE_TAG', fetchSearchBreweryReleaseTagResults);
    yield takeLatest('SEARCH_BREWERY_RELEASE', fetchSearchBreweryReleaseResults);
    yield takeLatest('SEARCH_BREWERY_TAG', fetchSearchBreweryTagResults);
    yield takeLatest('SEARCH_RELEASE_TAG', fetchSearchReleaseTagResults);
    yield takeLatest('SEARCH_BREWERY', fetchSearchBreweryResults);
    yield takeLatest('SEARCH_RELEASE', fetchSearchReleaseResults);
    yield takeLatest('SEARCH_TAG', fetchSearchTagResults);
}

export default searchSaga;