import React, { MouseEvent, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';

import './App.css';
import Chat from './chat/Chat';
import Game from './game/Game';
import Header from './header/Header';
import Home from './home/Home';
import Login from './login/Login';
import { AuthApi } from './api/auth.api';

function App() {
    const [move, setMove] = useState<Boolean>(false);
    const [chatSize, setChatSize] = useState<number>(300);
    const [token, setToken] = useState<string>();
    const [socket, setSocket] = useState<Socket>();
    const [login, setLogin] = useState<{ username?: string, token?: string }>({
        username: sessionStorage.getItem('username') || undefined,
        token: sessionStorage.getItem('token') || undefined
    });

    useEffect(() => {
        const serverUrl = process.env.SERVER_URL || 'http://localhost:3001';
        const newSocket = io(serverUrl);
        setSocket(newSocket);
        (() => newSocket.close())();
    }, [setSocket, token])

    const startResize = () => setMove(true);
    const resetResize = () => setChatSize(300);

    const authApi = new AuthApi();

    window.addEventListener('mouseup', () => setMove(false));

    const resize = (event: MouseEvent) => {
        if (move) {
            setChatSize(window.innerWidth - event.clientX);
        }
    };

    return (
        <div
            className='App'
            style={ { gridTemplateColumns: `auto 4px ${chatSize}px`, userSelect: move ? 'none' : 'auto' } }
            onMouseMove={resize}
        >
            <Router>
                <Header login={login} authApi={authApi}/>
                {!login.username ? (
                    <div className='App-login'>
                        <Login setLogin={setLogin} authApi={authApi} />
                    </div>
                ) : (
                    <>
                        <div className='App-main'>
                            <Routes>
                                <Route path='/' element={<Home />} />
                                <Route path='/game' element={<Game />} />
                            </Routes>
                        </div>
                        <div className='App-resize' onMouseDown={startResize} onDoubleClick={resetResize}></div>
                        <div className='App-side'>
                            <Chat socket={socket!}/>
                        </div>
                    </>
                )}
            </Router>
        </div>
    );
}

export default App;
