import React, { MouseEvent, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';

import { User } from '../../models/auth.model';
import { AuthApi } from './api/auth.api';
import './App.css';
import Chat from './chat/Chat';
import Game from './game/Game';
import Header from './header/Header';
import Home from './home/Home';
import Login from './login/Login';

const SERVER_URL = 'http://localhost:3001';

export const AppContext = React.createContext({ socket: undefined as any });

function App() {
    const authApi = new AuthApi();
    const [move, setMove] = useState<Boolean>(false);
    const [chatSize, setChatSize] = useState<number>(300);
    const [user, setUser] = useState<User>();
    const [token, setToken] = useState<string|null>(sessionStorage.getItem('token'));
    const [socket, setSocket] = useState<Socket>();

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
            <Router>
                <Header user={user} authApi={authApi}/>
                {!socket ? (
                    <div className='App-login'>
                        <Login setUser={setUser} setToken={setToken} authApi={authApi} />
                    </div>
                ) : (
                    <AppContext.Provider value={ { socket } }>
                        <div className='App-main'>
                            <Routes>
                                <Route path='/' element={<Home />} />
                                <Route path='/game' element={<Game />} />
                            </Routes>
                        </div>
                        <div
                            className='App-resize'
                            onMouseDown={startResize}
                            onDoubleClick={resetResize}
                        ></div>
                        <div className='App-side'>
                            <Chat />
                        </div>
                    </AppContext.Provider>
                )}
            </Router>
        </div>
    );
}

export default App;
