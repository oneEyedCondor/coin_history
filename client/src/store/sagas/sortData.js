import { takeEvery, call, put, select } from 'redux-saga/effects';
import axios from 'axios';

import { ACTION_SORT_DATA } from '../constants/priceHistory';
import { saveData, saveSort } from '../actions/priceHistory';

const fetchData = async (limit, sortBy, sortOrder) => {
    try {
        const url = `${process.env.REACT_APP_API_URL}/history`;

        const { data: response } = await axios.get(url, {
            params: { limit, sortBy, sortOrder },
        });

        const { isError, objects } = response;
        return !isError ? objects : [];
    } catch (err) {
        console.error(err);
    }
};

function* workerSortData(action) {
    let {
        itemsPerPage: limit,
        sortBy,
        sortOrder,
    } = yield select((state) => state.priceHistory);

    if (sortBy === action.payload) {
        sortOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC';
    } else {
        sortBy = action.payload;
        sortOrder = 'ASC';
    }

    yield put(
        saveSort({
            sortBy,
            sortOrder,
        })
    );

    const data = yield call(() => fetchData(limit, sortBy, sortOrder));
    yield put(saveData(data));
}

export default function* watchSortData() {
    yield takeEvery(ACTION_SORT_DATA, workerSortData);
}
