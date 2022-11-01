import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ListUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #343434;
`;

const ListLi = styled.li<{ isNumCheck: boolean }>`
  float: left;
  padding: 14px;
  
  text-align: center;
  cursor: default;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  background-color: ${(props) => props.isNumCheck ? '#263238' : '#343434'};
  color: ${(props) => props.isNumCheck ? '#aa00ff' : '#909099'};
  &:hover {
    background-color: #424242;
  }
  &:active {
    background-color: #263238;
    color: #aa00ff;
  }
`;

interface nabigationType {
  isListHeader: string;
  setNabigationNum: React.Dispatch<React.SetStateAction<number>>;
}

export default function NabigationBar({ isListHeader, setNabigationNum }: nabigationType) {
  const [inListLi, setListLi] = useState<string[]>([]);
  const [isNums, setIsNums] = useState(0);

  useEffect(() => {
    setListLi(isListHeader.split(','));
  }, [setListLi, isListHeader])

  const onListClick = (e: React.MouseEvent<HTMLLIElement>) => {
    for (let i = 0; i < inListLi.length; i++) {
      if ((e.target as HTMLLIElement).innerText === inListLi[i]) {
        setIsNums(i);
        setNabigationNum(i);
      }
    }
  }

  return (
    <ListUl>
      {inListLi.map((item, index) => {
        return (
          <ListLi key={index} isNumCheck={index === isNums ? true : false} onClick={onListClick}>{item}</ListLi>
        );
      })}
    </ListUl>
  );
}