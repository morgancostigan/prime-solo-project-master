import React, { Component } from 'react';
import { connect } from 'react-redux';
import TagSearcher from '../TagSearcher/TagSearcher';
import BrewerySearcher from '../BrewerySearcher/BrewerySearcher';
import { withRouter } from "react-router-dom";
import SearchResultsPage from '../SearchResultsPage/SearchResultsPage';


class SearchPage extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_TAGS' })
        this.props.dispatch({ type: 'FETCH_BREWERIES' })
    }

    state = {
        release1: '',
        release2: '',
        brewery: '',
        tag1: '',
    };

    searchBeer = (event) => {
        event.preventDefault();

        if (this.state.release1 && this.state.release2 && this.state.brewery && this.state.tag1) {
            this.props.dispatch({
                type: 'SEARCH_BREWERY_RELEASE_TAG',
                payload: {
                    brewery: this.state.brewery,
                    release1: this.state.release1,
                    release2: this.state.release2,
                    tag1: this.state.tag1,
                },
            })
            this.props.dispatch({ type: 'CLEAR_SEARCH_ERROR' });

        } else if (this.state.release1 && this.state.release2 && this.state.brewery){
            this.props.dispatch({
                type: 'SEARCH_BREWERY_RELEASE',
                payload: {
                    brewery: this.state.brewery,
                    release1: this.state.release1,
                    release2: this.state.release2,
                    tag1: this.state.tag1,
                },
            })
            this.props.dispatch({ type: 'CLEAR_SEARCH_ERROR' });

        } else if (this.state.brewery && this.state.tag1) {
            this.props.dispatch({
                type: 'SEARCH_BREWERY_TAG',
                payload: {
                    brewery: this.state.brewery,
                    release1: this.state.release1,
                    release2: this.state.release2,
                    tag1: this.state.tag1,
                },
            })
            this.props.dispatch({ type: 'CLEAR_SEARCH_ERROR' });

        } else if (this.state.release1 && this.state.release2 && this.state.tag1) {
            this.props.dispatch({
                type: 'SEARCH_RELEASE_TAG',
                payload: {
                    brewery: this.state.brewery,
                    release1: this.state.release1,
                    release2: this.state.release2,
                    tag1: this.state.tag1,
                },
            })
            this.props.dispatch({ type: 'CLEAR_SEARCH_ERROR' });

        } else if (this.state.brewery) {
            this.props.dispatch({
                type: 'SEARCH_BREWERY',
                payload: {
                    brewery: this.state.brewery,
                    release1: this.state.release1,
                    release2: this.state.release2,
                    tag1: this.state.tag1,
                },
            })
            this.props.dispatch({ type: 'CLEAR_SEARCH_ERROR' });
        } else if (this.state.release1 && this.state.release2) {
            this.props.dispatch({
                type: 'SEARCH_RELEASE',
                payload: {
                    brewery: this.state.brewery,
                    release1: this.state.release1,
                    release2: this.state.release2,
                    tag1: this.state.tag1,
                },
            })
            this.props.dispatch({ type: 'CLEAR_SEARCH_ERROR' });

        } else if (this.state.tag1) {
            this.props.dispatch({
                type: 'SEARCH_TAG',
                payload: {
                    brewery: this.state.brewery,
                    release1: this.state.release1,
                    release2: this.state.release2,
                    tag1: this.state.tag1,
                },
            })
            this.props.dispatch({ type: 'CLEAR_SEARCH_ERROR' });

        } else {
            this.props.dispatch({ type: 'SEARCH_ERROR' });
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
        return (
            <div>
                {this.props.errors.searchMessage && (
                    <h2
                        className="alert"
                        role="alert" >
                        {this.props.errors.searchMessage}
                    </h2> )}
                <form className='SearchForm' onSubmit={this.searchBeer}>
                    <h1>Search For Beer</h1>
                    <div><BrewerySearcher handleUpdateBreweries={this.handleUpdateBreweries} /></div>
                    <div>
                        <label htmlFor="release1" className='releaseEntry'>
                            Release Dates:
                            <input
                                type="date"
                                name="release1"
                                value={this.state.release1}
                                onChange={this.handleInputChangeFor('release1')}/>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="release2" className='releaseEntry'>
                            thru:
                            <input
                                type="date"
                                name="release2"
                                value={this.state.release2}
                                onChange={this.handleInputChangeFor('release2')} />
                        </label>
                    </div>
                    <div><TagSearcher handleUpdateTags={this.handleUpdateTags} /></div>
                    <div>
                        <input
                            className="Search"
                            type="submit"
                            name="submit"
                            value="Search"/>
                    </div>
                </form>
                <SearchResultsPage />

            </div>
        ); // end return
    }// end render
}// end class SearchPage

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });

const mapStateToProps = state => ({
    user: state.user,
    errors: state.errors,
});

export default connect(mapStateToProps)(withRouter(SearchPage));


