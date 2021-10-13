import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { ACTION_FETCH_INTERVAL } from '../constants/interval';
import { saveInterval } from '../actions/interval';

const fetchInterval = async () => {
    try {
        const url = `${process.env.REACT_APP_API_URL}/interval`;
        const { data: response } = await axios.get(url);
        const { isError, object } = response;
        return !isError ? object.interval : null;
    } catch (err) {
        console.error(err);
    }
};

function* workerFetchInterval() {
    const interval = yield call(fetchInterval);
    if (interval) {
        yield put(saveInterval(interval));
    }
}

export default function* watchFetchInterval() {
    yield takeEvery(ACTION_FETCH_INTERVAL, workerFetchInterval);
}
