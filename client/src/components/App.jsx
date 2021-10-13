import React from 'react';

import ScanInterval from '../containers/ScanInterval';
import PriceHistory from '../containers/PriceHistory';
import Pagination from '../containers/Pagination';

export default () => {
    return (
        <main>
            <ScanInterval />
            <PriceHistory />
            <Pagination />
        </main>
    );
};
