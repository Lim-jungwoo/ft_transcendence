import * as PublicStyled from '../style/PublicStyle'
import SvgButton from '../component/SvgButton';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ChatChannel from '../component/ChatChannel';
import NabigationBar from '../component/NabigationBar';
import Paginnation from '../component/Pagination';

export default function Chat() {
    const [nabigationNum, setNabigationNum] = useState(0);
    const [pageNum, setPageNum] = useState(1);

    return (
        <PublicStyled.PublicContainer>
            <PublicStyled.PublicCenter>
                <PublicStyled.PublicHeader>
                    <Link to="/main">
                        <SvgButton svgName='ReturnSvg'></SvgButton>
                    </Link>
                </PublicStyled.PublicHeader>
                <PublicStyled.PublicMiddle isLayout='Chat'>
                    <NabigationBar isListHeader='전체,참가' setNabigationNum={setNabigationNum}></NabigationBar>
                    <ChatChannel nabigationNum={nabigationNum}></ChatChannel>
                    <Paginnation pageNum={pageNum} setPageNum={setPageNum}></Paginnation>
                </PublicStyled.PublicMiddle>
            </PublicStyled.PublicCenter>
        </PublicStyled.PublicContainer>
    )
}