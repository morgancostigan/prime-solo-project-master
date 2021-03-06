import { combineReducers } from 'redux';

// loginMessage holds the string that will display
// on the login screen if there's an error
const loginMessage = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_LOGIN_ERROR':
      return '';
    case 'LOGIN_INPUT_ERROR':
      return 'Enter your username and password!';
    case 'LOGIN_FAILED':
      return 'Oops! The username and password didn\'t match. Try again!';
    case 'LOGIN_FAILED_NO_CODE':
      return 'Oops! Something went wrong! Is the server running?';
    default:
      return state;
  }
};

// registrationMessage holds the string that will display
// on the registration screen if there's an error
const registrationMessage = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_REGISTRATION_ERROR':
      return '';
    case 'REGISTRATION_INPUT_ERROR':
      return 'Please fill all fields';
    case 'REGISTRATION_FAILED':
      return 'Oops! That didn\'t work. The username might already be taken. Try again!';
    case 'BREWERY_REGISTRATION_SUCCESSFUL':
      return 'Brewery Registration Successful!';
    case 'USER_REGISTRATION_SUCCESSFUL':
      return 'User Registration Successful!';
    default:
      return state;
  }
};

// searchMessage holds the string that will display
// on the search screen if there's an error
const searchMessage = (state = '', action) => {
  switch (action.type) {
    case 'SEARCH_ERROR':
      return 'There was an error in the search.  Please try again.';
    case 'NO_RESULTS_ERROR':
      return 'There are no results for that search.  Please try something less specific.';
    case 'CLEAR_SEARCH_ERROR':
      return '';
    default:
      return state;
  }
};

// make one object that has keys loginMessage, registrationMessage
// these will be on the redux state at:
// state.errors.loginMessage and state.errors.registrationMessage
export default combineReducers({
  loginMessage,
  registrationMessage,
  searchMessage,
});
