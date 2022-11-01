import { ChangeEvent, useState, useEffect, useRef } from 'react';
import styled from "styled-components";

const BaseDiv = styled.div`
  width: 300px;
  display: block;
  margin: 5px auto 5px auto;
  padding: 0 0 0 10px;
  background-color: #343434;
  border-radius: 4px;

  &:focus-within {
    border: 3px solid #aa00ff;
  }
`;

const BaseP = styled.p`
  text-align: left;
  margin: 0;
  width: 300px;
  padding: 6px 0 6px 0;
  color: #aa00ff;
  cursor: default;
  font-size: 0.8rem;
  border-radius: 4px;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;

const BaseInput = styled.input.attrs((props) => ({
  type: props.type,
  disabled: props.disabled
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

interface inputType {
  id: number;
  typeText: string;
  baseText: string;
  isDisabled: boolean;
  valueText: string;
  setNick: React.Dispatch<React.SetStateAction<string>>;
}

export default function ProfileInput(props: inputType) {
  const [textInput, setTextInput] = useState(props.valueText);
  const inputFocus = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
    if (props.id === 1)
      props.setNick(e.target.value);
  }

  useEffect(() => {
    setTextInput(props.valueText);
  }, [props.valueText])

  useEffect(() => {
    if (props.isDisabled === false) {
      inputFocus.current?.focus();
    }
  }, [props.isDisabled])

  return (
    <BaseDiv>
      <BaseP>{props.baseText}</BaseP>
      <BaseInput type={props.typeText} onChange={handleChange} disabled={props.isDisabled}
        value={textInput} ref={inputFocus} />
    </BaseDiv>
  );
}