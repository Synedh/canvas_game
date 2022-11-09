import React, { useContext, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { GameApi } from '../api/game.api';
import { SocketContext } from '../App';

import './Game.css'
import GameBattle from './GameBattle';

interface GameProps {
    gameApi: GameApi;
}

function Game({ gameApi }: GameProps) {
    const socket = useContext(SocketContext) as Socket;
    const [battleIds, setBattleIds] = useState<string[]>([]);

    // useEffect(() => {
    //     const getUserBattles = async () => {
    //         const { battles } = await gameApi.getBattles();
    //         setBattleIds(battles.map(battle => battle.id));
    //     }
    //     getUserBattles();
    // }, [gameApi])

    useEffect(() => {
        socket.on('game:battles', setBattleIds);
        // socket.on('battle:join', (battleId: string) => {
        //     if (!battleIds.some(id => id === battleId)) {
        //         setBattleIds(battleIds.concat(battleId));
        //     }
        // });
    }, [socket]);

    return (
        <div className="Game">
            {battleIds.map(battleId =>
                <GameBattle key={battleId} gameApi={gameApi} battleId={battleId} />
            )}
        </div>
    );
}

export default Game;
