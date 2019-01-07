import React, { Component } from 'react';
import { connect } from 'react-redux';

class RegisterBreweryPage extends Component {
    state = {
        name: '',
        address: '',
        city: '',
        state: '',
        website: '',
        logo_url: '',
        bio: '',

        username: this.props.username,
        userzip: this.props.username,
        avatar_id: this.props.username,
        email: this.props.username,
        password: this.props.username,
        isBrewer: this.props.username,
        isAdmin: this.props.username,
    };

    registerUser = (event) => {
        event.preventDefault();
        //////////////////////this needs sorting/////////////////////////
        if (this.state.name && this.state.address && this.state.city && this.state.state) {
            this.props.dispatch({
                type: 'REGISTER_BREWERY',
                payload: {
                    name: this.state.name,
                    address: this.state.address,
                    city: this.state.city,
                    state: this.state.state,
                    website: this.state.website,
                    logo_url: this.state.logo_url,
                    bio: this.state.bio,

                    username: this.state.username,
                    userzip: this.state.userzip,
                    avatar_id: this.state.avatar_id,
                    email: this.state.email,
                    password: this.state.password,
                    isBrewer: this.state.isBrewer,
                    isAdmin: this.state.isAdmin
                },
            });
        }

        else {
            this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
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
                    <h1>Register Brewery</h1>
                    <div>
                        <label htmlFor="name">
                            Brewery Name:
                            <input
                                type="text"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleInputChangeFor('name')}
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="address">
                            Address:
                            <input
                                type="text"
                                name="address"
                                value={this.state.address}
                                onChange={this.handleInputChangeFor('address')}
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="city">
                            City:
                            <input
                                type="text"
                                name="city"
                                value={this.state.city}
                                onChange={this.handleInputChangeFor('city')}
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="state">
                            State:
                            <input
                                type="text"
                                name="state"
                                value={this.state.state}
                                onChange={this.handleInputChangeFor('state')}
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="website">
                            Website:
                            <input
                                type="text"
                                name="website"
                                value={this.state.website}
                                onChange={this.handleInputChangeFor('website')}
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="logo_url">
                            Logo URL:
                            <input
                                type="text"
                                name="logo_url"
                                value={this.state.logo_url}
                                onChange={this.handleInputChangeFor('logo_url')}
                            />
                        </label>
                    </div>       
                    <div>
                        <label htmlFor="bio">
                            Brewery Bio:
                            <input
                                type="text"
                                name="bio"
                                value={this.state.bio}
                                onChange={this.handleInputChangeFor('bio')}
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
                        onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}
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

export default connect(mapStateToProps)(RegisterBreweryPage);