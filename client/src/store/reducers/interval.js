import { ACTION_SAVE_INTERVAL } from '../constants/interval';

const initialState = {
    value: 60000,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTION_SAVE_INTERVAL:
            return {
                ...state,
                value: action.payload,
            };
        default:
            return state;
    }
};
