import React, { MouseEvent, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

import { User } from '../../models/auth.model';
import { AuthApi } from './api/auth.api';
import { GameApi } from './api/game.api';
import './App.css';
import Chat from './chat/Chat';
import Game from './game/Game';
import Header from './header/Header';
import Home from './home/Home';
import Login from './login/Login';
import ToastList from './toast/ToastList';

const SERVER_URL = 'http://localhost:3001';

export const AppContext = React.createContext({ socket: undefined as any });
const authApi = new AuthApi();
const gameApi = new GameApi();

export enum Tab {
    Home = '0',
    Game = '1'
}

function App() {
    const [move, setMove] = useState<Boolean>(false);
    const [chatSize, setChatSize] = useState<number>(300);
    const [user, setUser] = useState<User>();
    const [token, setToken] = useState<string|null>(sessionStorage.getItem('token'));
    const [socket, setSocket] = useState<Socket>();
    const [activeTab, setActiveTab] = useState<Tab>(sessionStorage.getItem('activeTab') as Tab || Tab.Home);

    useEffect(() => {
        const sessionUser = sessionStorage.getItem('user');
        if (sessionUser) {
            setUser(JSON.parse(sessionUser));
        }
    }, []);

    useEffect(() => {
        if (token) {
            const newSocket = io(SERVER_URL, { auth: { token }});
            setSocket(newSocket);
            return () => { newSocket.disconnect() };
        }
    }, [token]);

    const saveActiveTab = (tab: Tab) => {
        sessionStorage.setItem('activeTab', tab);
        setActiveTab(tab);
    }
    const startResize = () => setMove(true);
    const resetResize = () => setChatSize(300);
    const resize = (event: MouseEvent) => move && setChatSize(window.innerWidth - event.clientX);
    window.addEventListener('mouseup', () => setMove(false));

    return (
        <div
            className='App'
            style={ { gridTemplateColumns: `auto 4px ${chatSize}px`, userSelect: move ? 'none' : 'auto' } }
            onMouseMove={resize}
        >
            <Header user={user} authApi={authApi} activeTab={activeTab} saveActiveTab={saveActiveTab} />
            {!socket ? (
                <div className='App-login'>
                    <Login setUser={setUser} setToken={setToken} authApi={authApi} />
                </div>
            ) : (
                <div className='App-content'>
                    <AppContext.Provider value={ { socket } }>
                        <div className='App-main'>
                            <div style={{ display: activeTab === Tab.Home ? 'block' : 'none' }}><Home /></div>
                            <div style={{ display: activeTab === Tab.Game ? 'block' : 'none' }}><Game gameApi={gameApi} /></div>
                        </div>
                        <div
                            className='App-resize'
                            onMouseDown={startResize}
                            onDoubleClick={resetResize}
                        ></div>
                        <div className='App-side'>
                            <Chat />
                        </div>
                        <ToastList />
                    </AppContext.Provider>
                </div>
            )}
        </div>
    );
}

export default App;
