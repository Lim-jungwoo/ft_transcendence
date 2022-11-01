import styled from 'styled-components';
import { useEffect, useState } from 'react';

const Toggle = styled.div<{ isOn: boolean, isDisabled: boolean }>`
    position: relative;
    width: 100px;
    height: 40px;
    margin: 5px 0;
    border-radius: 30px;
    display: flex;
    align-item: center;
    cursor: pointer;
    transition: background-color 200ms linear;
    border: ${(props) => (props.isDisabled === false ? '2px solid #aa00ff' : '0')};
    background-color: ${(props) => (props.isOn === true ? '#B388FF' : '#343434')};

    &:before{
        position: absolute;
        content: '';
        width: 34px;
        height: 34px;
        border-radius: 50%;
        margin: 3px 3px 0 3px;
        background-color: ${(props) => (props.isOn === true ? '#aa00ff' : '#424242')};
        display: flex;
        align-item: center;
        justify-content: center;
        left: ${(props) => (props.isOn === true ? '59px' : '0')};
        transition: left 200ms linear;
    }
`;

const Namediv = styled.div`
    display: flex;
    width: 300px;
    color: #aa00ff;
    cursor: default;
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
`
const NameContent = styled.p`
    height: 40px;
    justify-content: center;
    text-align: center;
    vertical-align: middle;
    font-size: 1rem;
    margin-right 5px;
    padding-top: 15px;
`;

interface toggleType {
    isDisabled: boolean,
    isCheck: boolean,
    setIsTfa: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ToggleCheck({ isDisabled, isCheck, setIsTfa }: toggleType) {
    const [isOpen, setIsOpen] = useState(isCheck);
    const handleChange = () => {
        if (isDisabled === false) {
            setIsOpen(!isOpen);
        }
    }

    useEffect(() => {
        setIsTfa(isOpen);
    }, [isOpen, setIsTfa])

    return (
        <Namediv>
            <NameContent>2차 인증</NameContent>
            <Toggle isOn={isOpen} isDisabled={isDisabled} onClick={handleChange}></Toggle>
        </Namediv>);
}