import React, { useState, useEffect } from 'react'
import Waiting from './Waiting';
import socket from '../api/port';
import Game from './Game';

export default function Lobby(props) {
    const { gameState, roomKey, waiting, isp1 } = props;
    const [gamestate, setGameState] = useState(gameState)
    useEffect(() => {
        socket.on("update", (gamestate) => {
            setGameState(gamestate);
        })
    }, [])
    return (
        <div>
            {waiting && <Waiting roomKey={roomKey} />}
            {!waiting && <Game gamestate={gamestate} isp1={isp1} />}
        </div>
    );
}