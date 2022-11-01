import React from 'react';
import { BrowserRouter as Routers, Routes, Route } from 'react-router-dom';
import Home from '../layout/Home';
import Profile from '../layout/Profile';
import Main from '../layout/Main';
import Chat from '../layout/Chat';
import Game from '../layout/Game';
import TwoFactor from '../layout/TwoFactor';
import NotFound from '../layout/NotFound';


export default function Approuter() {
    return (
        <Routers>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/profile' element={<Profile />}></Route>
                <Route path='/main' element={<Main />}></Route>
                <Route path='/chat' element={<Chat />}></Route>
                <Route path='/game' element={<Game />}></Route>
                <Route path='/twofactor' element={<TwoFactor/>}></Route>
                <Route path='/*' element={<NotFound />}></Route>
            </Routes>
        </Routers>
    );
}