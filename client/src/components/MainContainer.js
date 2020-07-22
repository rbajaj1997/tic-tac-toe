import React, { useState, useEffect } from 'react';
import socket from '../api/port'
import Landing from './Landing';
import Lobby from './Lobby';

export default function Container() {
    const [landing, setLanding] = useState(true);
    const [lobby, setlobby] = useState(false);
    const [waiting, setWaiting] = useState(true);
    const [roomKey, setRoomKey] = useState('');
    const [isp1, setIsp1] = useState(false);

    const [gameState, setGameState] = useState({
        p1_name: "",
        p2_name: "",
        p1_score: 0,
        p2_score: 0,
        ties: 0,
        p1_turn: true,
        grid: [0, 0, 0, 0, 0, 0, 0, 0, 0]
    })

    useEffect(() => {
        socket.on("session-created", (name, newRoomKey) => {
            setGameState(prevState => ({
                ...prevState,
                p1_name: name
            }));
            setRoomKey(newRoomKey);
            setLanding(false);
            setlobby(true);
            setIsp1(true);
        });

        socket.on("valid-code", (gameState) => {
            setGameState(gameState);
            setWaiting(false);
            setLanding(false);
            setlobby(true);
        })
    }, []);

    return (
        <div>
            {landing && <Landing />}
            {lobby && <Lobby gameState={gameState} roomKey={roomKey} waiting={waiting} isp1={isp1} />}
        </div>
    )
}