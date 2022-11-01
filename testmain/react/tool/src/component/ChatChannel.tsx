import styled, { css } from 'styled-components';
import SvgButton from './SvgButton';

const ChatTable = styled.table< { trSum: string } >`
    width: 100%;
    margin: 0;
    max-height: ${(props) => props.trSum};
    margin-top: 10px;
    padding: 0;
    cursor: default;
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    text-align: center;
`;

const ChatTr = styled.tr`
    border: 1px solid black;
`;

const ChatTd = styled.td<{ isHeader?: string, isList: number }>`
    padding: 10px;
    color: ${(props) => (props.isHeader === 'header' ? '#6200EA' : '#909099')};
    background-color: ${(props) => (props.isHeader === 'header' ? '#B388FF' : '#455A64')};
    vertical-align: middle;
    ${(props) => props.isList === 1 ? css`
    width: 50px;
    ` : (props.isList === 2 ? css`
    width: 80px;
    ` : (props.isList === 3 ? css`
    width: 370px;
    ` : (props.isList === 4 ? css`
    width: 90px;
    ` : (props.isList === 5 ? css`
    width: 90px;
    ` : css`
    width: 180px;
    `))))}
`;

const ChatButton = styled.button.attrs((props) => ({
    type: 'button',
    disabled: props.disabled
})) <{ isHeader?: string }>`
    border: 0;
    border-radius: 25px;
    width: 80px;
    height: 20px;
    background-color: ${(props) => (props.isHeader === 'header' ? '#343434' : '#B388FF')};
    color: ${(props) => (props.isHeader === 'header' ? '#aa00ff' : '#000000')}; ;
    &:active {
        background-color: ${(props) => (props.isHeader === 'header' ? '#aa00ff' : '#343434')};
        color: ${(props) => (props.isHeader === 'header' ? '#000000' : '#aa00ff')};
    }
`;


interface tableBody {
    chatType: string;
    chatNum: number;
    chatName: string;
    buttonIn: boolean;
    buttonLeave: boolean;

}

const CHAT_BODY: tableBody[] = [
    { chatType: 'public', chatNum: 123123, chatName: '일반', buttonIn: true, buttonLeave: false },
    { chatType: 'protected', chatNum: 232323, chatName: '레더', buttonIn: true, buttonLeave: false },
    { chatType: 'public', chatNum: 134232, chatName: '일반', buttonIn: true, buttonLeave: false },
    { chatType: 'protected', chatNum: 432432, chatName: '레더', buttonIn: true, buttonLeave: false },
    { chatType: 'public', chatNum: 111111, chatName: '일반', buttonIn: true, buttonLeave: false },
    { chatType: 'protected', chatNum: 222222, chatName: '레더', buttonIn: true, buttonLeave: false },
    { chatType: 'public', chatNum: 333333, chatName: '일반', buttonIn: true, buttonLeave: false },
    { chatType: 'protected', chatNum: 444444, chatName: '레더', buttonIn: true, buttonLeave: false },
    { chatType: 'public', chatNum: 555555, chatName: '일반', buttonIn: true, buttonLeave: false },
    { chatType: 'protected', chatNum: 666666, chatName: '레더', buttonIn: true, buttonLeave: false },
    { chatType: 'public', chatNum: 777777, chatName: '일반', buttonIn: true, buttonLeave: false },
    { chatType: 'private', chatNum: 888888, chatName: '레더', buttonIn: true, buttonLeave: false },
    { chatType: 'public', chatNum: 999999, chatName: '일반', buttonIn: true, buttonLeave: false },
    // { chatType: 'private', chatNum: 100000, chatName: '레더', buttonIn: true, buttonLeave: false },
    // { chatType: 'private', chatNum: 100001, chatName: '일반', buttonIn: true, buttonLeave: false },
    // { chatType: 'public', chatNum: 555555, chatName: '일반', buttonIn: true, buttonLeave: false },
];



export default function ChatChannel({ nabigationNum }: { nabigationNum: number }) {

    const tableCount: string = ((19 + 1) * 30) + 'px';

    return (
        <ChatTable trSum={tableCount}>
            <thead>
                <ChatTr>
                    <ChatTd isList={1} isHeader="header">타입</ChatTd>
                    <ChatTd isList={2} isHeader="header">채널번호</ChatTd>
                    <ChatTd isList={3} isHeader="header">채널명</ChatTd>
                    <ChatTd isList={6} isHeader="header" colSpan={2}>
                        <ChatButton disabled={false} isHeader='header'>방생성+</ChatButton>
                    </ChatTd>
                </ChatTr>
            </thead>
            <tbody>
                {CHAT_BODY.map((item, index) => (
                    <ChatTr key={index}>
                        <ChatTd isList={1}>
                            {item.chatType === 'public' && <SvgButton svgName='PublicSvg' />}
                            {item.chatType === 'protected' && <SvgButton svgName='ProtectSvg' />}
                            {item.chatType === 'private' && <SvgButton svgName='QueSvg' />}
                        </ChatTd>
                        <ChatTd isList={2}>{item.chatNum}</ChatTd>
                        <ChatTd isList={3}>{item.chatName}</ChatTd>

                        <ChatTd isList={4}>
                            <ChatButton disabled={!item.buttonIn}>참가</ChatButton>
                        </ChatTd>
                        <ChatTd isList={5}>
                            <ChatButton disabled={!item.buttonLeave}>나가기</ChatButton>
                        </ChatTd>
                    </ChatTr>
                ))}
            </tbody>
        </ChatTable>
    )
}