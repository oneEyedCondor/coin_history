import styled from 'styled-components';

export default styled.div`
    table {
        border-collapse: collapse;
        width: 100%;
        max-height: 100px;
        overflow: hidden;
    }

    thead {
        cursor: pointer;
    }

    td,
    th {
        border: 1px solid #d7f0ff;
        text-align: left;
        padding: 8px;
    }

    tr:nth-child(even) {
        background-color: #d7f0ff;
    }
`;
