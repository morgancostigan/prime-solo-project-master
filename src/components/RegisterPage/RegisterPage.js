import React, { Component } from 'react';
import {connect} from 'react-redux';
import RegisterBreweryPage from '../RegisterBreweryPage/RegisterBreweryPage';

class RegisterPage extends Component {
  state = {
    username: '',
    userzip: '',
    avatar_id: 1,
    email: '',
    password: '',
    isBrewer: false,
    isAdmin: false
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.userzip && this.state.email && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER_STANDARD_USER',
        payload: {
          username: this.state.username,
          userzip: this.state.userzip,
          avatar_id: this.state.avatar_id,
          email: this.state.email,
          password: this.state.password,
          isBrewer: this.state.isBrewer,
          isAdmin: this.state.isAdmin,

        },
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form onSubmit={this.registerUser}>
          <h1>Register User</h1>
          <div>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="userzip">
              ZIP Code:
              <input
                type="number"
                name="userzip"
                value={this.state.userzip}
                onChange={this.handleInputChangeFor('userzip')}
              />
            </label>
          </div>       
          <div>
            <label htmlFor="email">
              Email:
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChangeFor('email')}
              />
            </label>
          </div>                
          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          {/* checkbox to determine whether to continue to RegisterBreweryPage */}
          <div>
            <label htmlFor="isBrewer">
              Registering as a Brewery:
              <input
                type="checkbox"
                name="isBrewer"
                value="true"
                onChange={this.handleInputChangeFor('isBrewer')}
              />
            </label>
          </div>      
          <div>
            <input
              className="register"
              type="submit"
              name="submit"
              value="Register"
            />
          </div>
        </form>
        <center>
          <button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
          >
            Login
          </button>
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);

