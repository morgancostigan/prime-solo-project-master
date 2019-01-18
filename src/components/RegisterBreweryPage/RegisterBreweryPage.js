import React, { Component } from 'react';
import { connect } from 'react-redux';

class RegisterBreweryPage extends Component {

    state = {
        name: '',
        address: '',
        city: '',
        state: '',
        zip:'',
        website: '',
        logo_url: '',
        bio: ''
    };

    registerUser = (event) => {
        event.preventDefault();
        //////////////////////this needs sorting/////////////////////////
        console.log('this.props.user', this.props.user);
        
        if (this.state.name && this.state.address && this.state.city && this.state.state && this.state.zip) {
            this.props.dispatch({
                type: 'REGISTER_BREWERY',
                payload: {
                    name: this.state.name,
                    address: this.state.address,
                    city: this.state.city,
                    state: this.state.state,
                    zip: this.state.zip,
                    website: this.state.website,
                    logo_url: this.state.logo_url,
                    bio: this.state.bio,
                    user: this.props.user.id
                },
            });
            this.props.dispatch({ type: 'CLEAR_REGISTRATION_ERROR' });

            this.props.history.push("/add-beer");
        } else {
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
                <form className='RegisterBreweryForm' onSubmit={this.registerUser}>
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
                        <label htmlFor="zip">
                            ZIP Code:
                            <input
                                type="number"
                                name="zip"
                                value={this.state.zip}
                                onChange={this.handleInputChangeFor('zip')}
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
                            Brewery Bio: (limit 2000 characters)
                            <input
                                type="text"
                                name="bio"
                                maxLength="2000"
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
            </div>
        );
    }
}


// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
    errors: state.errors,
    user: state.user,
});

export default connect(mapStateToProps)(RegisterBreweryPage);