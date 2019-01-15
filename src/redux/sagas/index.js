import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import beerSaga from './beerSaga';
import tagSaga from './tagSaga';
import calendarSaga from './calendarSaga';
import followsSaga from './followsSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    beerSaga(),
    tagSaga(),
    calendarSaga(),
    followsSaga(),
  ]);
}
