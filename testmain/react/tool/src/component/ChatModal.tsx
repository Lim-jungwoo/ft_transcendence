import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import SvgButton from './SvgButton';

const ModalBaseDiv = styled.div<{ isType?: string }>`
    width: 300px;
    ${(props) => (props.isType === "protected" ? css`height: 180px;` : css`height: 150px`)};
    display: grid;
    ${(props) => (props.isType === "protected" ? css`grid-template-rows: 40px 150px;` : css`grid-template-rows: 40px 110px`)};
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
`;

const ModalBaseHeader = styled.header`
    background-color: #CFD8DC;
    text-align: right;
`;

const ModalBaseInput = styled.input.attrs(() => ({
    type: 'password'
}))`
    margin-top: 10px;
    font-size: 1rem;
`;

const ModalBaseMain = styled.main`
    background-color: #90A4AE;
`;

const ModalBaseBtn = styled.button`
    border: 0;
    font-size: 1rem;
    border-radius: 10px;
    width: 100px;
    height: 35px;
    margin: 10px;
    background-color: #2979FF;
    &:active {
        background-color: #2962FF
    }
`;

const ModalBaseP = styled.p<{ isError?: number }>`
    ${(props) => (props.isError === 1 ? css`font-size: 0.5rem;` : css`font-size: 1rem;`)};
    ${(props) => (props.isError === 1 ? css`margin-top: 3px;` : css`margin-top: 20px;`)};
    ${(props) => (props.isError === 1 ? css`color: #DD2C00;` : css`color: black;`)};
`;

interface ChatModelType {
    isType?: string;
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ChatBaseModal({ isType, setIsModal }: ChatModelType) {
    const [isPassWord, setIsPassWord] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const inputRef = useRef<HTMLInputElement | null>(null);
    const divRef = useRef<HTMLDivElement | null>(null);

    const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsPassWord(e.target.value);
    }

    const closeClick = () => {
        setIsModal(false);
    }

    const modalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    const checkClick = () => {
        if (isPassWord === "") {
            setErrorMsg("비번을 입력하지 않았습니다.")
            return;
        }
        setIsModal(false);
    }

    useEffect(() => {
        if (isType === 'protected')
            inputRef.current?.focus();
    }, [isType])

    return (
        <ModalBaseDiv isType={isType} ref={divRef}>
            <ModalBaseHeader>
                <SvgButton svgName='XmarkSvg' onClick={closeClick}></SvgButton>
            </ModalBaseHeader>
            <ModalBaseMain>
                <ModalBaseP>해당 채널에 들어가시겠습니까?</ModalBaseP>
                {isType === 'protected' &&
                    <form onSubmit={modalSubmit}>
                        <ModalBaseInput onChange={inputOnChange} value={isPassWord} ref={inputRef} />
                        {errorMsg !== "" && <ModalBaseP isError={1}>{errorMsg}</ModalBaseP>}
                    </form>
                }
                <ModalBaseBtn onClick={checkClick}>확인</ModalBaseBtn>
                <ModalBaseBtn onClick={closeClick}>종료</ModalBaseBtn>
            </ModalBaseMain>
        </ModalBaseDiv>
    );
}