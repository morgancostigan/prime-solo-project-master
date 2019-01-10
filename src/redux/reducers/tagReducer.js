const tagReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_TAGS':
            return action.payload;
        default:
            return state;
    }
};

// beer will be on the redux state at:
// state.tags
export default tagReducer;