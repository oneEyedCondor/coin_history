import {
    ACTION_LOAD_DATA,
    ACTION_SAVE_DATA,
    ACTION_SORT_DATA,
    ACTION_SAVE_SORT,
    ACTION_SAVE_TOTAL_ITEMS,
    ACTION_PAGINATE,
} from '../constants/priceHistory';

export const loadData = () => ({
    type: ACTION_LOAD_DATA,
});

export const saveData = (data) => ({
    type: ACTION_SAVE_DATA,
    payload: data,
});

export const sortData = (sortBy) => ({
    type: ACTION_SORT_DATA,
    payload: sortBy,
});

export const saveSort = (sort) => ({
    type: ACTION_SAVE_SORT,
    payload: sort,
});

export const saveTotalItems = (count) => ({
    type: ACTION_SAVE_TOTAL_ITEMS,
    payload: count,
});

export const paginate = (pageNumber) => ({
    type: ACTION_PAGINATE,
    payload: pageNumber,
});
