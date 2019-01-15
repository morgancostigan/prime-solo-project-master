const calendarReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CALENDAR':
            return action.payload;
        default:
            return state;
    }
};

// calendar will be on the redux state at:
// state.calendar
export default calendarReducer;