import React, { Component } from 'react';
import { connect } from 'react-redux';
import PortfolioItem from '../PortfolioItem/PortfolioItem';

class Portfolio extends Component {

    componentDidMount() {
        this.getOurBeerList();
    }

    getOurBeerList() {
        // console.log('getOurBeerList');
        this.props.dispatch({
            type: 'FETCH_OUR_BEER',
            payload: this.props.reduxStore.user.brewery_id
        });
    }//end getOurBeerList

    render() {
        return (
            <div>
                {/* <p> {JSON.stringify({this.props.reduxStore.beer})} </p> */}

                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {/* Render each item from the beer reducer */}
                    {this.props.reduxStore.beer.map((each) => {
                        return (<PortfolioItem
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
            </div>
        )
    }
}

// Instead of taking everything from state, we just want the beer info.
const mapStateToProps = reduxStore => ({
    reduxStore,
});

export default connect(mapStateToProps)(Portfolio);