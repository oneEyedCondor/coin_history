import {
    ACTION_FETCH_INTERVAL,
    ACTION_SAVE_INTERVAL,
    ACTION_UPDATE_INTERVAL,
} from '../constants/interval';

export const fetchInterval = () => ({
    type: ACTION_FETCH_INTERVAL,
});

export const saveInterval = (interval) => ({
    type: ACTION_SAVE_INTERVAL,
    payload: interval,
});

export const updateInterval = (interval) => ({
    type: ACTION_UPDATE_INTERVAL,
    payload: interval,
});
