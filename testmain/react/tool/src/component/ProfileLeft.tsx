import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProfileImg from './ProfileImg';
import ProfileInput from './ProfileInput';
import ToggleCheck from './ToggleCheck';
import LadderScore from './LadderScore';
import { customAxios } from '../lib/customAxios';

const ProfileFrom = styled.form`
     display: grid;
     grid-template-rows: 320px repeat(3, 68px) 50px 50px 1fr;
     align-content: center;
     justify-items: center;
`;

const ModifyButton = styled.button`
    width: 200px;
    height: 50px;
    margin-top: 4px;
    background-color: transparent;
    font-size: 1.5rem;
    border: 2px solid white;
    color: #fafafa;
    border-radius: 24px;

    &:hover {
        background-color: rgba(247, 242, 242, 0.2) 
    }
`;

interface profileInputType {
    id: number;
    typeText: string;
    baseText: string;
    valueText: string;
}

interface userInfo {
    username: string
    email: string
    laderTier: string
    laderPoint: string
}

export default function ProfileLeft() {
    const [useModify, setUseModify] = useState(true);
    const [userInfo, setUserInfo] = useState<userInfo>({
        username: "",
        email: "",
        //need a new model
        laderTier: "gold",
        laderPoint: "1692PT",
    });
    const [avator, setAvator] = useState("");
    const [nickname, setNickname] = useState("");
    const [isTfa, setIsTfa] = useState(false);


    const getUserInfo = async () => {
        try {
            //need to change api url
            const res = await customAxios.post("/user/get_user", {
                nickname: "joupark",
            });
            setUserInfo({
                username: res.data.username as string,
                email: res.data.email as string,
                laderTier: "gold",
                laderPoint: "1632PT",
            })
            setAvator("");
            setNickname(res.data.nickname);
            setIsTfa(res.data.tfa);
        } catch (e) {
            console.log("Error >> ", e);
        }
    }

    //500error
    const editUserInfo = async () => {
        try {
            const res = await customAxios.post("/user/update_user", {
                    nickname: nickname,
                    avator: avator,
                    tfa: isTfa,
            });
        } catch (e) {
            console.log("Error >> ", e);
        }
    }

    useEffect(() => {
        getUserInfo();
        customAxios.defaults.headers['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
    }, [])

    useEffect(() => {
        console.log(avator);
    },[avator])

    const listInput: profileInputType[] = [
        {
            id: 1,
            typeText: 'text',
            baseText: '닉네임',
            valueText: nickname
        },
        {
            id: 2,
            typeText: 'text',
            baseText: '인트라',
            valueText: userInfo.username
        },
        {
            id: 3,
            typeText: 'email',
            baseText: '이메일',
            valueText: userInfo.email
        }
    ];


    const leftSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const changeModify = () => {
         if (!useModify)
             editUserInfo();
        setUseModify(!useModify);
    }
    return (
        <ProfileFrom onSubmit={leftSubmit}>
            <ProfileImg isDisabled={useModify} setAvator={setAvator}></ProfileImg>
            {listInput.map((item) => {
                return (
                    <ProfileInput
                        key={item.id}
                        id={item.id}
                        baseText={item.baseText}
                        isDisabled={useModify === false && item.id === 1 ? useModify : true}
                        typeText={item.typeText}
                        valueText={item.valueText}
                        setNick={setNickname}
                    />
                );
            })}
            <LadderScore ladders={userInfo.laderTier} scores={userInfo.laderPoint}></LadderScore>
            <ToggleCheck isDisabled={useModify} isCheck={isTfa} setIsTfa={setIsTfa}></ToggleCheck>
            <ModifyButton onClick={changeModify}>{useModify ? '수정' : '등록'}</ModifyButton>
        </ProfileFrom>
    )
};
