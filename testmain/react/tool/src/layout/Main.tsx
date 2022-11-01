// import { useState, useEffect, useRef } from 'react';
import * as MainStyled from '../style/MainStyle'
import * as PublicStyled from '../style/PublicStyle'
import DropDown from '../component/DropDown';
import SvgButton from '../component/SvgButton';
import { Link, useSearchParams } from 'react-router-dom';
import PublicModal from '../component/PublicModal';
import { useState, useEffect } from 'react';
import { customAxios } from '../lib/customAxios';

export default function Main() {
    const [isModal, setIsModal] = useState(false);
    const [searchParams] = useSearchParams();

    const handelFriendClick = () => {
        setIsModal(!isModal);
    }

    useEffect(() => {
        const token = searchParams.get('token');
        const rtoken = searchParams.get('rtoken');
        if (token !== null && rtoken !== null) {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('rtoken');
            sessionStorage.setItem('token', token || "none");
            sessionStorage.setItem('rtoken', rtoken || "none");
            customAxios.defaults.headers['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
        }
    }, [searchParams])

    return (
        <PublicStyled.PublicContainer>
            <PublicStyled.PublicCenter>
                <PublicStyled.PublicHeader>
                    <DropDown />
                </PublicStyled.PublicHeader>
                <PublicStyled.PublicMiddle isLayout='Main'>
                    <MainStyled.MainMiddleFirst>
                        <Link to="/chat"><SvgButton svgName='ChatingSvg' /></Link>
                        <Link to="/game"><SvgButton svgName='GameSvg' /></Link>
                    </MainStyled.MainMiddleFirst>
                    <MainStyled.MainMiddleLast>
                        <SvgButton svgName='FriendSvg' onClick={handelFriendClick} />
                        {isModal && <PublicModal isType='protected' isModalNum={2} setIsModal={setIsModal} />}
                        {/* {isModal && <PublicModal isModalNum={1} setIsModal={setIsModal} />} */}
                    </MainStyled.MainMiddleLast>
                </PublicStyled.PublicMiddle>
            </PublicStyled.PublicCenter>
        </PublicStyled.PublicContainer>
    );
}