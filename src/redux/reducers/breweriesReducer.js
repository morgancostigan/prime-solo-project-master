const breweriesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_BREWERIES':
            let suggestions = [];
            action.payload.map((each) => {
                suggestions.push({ id: each.id, label: each.name, value: each.name })
            });
            return suggestions;
        default:
            return state;
    }
};

// breweries will be on the redux state at:
// state.breweries
export default breweriesReducer;