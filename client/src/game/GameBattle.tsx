import React, {useContext, useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { SocketContext } from '../App';

import { Battle } from '../../../models/game.model';
import Base from './game/base';
import { GameApi } from '../api/game.api';

interface GameBattleProps {
    gameApi: GameApi
    battleId: string;
}

function GameBattle({ gameApi, battleId }: GameBattleProps) {
    const socket = useContext(SocketContext) as Socket;
    const baseCanvasElement = useRef<HTMLCanvasElement>(null);
    const fpsCounter = useRef<HTMLCanvasElement>(null);
    const [battle, setBattle] = useState<Battle>();
    const [baseCanvas, setBaseCanvas] = useState<Base>();

    const handleClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        baseCanvas?.click(event.clientX, event.clientY);
    }

    useEffect(() => {
        if (battle && !baseCanvas && baseCanvasElement.current) {
            const base = new Base(
                socket,
                battle,
                baseCanvasElement.current!,
                fpsCounter.current!
            );
            setBaseCanvas(base);
        }
    }, [battle, baseCanvas, baseCanvasElement, socket]);

    useEffect(() => {
        async function getBattle() {
            setBattle(await gameApi.getBattle(battleId));
        }
        getBattle();
    }, [gameApi, battleId]);

    useEffect(() => {
        if (baseCanvas) {
            socket.on(`${battleId}:add_entity`, (entity) => baseCanvas.addEntity(entity));
            socket.on(`${battleId}:move_entity`, (entityId, moves) => baseCanvas.moveEntity(entityId, moves));
            socket.on(`${battleId}:remove_entity`, (entityId) => baseCanvas.removeEntity(entityId));
        }
    }, [socket, baseCanvas, battleId]);

    return (
        <div className='GameBattle'>
            {battle ? (
                <>
                <div className='GameBattle-fps'>
                    FPS: <span ref={fpsCounter}>0</span>
                </div>
                <canvas className={`base_${battle.id}`} ref={baseCanvasElement} onClick={handleClick} />
                </>
            ) : (
                <div>Waiting...</div>
            )}
        </div>
    );
}

export default GameBattle;
