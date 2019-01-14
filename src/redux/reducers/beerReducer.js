const beerReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_BEER':
            return action.payload;         
        default:
            return state;
    }
};

// beer will be on the redux state at:
// state.beer
export default beerReducer;