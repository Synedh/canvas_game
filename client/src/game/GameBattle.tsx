import React, {useContext, useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { AppContext } from '../App';

import { Battle } from '../../../models/game.model';
import Base from './game/base';

interface GameBattleProps {
    battleId: string;
}

function GameBattle({ battleId }: GameBattleProps) {
    const { socket } = useContext<{ socket: Socket }>(AppContext);
    const baseCanvas = useRef<HTMLCanvasElement>(null);
    const fpsCounter = useRef<HTMLCanvasElement>(null);
    const [battle, setBattle] = useState<Battle>();
    const [base, setBase] = useState<Base>();

    const handleClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        base?.click(event.clientX, event.clientY);
    }

    useEffect(() => {
        if (battle && baseCanvas.current) {
            setBase(new Base(battle, baseCanvas.current!, fpsCounter.current!));
        }
    }, [battle, baseCanvas]);

    useEffect(() => {
        socket.emit('battle:join', battleId);

        socket.on(`${battleId}:join`, setBattle);
    }, [socket, battleId]);

    return (
        <div className='GameBattle'>
            {battle ? (
                <>
                <div className='GameBattle-fps'>
                    FPS: <span ref={fpsCounter}>0</span>
                </div>
                <canvas className={`base_${battle.id}`} ref={baseCanvas} onClick={handleClick} />
                </>
            ) : (
                <div>Waiting...</div>
            )}
        </div>
    );
}

export default GameBattle;
