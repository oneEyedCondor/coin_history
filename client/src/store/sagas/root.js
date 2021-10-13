import { all } from 'redux-saga/effects';

import watchLoadData from './loadData';
import watchSortData from './sortData';
import watchFetchInterval from './fetchInterval';
import watchUpdateInterval from './updateInterval';

export default function* rootSaga() {
    yield all([
        watchLoadData(),
        watchSortData(),
        watchFetchInterval(),
        watchUpdateInterval(),
    ]);
}
