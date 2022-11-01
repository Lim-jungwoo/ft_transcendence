import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

const StyleTr = styled.tr`
    border: 1px solid black;
`;

const StyleTd = styled.td< { isHeader: string } >`
    padding: 10px;
    color: ${(props) => (props.isHeader === 'header' ? '#6200EA' : (props.isHeader === 'Win' ? '#C62828' : (props.isHeader === 'Lose' ? '#1976D2' : '#909099')))};
    background-color: ${(props) => (props.isHeader === 'header' ? '#B388FF' : '#455A64')};
    vertical-align: middle;
`;

const StyleTable = styled.table< { trSum: string } >`
    width: 100%;
    margin: 0;
    max-height: ${(props) => props.trSum};
    margin-top: 10px;
    padding: 0;
    cursor: default;
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    text-align: center;
`;


interface tableHeader {
    name: string;
}

interface tableBody {
    gameNum: number;
    game: string;
    result: string;
    score: string;
    tagets: string;
};

const TABLE_HEADER: tableHeader[] = [
    { name: '경기' },
    { name: '결과' },
    { name: '스코어' },
    { name: '상대' },
];

const TABLE_BODY: tableBody[] = [
    { gameNum: 123123, game: '일반', result: "Win", score: "10 vs 3", tagets: "jlim" },
    { gameNum: 232323, game: '레더', result: "Lose", score: "2 vs 10", tagets: "jawpark" },
    { gameNum: 134232, game: '일반', result: "Lose", score: "7 vs 10 ", tagets: "minsunki" },
    { gameNum: 432432, game: '레더', result: "Win", score: "10 vs 2 ", tagets: "jawpark" },
    { gameNum: 111111, game: '일반', result: "Win", score: "10 vs 3", tagets: "jlim" },
    { gameNum: 222222, game: '레더', result: "Lose", score: "2 vs 10", tagets: "jawpark" },
    { gameNum: 333333, game: '일반', result: "Lose", score: "7 vs 10 ", tagets: "minsunki" },
    { gameNum: 444444, game: '레더', result: "Win", score: "10 vs 2 ", tagets: "jawpark" },
    { gameNum: 555555, game: '일반', result: "Win", score: "10 vs 3", tagets: "jlim" },
    { gameNum: 666666, game: '레더', result: "Lose", score: "2 vs 10", tagets: "jawpark" },
    { gameNum: 777777, game: '일반', result: "Lose", score: "7 vs 10 ", tagets: "minsunki" },
    { gameNum: 888888, game: '레더', result: "Win", score: "10 vs 2 ", tagets: "jawpark" },
    { gameNum: 999999, game: '일반', result: "Win", score: "10 vs 3", tagets: "jlim" },
    { gameNum: 100000, game: '레더', result: "Lose", score: "2 vs 10", tagets: "jawpark" },
    { gameNum: 100001, game: '일반', result: "Lose", score: "7 vs 10 ", tagets: "minsunki" },
    // { gameNum: 100003, game: '레더', result: "Win", score: "10 vs 2 ", tagets: "jawpark" },
];


export default function TableScore({ nabigationNum }: { nabigationNum: number }) {
    const [tableList, setTableList] = useState<tableBody[]>([]);
    const tbodyRef = useRef<HTMLTableSectionElement | null>(null);
    useEffect(() => {
        // if (tableList.length !== 0) {
        //     tableList.splice(0, tableList.length);
        // };

        const secondList: tableBody[] = [];
        TABLE_BODY.forEach((ele) => {
            if (nabigationNum === 1 && ele.game === '일반') {
                secondList.push(ele);
            } else if (nabigationNum === 2 && ele.game === '레더') {
                secondList.push(ele);
            } else if (nabigationNum === 0) {
                secondList.push(ele);
            }
        });

        setTableList(secondList);
    }, [nabigationNum])

    const tableCount: string = ((tableList.length + 1) * 30) + 'px';

    return (
        <StyleTable trSum={tableCount}>
            <thead>
                <StyleTr>
                    {TABLE_HEADER.map((list, index) => {
                        return (<StyleTd isHeader={'header'} key={index}>{list.name}</StyleTd>);
                    })}
                </StyleTr>
            </thead>
            <tbody ref={tbodyRef}>
                {tableList.map((list) => {
                    return (
                        <StyleTr key={list.gameNum}>
                            <StyleTd isHeader={'bodys'}>{list.game}</StyleTd>
                            <StyleTd isHeader={list.result}>{list.result}</StyleTd>
                            <StyleTd isHeader={'bodys'}>{list.score}</StyleTd>
                            <StyleTd isHeader={'bodys'}>{list.tagets}</StyleTd>
                        </StyleTr>
                    );
                })}
            </tbody>
        </StyleTable >
    );
}