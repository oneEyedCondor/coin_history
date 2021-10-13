import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../store/reducers/root';
import rootSaga from '../store/sagas/root';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(logger, sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
