import React, { useEffect } from 'react';

import StyledScanInterval from '../styles/StyledScanInterval';

const ScanInterval = ({ interval, fetchInterval, updateInterval }) => {
    useEffect(() => {
        fetchInterval();
    }, []);

    const changeScanInterval = ({ target }) => {
        updateInterval(target.value);
    };

    return (
        <StyledScanInterval>
            <div className="scan-interval">
                <span>Scan interval</span>
                <select
                    name="select"
                    onChange={changeScanInterval}
                    value={interval}
                >
                    <option value="60000">1 min</option>
                    <option value="1800000">30 min</option>
                    <option value="3600000">1 hrs</option>
                </select>
            </div>
        </StyledScanInterval>
    );
};

export default ScanInterval;
