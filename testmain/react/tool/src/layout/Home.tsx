import * as HomeStyle from '../style/HomeStyle';

export default function Home() {
    return (
        <HomeStyle.HomeContainer>
            <HomeStyle.HomeSection>
                <HomeStyle.HomeTitle>42FT_TRANSCENDENCE</HomeStyle.HomeTitle>
                <HomeStyle.HomeButton onClick={() => window.location.href = (process.env.REACT_APP_LOGIN_URL || "")}>42 API LOGIN</HomeStyle.HomeButton>
            </HomeStyle.HomeSection>
        </HomeStyle.HomeContainer>
    )
}