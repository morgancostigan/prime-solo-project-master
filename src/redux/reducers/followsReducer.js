const followsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_FOLLOWS':
            return action.payload;
        default:
            return state;
    }
};

// follows will be on the redux state at:
// state.follows
export default followsReducer;