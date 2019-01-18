const searchReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SEARCH_RESULTS':
            return action.payload;
        default:
            return state;
    }
};

// tags will be on the redux state at:
// state.searchResults
export default searchReducer;