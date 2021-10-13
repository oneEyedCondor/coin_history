import { takeEvery, call, put } from 'redux-saga/effects';

import { ACTION_UPDATE_INTERVAL } from '../constants/interval';
import { saveInterval } from '../actions/interval';

const updateInterval = async (interval) => {
    try {
        const url = `${process.env.REACT_APP_API_URL}/interval`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ interval }),
        });
        const { isError, object } = await response.json();
        return !isError ? object.interval : null;
    } catch (err) {
        console.error(err);
    }
};

function* workerUpdateInterval(action) {
    const interval = yield call(() => updateInterval(action.payload));
    if (interval) {
        yield put(saveInterval(interval));
    }
}

export default function* watchUpdateInterval() {
    yield takeEvery(ACTION_UPDATE_INTERVAL, workerUpdateInterval);
}
