import styled from 'styled-components';

export const HomeContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
`;

export const HomeSection = styled.section`
    color: #fafafa;
    text-align: center;
    margin: auto;
`;

export const HomeTitle = styled.h1`
font-size: 5rem;
margin-bottom: 5rem;
`;

export const HomeButton = styled.button`
    background-color: transparent;
    font-size: 3rem;
    border: 2px solid white;
    color: #fafafa;
    padding: 2rem;
    border-radius: 24px;

    &:hover {
        background-color: rgba(247, 242, 242, 0.2) 
    }
`;
