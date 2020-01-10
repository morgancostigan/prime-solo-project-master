import React, { Component } from 'react';
import { connect } from 'react-redux';
import BeerItem from '../BeerItem/BeerItem';

class SearchResultsPage extends Component {

    componentDidMount() {
        this.getSearchResults();
    }

    getSearchResults() {
        // console.log('getSearchResults');
        this.props.dispatch({ type: 'FETCH_SEARCH_RESULTS' })
    }//end getSearchResults

    render() {
        return (
            <div>
                {/* {this.props.reduxStore.searchResults.length} */}
                {/* <p> {JSON.stringify({this.props.reduxStore.searchResults})} </p> */}

                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {/* Render each item from the searchResults reducer */}
                    {this.props.reduxStore.searchResults.map((each) => {
                        return (<BeerItem
                            key={each.id}
                            id={each.id} //this is NEEDED for delete
                            image={each.logo_url}
                            description={each.description}
                            beer={each.beer_name}
                            release={each.release}
                            brewery={each.name}
                            brewery_id={each.brewery_id}
                            style={each.style}
                            tag1={each.tag_list[0]}
                            tag2={each.tag_list[1]}
                            tag3={each.tag_list[2]} />);
                    })}
                </div>
            </div>
        )
    }
}

// Instead of taking everything from state, we just want the beer info.
const mapStateToProps = reduxStore => ({
    reduxStore,
});

export default connect(mapStateToProps)(SearchResultsPage);