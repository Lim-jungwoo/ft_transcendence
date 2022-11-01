import * as PublicStyled from '../style/PublicStyle'
import { useEffect, useState } from 'react';
import SvgButton from '../component/SvgButton';
import { Link } from 'react-router-dom';
import NabigationBar from '../component/NabigationBar';
import GameMapList from '../component/GameMapList';
import GamMapBig from '../component/GameMapBig';
import GameStartButton from '../component/GameStartButton';
import LadderScore from '../component/LadderScore';
import oneImg from '../images/joker.png';
import twoImg from '../images/ace.png';
import threeImg from '../images/diamond.png';
import fourImg from '../images/question.png';


const TEST_IMGURL = [oneImg, twoImg, threeImg];
const TEST_ISS = fourImg;

export default function Game() {
    const [nabigationNum, setNabigationNum] = useState(0);
    const [mapCounter, setMapCounter] = useState(0);

    useEffect(() => {
        setMapCounter(0);
    }, [nabigationNum])

    return (
        <PublicStyled.PublicContainer>
            <PublicStyled.PublicCenter>
                <PublicStyled.PublicHeader>
                    <Link to="/main">
                        <SvgButton svgName='ReturnSvg'></SvgButton>
                    </Link>
                </PublicStyled.PublicHeader>
                <PublicStyled.PublicMiddle isLayout='Game'>
                    <NabigationBar isListHeader='일반전,경쟁전' setNabigationNum={setNabigationNum}></NabigationBar>
                    {nabigationNum === 0 && <GameMapList imgSrc={TEST_IMGURL} setMapCounter={setMapCounter}></GameMapList>}
                    {nabigationNum === 1 && <LadderScore isgames="ok" ladders='gold' scores='1692PT'></LadderScore>}
                    <GamMapBig imgSrc={nabigationNum === 0 ? TEST_IMGURL[mapCounter] : TEST_ISS}></GamMapBig>
                    <GameStartButton mapCounter={mapCounter} ladderCheck={nabigationNum}></GameStartButton>
                </PublicStyled.PublicMiddle>
            </PublicStyled.PublicCenter>
        </PublicStyled.PublicContainer>
    )
}