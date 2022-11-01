import styled, { css } from 'styled-components';
import NabigationBar from './NabigationBar';
import SvgButton from './SvgButton';
import FriendImg from './FriendImg';
import { useState } from 'react';

const FriendDiv = styled.div`
    width: 500px;
    height: 500px;
    display: grid;
    grid-template-rows: 40px 460px;
`
const FriendHeader = styled.header`
    background-color: #CFD8DC;
    text-align: right;
`

const FriendMain = styled.main`
    background-color: #90A4AE;
`

const FriendTable = styled.table< { trSum: string } >`
    width: 100%;
    margin: 0;
    max-height: ${(props) => props.trSum};
    padding: 0;
    cursor: default;
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    text-align: center;
`;

const FriendTr = styled.tr`
    border: 1px solid black;
`;

const FriendTd = styled.td<{ isWidth: number }>`
    padding: 10px;
    color: #909099;
    background-color: #455A64;
    vertical-align: middle;
    ${(props) => props.isWidth === 0 ? css`
        width: 43px;
    ` : (props.isWidth === 1 ? css`
        width: 45px;
    ` : (props.isWidth === 2 ? css`
        width: 130px;
    ` : css`
        padding: 0;
        width: 50px;
    `))};
`;

const FriendButton = styled.button`
    width: 45px;
    height: 45px;
    border: 0;
    border-radius: 25px;
    border: 0px;
    background-color: #B388FF;
    color: #000000;
    &:active {
        background-color: #343434;
        color: #aa00ff;
    }
`;

interface FriendModelType {
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FriendModal({ setIsModal }: FriendModelType) {
    const [nabigationNum, setNabigationNum] = useState(0);
    const handelCloseModal = () => {
        setIsModal(false);
    }

    return (
        <FriendDiv>
            <FriendHeader>
                <SvgButton svgName='XmarkSvg' onClick={handelCloseModal}></SvgButton>
            </FriendHeader>
            <FriendMain>
                <NabigationBar isListHeader='전체,친구' setNabigationNum={setNabigationNum}></NabigationBar>
                <FriendTable trSum='460px'>
                    <tbody>
                        <FriendTr>
                            <FriendTd isWidth={0}>
                                <FriendImg friendState="offline"></FriendImg>
                            </FriendTd>
                            <FriendTd isWidth={1}>오프라인</FriendTd>
                            <FriendTd isWidth={2}>유저이름</FriendTd>
                            <FriendTd isWidth={3}>
                                <FriendButton>게임관전</FriendButton>
                            </FriendTd>
                            <FriendTd isWidth={3}>
                                <FriendButton>게임초대</FriendButton>
                            </FriendTd>
                            <FriendTd isWidth={3}>
                                <FriendButton>친구추가</FriendButton>
                            </FriendTd>
                        </FriendTr>
                    </tbody>
                </FriendTable>
            </FriendMain>
        </FriendDiv>
    );
}