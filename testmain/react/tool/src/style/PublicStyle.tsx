import styled, { css } from 'styled-components';

export const PublicContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
`;

export const PublicCenter = styled.div`
    margin: auto;
    border-radius: 10px;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 40px 1fr;
    gap: 5px 0;
    justify-items: center;
`;

export const PublicHeader = styled.div`
    min-width: 800px;
    min-height: 30px;
    border-radius: 10px;
    color: #ECEFF1;
    background-color: #37474F;
    text-align: right;
`;

export const PublicMiddle = styled.div<{ isLayout: string }>`
    min-width: 800px;
    min-height: 700px;
    border-radius: 10px;
    background-color: #1b1d25;
    display: grid;
    ${(props) => props.isLayout === 'Main' ? css`
        grid-template-rows: 1fr 1fr;
    ` : (props.isLayout === 'Profile' ? css`
        grid-template-columns: 1fr 1fr;
    ` : (props.isLayout === 'Game' ? css`
        grid-template-rows: 44px 184px 1fr 60px;
    ` : css`
        grid-template-rows: 44px 1fr 42px;
    `))
    }
`;