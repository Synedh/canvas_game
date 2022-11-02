import React, { MouseEvent, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Chat from './chat/Chat';
import Game from './game/Game';
import Header from './header/Header';
import Home from './home/Home';
import Login from './login/Login';

function App() {
    const [move, setMove] = useState<Boolean>(false);
    const [chatSize, setChatSize] = useState<number>(300);
    const [login, setLogin] = useState<{ username: string }>();

    const startResize = () => setMove(true);
    const resetResize = () => setChatSize(300);

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
                <Header login={login}/>
                {!login ? (
                    <div className='App-login'>
                        <Login setLogin={setLogin} />
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
                            <Chat />
                        </div>
                    </>
                )}
            </Router>
        </div>
    );
}

export default App;
