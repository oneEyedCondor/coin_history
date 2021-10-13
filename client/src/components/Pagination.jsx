import React from 'react';

import StyledPagination from '../styles/StyledPagination';

const getPageNumbers = (totalItems, itemsPerPage) => {
    let pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    return pageNumbers;
};

export default ({ currentPage, itemsPerPage, totalItems, paginate }) => {
    const pageNumbers = getPageNumbers(totalItems, itemsPerPage);
    const displayPagination = pageNumbers.length > 1;

    return (
        <StyledPagination>
            <ul>
                {displayPagination &&
                    pageNumbers.map((number) => (
                        <li
                            key={number}
                            className={
                                currentPage === number
                                    ? 'page-item active'
                                    : 'page-item'
                            }
                            onClick={() => paginate(number)}
                        >
                            {number}
                        </li>
                    ))}
            </ul>
        </StyledPagination>
    );
};
