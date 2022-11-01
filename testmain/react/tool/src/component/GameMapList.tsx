import styled from 'styled-components';
import React, { useEffect, useState } from 'react';

const MapImage = styled.img<{ isActive: boolean }>`
    width: 200px;
    height: ${(props) => (props.isActive ? '144px' : '150px')};
    margin: 15px;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-user-drag: none;
    user-drag: none;
    -webkit-touch-callout: none;
    border: ${(props) => (props.isActive ? '3px solid #aa00ff;' : '0')};
    &:active {
        border: 3px solid #aa00ff;
        height: 144px; 
    }
`;

const MapDiv = styled.div`
    text-align: center;
`;

interface mapListType {
    imgSrc: string[];
    setMapCounter: React.Dispatch<React.SetStateAction<number>>;
}

export default function GameMapList({ imgSrc, setMapCounter }: mapListType) {
    const [useImgUrl, setUseImgUrl] = useState<string[]>([]);
    const [useActive, setUseActive] = useState(0);

    useEffect(() => {
        setUseImgUrl(imgSrc);
    }, [imgSrc])

    const handelImgClick = (e: React.MouseEvent<HTMLImageElement>) => {
        if ((e.target as HTMLImageElement).id === "img_0") {
            setUseActive(0);
            setMapCounter(0);
        } else if ((e.target as HTMLImageElement).id === "img_1") {
            setUseActive(1);
            setMapCounter(1);
        } else if ((e.target as HTMLImageElement).id === "img_2") {
            setUseActive(2);
            setMapCounter(2);
        }
    }
    return (
        <MapDiv>
            {useImgUrl.map((imgs, index) => {
                return (
                    <MapImage key={index} id={`img_${index}`} isActive={index === useActive ? true : false} src={imgs} onClick={handelImgClick}></MapImage>
                );
            })}
        </MapDiv>);
}