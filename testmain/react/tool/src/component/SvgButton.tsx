import { ReactComponent as CameraSvg } from '../svgs/camera.svg';
import { ReactComponent as MenuSvg } from '../svgs/menu.svg';
import { ReactComponent as ChatingSvg } from "../svgs/chating.svg";
import { ReactComponent as FriendSvg } from "../svgs/friend.svg";
import { ReactComponent as GameSvg } from "../svgs/gamepad.svg";
import { ReactComponent as ReturnSvg } from "../svgs/return.svg";
import { ReactComponent as TrophySvg } from "../svgs/trophy.svg";
import { ReactComponent as QuestionSvg } from "../svgs/question.svg";
import { ReactComponent as PubllicSvg } from "../svgs/public.svg";
import { ReactComponent as ProtectedSvg } from "../svgs/protected.svg";
import { ReactComponent as XmarkSvg } from "../svgs/xmark.svg";
import styled from 'styled-components';

const BaseSvgButton = styled.button.attrs((props) => ({
    type: 'button',
    disabled: props.disabled
}))`
    background-color: transparent;
    border: 0;
`;

const BaseXmarkSvg = styled(XmarkSvg)`
    margin: auto;
    fill: #D32F2F;
    width: 30px;
    height: 30px;
    margin-top: 5px;
    &:active {
        fill: #EF5350;
    }
`;

const BasaeQuestionSvg = styled(QuestionSvg)`
    margin: auto;
    fill: #B388FF;
    width: 17px;
    height: 17px;
    disabled: true;
`;
const BasePublicSvg = styled(PubllicSvg)`
    margin: auto;
    fill: #B388FF;
    width: 15px;
    height: 15px;
    disabled: true;
`;
const BaseProtectedSvg = styled(ProtectedSvg)`
    margin: auto;
    fill: #B388FF;
    width: 15px;
    height: 15px;
    disabled: true;
`;

const BaseTrophySvg = styled(TrophySvg) <{ ladders?: string, isgames?: string }>`
    margin: auto;
    fill: ${(props) => (props.ladders === 'gold' ? '#ffd700' : (props.ladders === 'sliver' ? '#c0c0c0' : '#CD7F32'))};
    width: ${(props) => (props.isgames === "ok" ? '100px' : '30px')};
    height: ${(props) => (props.isgames === "ok" ? '100px' : '30px')};
`;

const BaseCameraSvg = styled(CameraSvg)`
    margin: auto;
    fill: #B388FF;
    width: 30px;
    height: 30px;
    disabled: true;
    &:active {
        fill: #7C4DFF;
        width: 28px;
        height: 28px;
    }
`;

const BaseReturnSvg = styled(ReturnSvg)`
    margin-top: 5px;
    margin-right: 10px;
    fill: #ECEFF1;
    width: 30px;
    height: 30px;
    &:active {
        fill: #B0BEC5;
        width: 28px;
        height: 28px;
    }
`;

const BaseMenuSvg = styled(MenuSvg)`
    fill: #ECEFF1;
    width: 40px;
    height: 40px;
    &:active {
        fill: #B0BEC5;
        width: 38px;
        height: 38px;
    }
`;

const BaseChatSvg = styled(ChatingSvg)`
    margin: 0;
    fill: #f5f7ff;
    width: 250px;
    height: 250px;
    &:active {
        fill: #bcc0cf;
        width: 244px;
        height: 244px;
    }
`;

const BaseFriendSvg = styled(FriendSvg)`
    margin: 0;
    fill: #f5f7ff;
    width: 250px;
    height: 250px;
    &:active {
        fill: #bcc0cf;
        width: 244px;
        height: 244px;
    }
`;

const BaseGameSvg = styled(GameSvg)`
    margin: 0;
    fill: #f5f7ff;
    width: 250px;
    height: 250px;
    &:active {
        fill: #bcc0cf;
        width: 244px;
        height: 244px;
    }
`;

interface svgType {
    svgName: string;
    isgames?: string;
    isDisabled?: boolean;
    ladders?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function SvgButton(props: svgType) {
    return (
        <BaseSvgButton onClick={props.onClick} disabled={props.isDisabled || false}>
            {props.svgName === "CameraSvg" && <BaseCameraSvg />}
            {props.svgName === "ReturnSvg" && <BaseReturnSvg />}
            {props.svgName === "MenuSvg" && <BaseMenuSvg />}
            {props.svgName === "ChatingSvg" && <BaseChatSvg />}
            {props.svgName === "FriendSvg" && <BaseFriendSvg />}
            {props.svgName === "GameSvg" && <BaseGameSvg />}
            {props.svgName === "QueSvg" && <BasaeQuestionSvg />}
            {props.svgName === "PublicSvg" && <BasePublicSvg />}
            {props.svgName === "ProtectSvg" && <BaseProtectedSvg />}
            {props.svgName === "TrophySvg" && <BaseTrophySvg ladders={props.ladders || 'copper'} isgames={props.isgames} />}
            {props.svgName === "XmarkSvg" && <BaseXmarkSvg />}
        </BaseSvgButton>
    );
}