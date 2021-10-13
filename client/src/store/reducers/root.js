import { combineReducers } from 'redux';

import priceHistory from './priceHistory';
import interval from './interval';

export default combineReducers({
    priceHistory,
    interval,
});
