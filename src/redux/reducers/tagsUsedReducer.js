const tagsUsedReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_TAG_DATA':
            let tagsUsed = action.payload;
            console.log('action.payload', action.payload);
            return tagsUsed
        default:
            return state;
    }
};

// tags will be on the redux state at:
// state.tagsUsed
export default tagsUsedReducer;