import React, { useState, useEffect } from 'react';
import socket from '../api/port';
import Board from './Board';
import Typography from '@material-ui/core/Typography';
import Stats from './Stats';

/**
 * 
 * 1 -> Player 1 i.e He is O
 * -1 -> Player 2 i.e He is X
 */


export default function Game(props) {
    const { gamestate, isp1 } = props;
    const [announcement, setAnnouncement] = useState(false);
    const [msg, setMsg] = useState('');
    const [oppDisconnected, setOppDisconnected] = useState(false);

    useEffect(() => {
        socket.on("announcement", (text) => {
            switch (text) {
                case 'p1':
                    setAnnouncement(true);
                    if (isp1) {
                        setMsg('You Won!');
                    } else {
                        setMsg('You Lost');
                    }
                    break;
                case 'p2':
                    setAnnouncement(true);
                    if (isp1) {
                        setMsg('You Lost');
                    } else {
                        setMsg('You Won!');
                    }
                    break;
                case 'tie':
                    setAnnouncement(true);
                    setMsg('It\'s a tie! Play another one?');
                    break;
                default:
                    break;
            }
            setTimeout(() => {
                setAnnouncement(false);
            }, 1250);
        });

        socket.on("user-disconnected", () => {
            setOppDisconnected(true);
        })

    }, [isp1])

    return (
        <div className="arena">
            {oppDisconnected && <div> <Typography variant="h4">Opponent Disconnected!</Typography> </div>}
            {!oppDisconnected && <Board gamestate={gamestate} isp1={isp1} />}
            {!oppDisconnected && announcement && <div className="arena-stats"><Typography variant="h4">{msg}</Typography></div>}
            {!oppDisconnected && !announcement && <Stats gamestate={gamestate} isp1={isp1} />}
        </div>
    )
}