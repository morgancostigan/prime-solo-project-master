import React from 'react';
import { connect } from 'react-redux';
import BeerListPage from '../BeerListPage/BeerListPage';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
const UserPage = (props) => (
  props.dispatch({ type: 'CLEAR_LOGIN_ERROR' }),
  props.dispatch({ type: 'CLEAR_REGISTRATION_ERROR' }),
  
  <div>
    <h1 id="welcome">
      Hey { props.user.username }, welcome!
    </h1>
    <BeerListPage/>
  </div>
);

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
  loginError: state.errors,
  registrationError: state.errors,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
