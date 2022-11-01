import styled from 'styled-components';
import React, { useEffect } from 'react';

const PaginDiv = styled.div`
    width: 100%;
    height: 100%;
    text-align: center;
    display: block;
    justify-content: center;
`
const PaginNum = styled.button`
    color: white;
    height: 100%;
    font-size: 1rem;
    background-color: transparent;
    border: 0;
    padding: 0 16px;
    text-decoration: none;
    &:active {
        background-color: #6200EA;
        color: white;
        border-radius: 5px;
    }
    &:hover:not(&:active) {
        background-color: #9E9E9E;
        border-radius: 5px;
    }
`

interface pageType {
    pageNum: number;
    setPageNum: React.Dispatch<React.SetStateAction<number>>
}

export default function Paginnation({ pageNum, setPageNum }: pageType) {
    const pageCheckNum = (e: React.MouseEvent) => {
        const displayPage = (e.target as HTMLButtonElement).innerText;
        if (pageNum > 1 && displayPage === '«') {
            setPageNum((prev) => prev - 1);
        } else if (displayPage === '»') {
            setPageNum((prev) => prev + 1);
        } else if (!(displayPage === '«' || displayPage === '»'))
            setPageNum(parseInt(displayPage));
    }

    useEffect(() => {
        console.log(pageNum);
    }, [pageNum])

    return (
        <PaginDiv>
            <PaginNum onClick={pageCheckNum}>&laquo;</PaginNum>
            <PaginNum onClick={pageCheckNum}>1</PaginNum>
            <PaginNum onClick={pageCheckNum}>2</PaginNum>
            <PaginNum onClick={pageCheckNum}>3</PaginNum>
            <PaginNum onClick={pageCheckNum}>4</PaginNum>
            <PaginNum onClick={pageCheckNum}>5</PaginNum>
            <PaginNum onClick={pageCheckNum}>6</PaginNum>
            <PaginNum onClick={pageCheckNum}>&raquo;</PaginNum>
        </PaginDiv>
    );
}