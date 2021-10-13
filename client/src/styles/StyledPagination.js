import styled from 'styled-components';

export default styled.div`
    display: flex;
    justify-content: center;

    .page-item {
    display: inline-block;
    margin: 0 0.1em;
    padding: 0.5em 0.75em;
    font-size: 0.9rem;
    line-height: 1.25;
    color: #007bff;
    background-color: #fff;
    border: 1px solid #dee2e6;
    border-radius: 2px;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
        color: #51566f;
        border-color: #8a8a8a;
        transition: 0.3s;
    }

    .active,
    .active:hover {
        color: #fff;
        background-color: #007bff;
        border-color: #007bff;
    }
`;
