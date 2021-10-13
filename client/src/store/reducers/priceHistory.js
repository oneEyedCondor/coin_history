import {
    ACTION_SAVE_DATA,
    ACTION_SAVE_SORT,
    ACTION_SAVE_TOTAL_ITEMS,
    ACTION_PAGINATE,
} from '../constants/priceHistory';

const initialState = {
    data: [],
    sortBy: 'date',
    sortOrder: 'ASC',
    currentPage: 1,
    itemsPerPage: 15,
    totalItems: 0,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTION_SAVE_DATA:
            return {
                ...state,
                data: action.payload,
            };
        case ACTION_SAVE_SORT:
            return {
                ...state,
                ...action.payload,
            };
        case ACTION_SAVE_TOTAL_ITEMS:
            return {
                ...state,
                totalItems: action.payload,
            };
        case ACTION_PAGINATE:
            return {
                ...state,
                currentPage: action.payload,
            };
        default:
            return state;
    }
};
