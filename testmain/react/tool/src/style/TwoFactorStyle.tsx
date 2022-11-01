import styled from 'styled-components';

export const TwoFactorContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
`;

export const TwoFactorSection = styled.section`
    color: #fafafa;
    text-align: center;
    margin: auto;
`;

export const TwoFactorTitle = styled.h1<{ stringEmail: boolean }>`
    font-size: ${(props) => (props.stringEmail === true ? '2rem' : '4rem')};
    margin-bottom: 2rem;
`;
