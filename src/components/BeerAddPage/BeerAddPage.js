import React, { Component } from 'react';
import { connect } from 'react-redux';
import TagSelector from '../TagSelector/TagSelector'

class BeerAddPage extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_TAGS' })
    }

    state = {
        name: '',
        style: '',
        image_url: 1,
        description: '',
        release: '',
        tag1: '',
        tag2: '',
        tag3: '',
    };

    postNewBeer = (event) => {
        event.preventDefault();

        if (this.state.name && this.state.style && this.state.release && this.state.description) {
            this.props.dispatch({
                type: 'POST_BEER',
                payload: {
                    name: this.state.name,
                    style: this.state.style,
                    release: this.state.release,
                    description: this.state.description,
                    image_url: this.state.image_url,
                    tag1: this.state.tag1,
                    tag2: this.state.tag2,
                    tag3: this.state.tag3,
                    brewery_id: this.props.user.id,

                },
            });
        } else {
            this.props.dispatch({ type: 'BEER_INPUT_ERROR' });
        }
    } // end registerUser

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    render() {
        return (
            // <ProtectedBrewerRoute

            // />
            <div>
                {this.props.errors.registrationMessage && (
                    <h2
                        className="alert"
                        role="alert"
                    >
                        {this.props.errors.registrationMessage}
                    </h2>
                )}
                <form onSubmit={this.postNewBeer}>
                    <h1>Post New Beer</h1>
                    <div>
                        <label htmlFor="name">
                            Beer Name:
              <input
                                type="text"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleInputChangeFor('name')}
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="style">
                            Style, be as specific as you like
              <input
                                type="text"
                                name="style"
                                value={this.state.style}
                                onChange={this.handleInputChangeFor('style')}
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="image_url">
                            Image URL (optional):
              <input
                                type="text"
                                name="image_url"
                                value={this.state.image_url}
                                onChange={this.handleInputChangeFor('image_url')}
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="description">
                            Description - up to 1000 characters:
              <input
                                type="text"
                                name="description"
                                value={this.state.description}
                                onChange={this.handleInputChangeFor('description')}
                            />
                        </label>
                    </div>

                    <div>
                        <label htmlFor="release">
                            Release Date:
              <input
                                type="date"
                                name="release"
                                value={this.state.release}
                                onChange={this.handleInputChangeFor('release')}
                            />
                        </label>
                    </div>

{/* //////////////////////////////this is where the style tags will be input */}

                    <div><TagSelector/></div>


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

export default connect(mapStateToProps)(BeerAddPage);

