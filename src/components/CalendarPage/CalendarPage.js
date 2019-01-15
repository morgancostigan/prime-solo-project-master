import React, { Component } from 'react';
import { connect } from 'react-redux';
import PortfolioItem from '../PortfolioItem/PortfolioItem';

class CalendarPage extends Component {

    componentDidMount() {
        this.getMyCalendar();
    }

    getMyCalendar() {
        // console.log('getMyCalendar');
        this.props.dispatch({
            type: 'FETCH_CALENDAR',
            payload: this.props.reduxStore.user.id
        });
    }//end getMyCalendar

    render() {
        return (
            <div>
                {/* <p> {JSON.stringify({this.props.reduxStore.beer})} </p> */}
            <h3>Your Saved Beers</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {/* Render each item from the beer reducer */}
                    {this.props.reduxStore.calendar.map((each) => {
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

export default connect(mapStateToProps)(CalendarPage);