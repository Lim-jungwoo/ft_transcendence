import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const DropMain = styled.div`
    text-align: center;
    position: relative;
    display: inline-block;
`;

export const ShowHiddenDropMenu = styled.ul<{ dropOpen: boolean }>`
    display: ${(props) => (props.dropOpen ? 'block' : 'none')};
    position: absolute;
    transform: translateY(-10px) translateX(-100px);
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
`;

export const ListDropMenu = styled.li`
    background-color: #CFD8DC;
    font-size: 1.1rem;
    border-radius: 2px;
    min-width: 130px;
    border: 1px solid #343434;
    padding: 10px;
    &:active {
        background-color: #90A4AE;
        color: CFD8DC
    }
`;

export const LinkDrop = styled(Link)`
    text-decoration-line: none;
    color: black;
`