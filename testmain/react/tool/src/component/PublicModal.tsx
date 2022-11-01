import styled from 'styled-components'
import FriendModal from './FriendModal';
import ChatBaseModal from '../component/ChatModal';


const BaseOutDiv = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.1);
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
`;

interface PublicModalType {
    isType?: string;
    isModalNum: number;
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PublicModal({ isType, isModalNum, setIsModal }: PublicModalType) {
    return (
        <BaseOutDiv>
            {isModalNum === 1 && <FriendModal setIsModal={setIsModal} />}
            {isModalNum === 2 && <ChatBaseModal isType={isType} setIsModal={setIsModal} />}
        </BaseOutDiv>
    )
}