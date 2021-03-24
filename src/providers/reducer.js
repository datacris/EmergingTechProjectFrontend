export const initialState = {
    user: null,
    endpoint_API: 'http://localhost:3000',
};

const reducer = (state, action) => {

    console.log(action);

    switch (action.type) {
        case 'ACTION':
            return {            };

        default:
            return state;
    }
};

export default reducer;