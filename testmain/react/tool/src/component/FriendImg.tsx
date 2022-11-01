import styled, { css } from 'styled-components';
import mainImage from '../images/mainImage.png';


const FriendImgDiv = styled.div`
    &:before {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }
`

const FriendImage = styled.img`
    width: 38px;
    height: 38px;
    margin: 0;
    border: 1px solid white;
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-user-drag: none;
    user-drag: none;
    -webkit-touch-callout: none;
    display: inline-block;
`;

const FriendState = styled.div <{ isUserState: string }>`
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    transform: translateX(-10px);
    overflow: hidden;

    ${(props) => props.isUserState === 'online' ? css`
        background-color: #76FF03;
    ` : (props.isUserState === 'offline' ? css`
        background-color: #37474F;
    ` : (props.isUserState === 'gaming' ? css`
        background-color: #FFEB3B;
    ` : css`
        background-color: #FF9800;
    `))};
`
// transform: translateY(-10px) translateX(55px);
export default function FriendImg({ friendState }: { friendState: string }) {
    return (
        <FriendImgDiv>
            <FriendImage src={mainImage} alt='friend img'></FriendImage>
            <FriendState isUserState={friendState}></FriendState>
        </FriendImgDiv>

    );
}