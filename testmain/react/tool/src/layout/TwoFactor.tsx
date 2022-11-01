import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as TwoFactorStyle from '../style/TwoFactorStyle';
import { customAxios } from '../lib/customAxios';
import Tfinput from '../component/TfInput';
import TfButton from '../component/TfButton';


interface emailType {
    data: {
        email: string;
    };
}

export default function TwoFactor() {
    const [mail, setMail] = useState<string>("");
    const [certNum, setCertNum] = useState<string>("");
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [restart, setRestart] = useState("null");

    const getEmail = async () => {
        try {
            const res = await customAxios.get<any, emailType>("/auth/tfa_email");
            setMail(res.data.email);
        } catch (e) {
            console.log("Error >> ", e);
        }
    }

    useEffect(() => {
        const token = searchParams.get('token');
        const rtoken = searchParams.get('rtoken');
        if (token !== null && rtoken !== null) {
            sessionStorage.setItem('token', token || "none");
            sessionStorage.setItem('rtoken', rtoken || "none");
            customAxios.defaults.headers['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
        }
        getEmail();
        setLoading(true);
    }, [searchParams])

    return (
        <TwoFactorStyle.TwoFactorContainer>
            {loading ?
                <TwoFactorStyle.TwoFactorSection>
                    <TwoFactorStyle.TwoFactorTitle stringEmail={false}>42Check Mail Verification</TwoFactorStyle.TwoFactorTitle>
                    <TwoFactorStyle.TwoFactorTitle stringEmail={true}>{mail}</TwoFactorStyle.TwoFactorTitle>
                    <Tfinput certNum={certNum} restart={restart} setCertNum={setCertNum} />
                    <TfButton certNum={certNum} setRestart={setRestart} email={mail} setCertNum={setCertNum} />
                </TwoFactorStyle.TwoFactorSection> : null}
        </TwoFactorStyle.TwoFactorContainer>
    );
}
