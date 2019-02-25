import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "DELETE_FROM_CALENDAR" actions
function* deleteFromCalendar(action) {
    console.log('in deleteFromCalendar, action', action);
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        // the config includes credentials which
        // allow the server session to recognize the user
        // If a user is logged in, this will return their information
        // from the server session (req.user)
        yield axios.delete(`api/calendar/${action.payload.beer_id}`, config);

        // now that the session has given us a user object
        // with an id and username set the client-side user object to let
        // the client-side code know the user is logged in
        yield put({ type: 'FETCH_CALENDAR', refresh: action.refresh });
    } catch (error) {
        console.log('Delete from calendar request failed', error);
    }
}//end deleteFromCalendar

// worker Saga: will be fired on "POST_TO_CALENDAR" actions
function* postToCalendar(action) {
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
        yield axios.post('api/calendar', action.refresh, config);

        // now that the session has given us a user object
        // with an id and username set the client-side user object to let
        // the client-side code know the user is logged in
        yield put({ type: 'FETCH_CALENDAR', refresh: action.refresh.user_id });
    } catch (error) {
        console.log('Calendar post request failed', error);
    }
}

// worker Saga: will be fired on "FETCH_CALENDAR" actions
function* fetchCalendar(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        // the config includes credentials which
        // allow the server session to recognize the user
        // If a user is logged in, this will return their information
        // from the server session (req.user)
        const response = yield axios.get(`api/calendar/mycalendar?id=${action.refresh}`, config);

        // now that the session has given us a user object
        // with an id and username set the client-side user object to let
        // the client-side code know the user is logged in
        yield put({ type: 'SET_CALENDAR', payload: response.data });
    } catch (error) {
        console.log('Calendar get request failed', error);
    }
}

function* calendarSaga() {
    yield takeLatest('POST_TO_CALENDAR', postToCalendar);
    yield takeLatest('FETCH_CALENDAR', fetchCalendar)
    yield takeLatest('DELETE_FROM_CALENDAR', deleteFromCalendar)
}

export default calendarSaga;