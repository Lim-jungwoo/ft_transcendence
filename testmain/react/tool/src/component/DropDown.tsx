import React, { useState, useEffect, useRef } from 'react';
import * as DropStyle from '../style/DropStyle';
import SvgButton from '../component/SvgButton';

export default function DropDown() {
    const [dropOpen, setDropOpen] = useState(false);
    const dropRef = useRef<HTMLDivElement | null>(null)
    const openDropMenu = () => {
        setDropOpen(!dropOpen);
    };

    const logOutMenu = () => {
        sessionStorage.removeItem("token");
    }

    useEffect(() => {
        const outClickClose = (e: MouseEvent) => {
            if (dropOpen && dropRef.current && !dropRef.current.contains(e.target as HTMLElement)) {
                setDropOpen(false);
            }
        }
        if (dropOpen)
            window.addEventListener("click", outClickClose);
        return () => {
            window.removeEventListener("click", outClickClose);
        }
    }, [dropOpen])

    return (
        <DropStyle.DropMain ref={dropRef}>
            <SvgButton svgName='MenuSvg' onClick={openDropMenu}></SvgButton>
            <div>
                <DropStyle.ShowHiddenDropMenu dropOpen={dropOpen}>
                    <DropStyle.LinkDrop to="/profile">
                        <DropStyle.ListDropMenu>프로필</DropStyle.ListDropMenu>
                    </DropStyle.LinkDrop>
                    <DropStyle.LinkDrop to="/">
                        <DropStyle.ListDropMenu onClick={logOutMenu}>로그아웃</DropStyle.ListDropMenu>
                    </DropStyle.LinkDrop>
                </DropStyle.ShowHiddenDropMenu>
            </div>
        </DropStyle.DropMain>
    );
}