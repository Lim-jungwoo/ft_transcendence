import styled from 'styled-components';


const GameCenterDiv = styled.div`
    text-align: center;
`;

const GameCenterImg = styled.img`
    width: 480px;
    height: 360px;
    margin: 25px;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-user-drag: none;
    user-drag: none;
    -webkit-touch-callout: none;
`;

export default function GamMapBig({ imgSrc }: { imgSrc: string }) {
    return (
        <GameCenterDiv>
            <GameCenterImg src={imgSrc} alt="chiose img" />
        </GameCenterDiv>
    );
}