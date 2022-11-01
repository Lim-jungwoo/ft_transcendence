import { Link } from 'react-router-dom';
import * as PublicStyle from '../style/PublicStyle';
import ProfileRight from '../component/ProfileRight';
import ProfileLeft from '../component/ProfileLeft';
import SvgButton from '../component/SvgButton';

export default function Profile() {

    return (
        <PublicStyle.PublicContainer>
            <PublicStyle.PublicCenter>
                <PublicStyle.PublicHeader>
                    <Link to="/main">
                        <SvgButton svgName='ReturnSvg'></SvgButton>
                    </Link>
                </PublicStyle.PublicHeader>
                <PublicStyle.PublicMiddle isLayout='Profile'>
                    <ProfileLeft />
                    <ProfileRight />
                </PublicStyle.PublicMiddle>
            </PublicStyle.PublicCenter>
        </PublicStyle.PublicContainer>
    )
}