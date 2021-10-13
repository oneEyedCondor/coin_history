import React, { useEffect } from 'react';

import StyledPriceHistory from '../styles/StyledPriceHistory';

const PriceHistory = ({ listData, loadData, sortData }) => {
    useEffect(() => {
        loadData();
    }, []);

    const handleClick = ({ target }) => {
        const sortBy = target.dataset.sort;
        sortData(sortBy);
    };

    return (
        <StyledPriceHistory>
            <table>
                <thead>
                    <tr onClick={handleClick}>
                        <th data-sort="date">Date/Time</th>
                        <th data-sort="price">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {listData?.map((h) => (
                        <tr key={`${Date.now()}-${h.date}`}>
                            <td>{h.date}</td>
                            <td>$ {h.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </StyledPriceHistory>
    );
};

export default PriceHistory;
