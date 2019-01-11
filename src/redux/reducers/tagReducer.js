const tagReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_TAGS': 
            let suggestions = [];
            action.payload.map((each) => {
                suggestions.push({ id: each.id, label: each.tag, value: each.tag })
            });           
            return suggestions;
        default:
            return state;
    }
};

// tags will be on the redux state at:
// state.tags
export default tagReducer;