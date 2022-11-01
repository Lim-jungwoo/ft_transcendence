import styled from 'styled-components';
import NabigationBar from './NabigationBar';
import TableScore from './TableScore';
import Pagination from './Pagination';
import { useState } from 'react';

const ProfileMain = styled.main`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 44px 1fr 43px;
`;

export default function ProfileRight() {
    const [nabigationNum, setNabigationNum] = useState(0);
    const [pageNum, setPageNum] = useState(1);
    return (
        <ProfileMain>
            <NabigationBar isListHeader='전체,일반,레더' setNabigationNum={setNabigationNum}></NabigationBar>
            <TableScore nabigationNum={nabigationNum}></TableScore>
            <Pagination pageNum={pageNum} setPageNum={setPageNum}></Pagination>
        </ProfileMain>
    );
}