import styled from 'styled-components'
import React from 'react'
import { customAxios } from '../lib/customAxios';
import { useNavigate } from 'react-router-dom';


const TwoFactorButton = styled.button`
    background-color: transparent;
    width: 300px;
    font-size: 2rem;
    border: 2px solid white;
    color: #fafafa;
    padding: 1rem;
    border-radius: 24px;

    &:hover {
        background-color: rgba(247, 242, 242, 0.2)
    }
`;

const TwoFactorReSend = styled.button`
    display: block;
    background-color: transparent;
    font-size: 1rem;
    border: 0px;
    color: #fafafa;
    margin-left: 40%;
    padding: 1rem;
    &:hover {
        color: rgba(176, 190, 197, 0.5);
    }
`;

interface tfButtonType {
    certNum: string,
    email: string,
    setRestart: React.Dispatch<React.SetStateAction<string>>,
    setCertNum: React.Dispatch<React.SetStateAction<string>>,
}

interface reEmailSendType {
    data: {
        accessToken: string,
        refreshToken: string
    },
}

export default function TfButton({ certNum, email, setRestart, setCertNum }: tfButtonType) {
    const navi = useNavigate();

    const otpCheck = (res: reEmailSendType) => {
        if (!res.data) return;
        navi("/main");
    }

    const certNumClick = async () => {
        try {
            const res = await customAxios.patch<any, reEmailSendType>("/auth/tfa_login", {
                otp: certNum,
            });
            otpCheck(res);
        } catch (e: any) {
            if (e.response.status === 401) setRestart('recheck');
        }
        setCertNum("");
    }

    const reSendClick = async () => {
        try {
            const res = await customAxios.get<any, reEmailSendType>("/auth/test2");
            if (res.data)
                setRestart("remail");
            console.log(res.data);
        } catch (e) {
            console.log("Error >> ", e);
        }
        setCertNum("");
    }
    return (
        <div>
            <TwoFactorReSend onClick={reSendClick}>인증코드 재발송</TwoFactorReSend>
            <TwoFactorButton onClick={certNumClick}>Auth</TwoFactorButton>
        </div>
    )
}