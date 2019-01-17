import React, { Component } from 'react';
import { connect } from 'react-redux';
import TagSearcher from '../TagSearcher/TagSearcher';
import BrewerySearcher from '../BrewerySearcher/BrewerySearcher';
import { withRouter } from "react-router-dom";


class SearchPage extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_TAGS' })
        this.props.dispatch({ type: 'FETCH_BREWERIES' })
    }

    state = {
        name: '',
        style: '',
        image_url: '',
        description: '',
        release: '',
        brewery: '',
        tag1: '',
    };

    postNewBeer = (event) => {
        event.preventDefault();

        if (this.state.name && this.state.style && this.state.release && this.state.description) {
            this.props.dispatch({
                type: 'POST_BEER',
                payload: {
                    brewery_id: this.props.user.brewery_id,
                    name: this.state.name,
                    style: this.state.style,
                    release: this.state.release,
                    description: this.state.description,
                    image_url: this.state.image_url,
                    tag1: this.state.tag1,
                    tag2: this.state.tag2,
                    tag3: this.state.tag3,
                },
            })
            this.props.history.push("/home");
        } else {
            this.props.dispatch({ type: 'BEER_INPUT_ERROR' });
        }
    } // end 

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    handleUpdateTags = (property, value) => {
        this.setState({ [property]: value.id })
        // console.log('property, value', property, value);
    }

    handleUpdateBreweries = (property, value) => {
        this.setState({ [property]: value.id })
        // console.log('property, value', property, value);
    }

    render() {
        // console.log('this.state', this.state);

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
                <form className='AddBeerForm' onSubmit={this.postNewBeer}>
                    <h1>Search For Beer</h1>
                    <div><BrewerySearcher handleUpdateBreweries={this.handleUpdateBreweries} /></div>





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
                    <div><TagSearcher handleUpdateTags={this.handleUpdateTags} /></div>
                    <div>
                        <input
                            className="SubmitNewBeer"
                            type="submit"
                            name="submit"
                            value="Submit New Beer"
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
    user: state.user,
    errors: state.errors,
});

export default connect(mapStateToProps)(withRouter(SearchPage));


