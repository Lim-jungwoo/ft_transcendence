import styled from 'styled-components';

const GameButtondiv = styled.div`
    text-align: center;
`;

const GameButton = styled.button`
    width: 200px;
    height: 48px;
    margin: 5px;
    border-radius: 25px;
    border: 0px;
    background-color: #B388FF;
    color: #000000;
    &:active {
        background-color: #343434;
        color: #aa00ff;
    }
`;

export default function GameStartButton({ mapCounter, ladderCheck }: { mapCounter: number, ladderCheck: number }) {
    const pingPongStart = () => {
        if (mapCounter === 0 && ladderCheck === 0) alert("0번 맵게임 시작");
        if (mapCounter === 1 && ladderCheck === 0) alert("1번 맵게임 시작");
        if (mapCounter === 2 && ladderCheck === 0) alert("2번 맵게임 시작");
        if (ladderCheck === 1) alert("레더 랜덤 시작");
    }
    return (
        <GameButtondiv>
            <GameButton onClick={pingPongStart}>GAME START</GameButton>
        </GameButtondiv>
    );
}