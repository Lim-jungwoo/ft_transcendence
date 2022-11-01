import React from 'react';
import Approuter from './routers/Approuter';
import { Reset } from 'styled-reset';
import styled from 'styled-components';

const AppDiv = styled.div`
  background-color: #121212;
  width: 100vw;
  height: 100vh;
`;

// interface getTokenType {
//   data: string,
// }

function App() {
  // const getAcessToken = async () => {
  //   try {
  //     const res = await customAxios.get<any, getTokenType>("/auth/retoken");
  //     if ((typeof res.data) === 'string' || res.data === "") {
  //       sessionStorage.removeItem("token");
  //       sessionStorage.setItem("token", res.data);
  //     }
  //   } catch (e) {
  //     console.log("Error =>", e);
  //   }
  // }

  // const timer = setInterval(() => {
  //   const acessToken = sessionStorage.getItem("token");
  //   if (!(acessToken === null || acessToken === "" || acessToken === undefined)) {
  //     getAcessToken();
  //   }
  // }, 100000);


  return (
    <React.Fragment>
      <Reset />
      <AppDiv>
        <Approuter></Approuter>
      </AppDiv>
    </React.Fragment>
  );
}

export default App;
