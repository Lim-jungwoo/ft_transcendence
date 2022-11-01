import React, { useRef } from 'react';
import styled from 'styled-components';

const TwoFactorInput = styled.input.attrs((props) => ({
    type: props.type,
}))`
    display: block;
    margin: 0;
    padding: 0 0 6px 0;
    width: 300px;
    border: 0;
    font-size: 1.1rem;
    border-radius: 4px;
    color: #B0BEC5;
    // color: #909099;
    background-color: #343434;
    &:focus {
      outline: none;
    }
  `;

const TwoFactorFrom = styled.form`
     display: grid;
     align-content: center;
     justify-items: center;
     padding: 2rem;
`;

const TwoFactorLabel = styled.label<{ reColor: number }>`
    color: ${(props) => (props.reColor === 1 ? '#aa00ff' : '#fafafa')};
    margin: 0;
    padding: 6px 0 6px 0;
`;

interface TfInputType {
    certNum: string,
    restart: string,
    setCertNum: React.Dispatch<React.SetStateAction<string>>,
}

export default function TfInput({ certNum, restart, setCertNum }: TfInputType) {

    const inputFocus = useRef<HTMLInputElement | null>(null);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCertNum(event.target.value);
    };
    const proSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <TwoFactorFrom onSubmit={proSubmit}>
            {restart === 'recheck' ?
                <TwoFactorLabel reColor={1}>다시 입력해 주세요.</TwoFactorLabel>
                : (restart === 'remail' ? <TwoFactorLabel reColor={1}>인증 메일이 재발송 되었습니다.</TwoFactorLabel>
                    : null)}
            <TwoFactorLabel reColor={2} htmlFor="certNum">인증번호</TwoFactorLabel>
            <TwoFactorInput id="certNum" ref={inputFocus} onChange={onChange} type="string" value={certNum} />
        </TwoFactorFrom>
    )
}