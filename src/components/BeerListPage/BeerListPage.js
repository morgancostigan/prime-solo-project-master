import React, { Component } from 'react';
import { connect } from 'react-redux';
import BeerItem from '../BeerItem/BeerItem';

class BeerListPage extends Component{

    componentDidMount() {
        this.getBeerList();
    }

    getBeerList() {
        console.log('getBeerList');
        this.props.dispatch({ type: 'FETCH_BEER' })
    }//end getBeerList

    render () {
        return(
            <div style={{ display: 'flex', flexWrap: 'wrap'}}>
                <h1 class="header-text"></h1>
                {/* Render each item from the shelf reducer */}
                {this.props.reduxStore.beer.map((each) => {
                    return (<BeerItem
                        key={each.id}
                        id={each.id} //this is NEEDED for delete
                        image={each.logo_url}
                        description={each.description}
                        beer={each.beer_name}
                        release={each.release}
                        brewery={each.name}
                        style={each.style}
                        tag1={each.tag_list[0]}
                        tag2={each.tag_list[1]}
                        tag3={each.tag_list[2]} />);
                })}
            </div>
        )
    }
}

// Instead of taking everything from state, we just want the beer info.
const mapStateToProps = reduxStore => ({
    reduxStore,
});

export default connect(mapStateToProps)(BeerListPage);