import { takeEvery, call, put, select } from 'redux-saga/effects';
import axios from 'axios';

import { ACTION_LOAD_DATA, ACTION_PAGINATE } from '../constants/priceHistory';
import { saveData, saveTotalItems } from '../actions/priceHistory';

const fetchData = async (offset, limit, sortBy, sortOrder) => {
    try {
        const url = `${process.env.REACT_APP_API_URL}/history`;

        const { data: response } = await axios.get(url, {
            params: { offset, limit, sortBy, sortOrder },
        });

        return response;
    } catch (err) {
        console.error(err);
    }
};

function* workerLoadData() {
    const {
        currentPage,
        itemsPerPage: limit,
        sortBy,
        sortOrder,
    } = yield select((state) => state.priceHistory);
    const offset = (currentPage - 1) * limit;
    const response = yield call(() =>
        fetchData(offset, limit, sortBy, sortOrder)
    );
    const { isError, objects: data, pagination } = response;

    if (!isError) {
        yield put(saveData(data));
        yield put(saveTotalItems(pagination.count || 0));
    }
}

export default function* watchLoadData() {
    yield takeEvery(ACTION_LOAD_DATA, workerLoadData);
    yield takeEvery(ACTION_PAGINATE, workerLoadData);
}
