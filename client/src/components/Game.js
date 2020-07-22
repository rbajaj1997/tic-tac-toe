import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import socket from '../api/port';
import Board from './Board';
import Grid from '@material-ui/core/Grid';
import Stats from './Stats';

/**
 * 
 * 1 -> Player 1 i.e He is O
 * -1 -> Player 2 i.e He is X
 */

const useStyles = makeStyles({
    mainGrid: {
        //border: '1px solid black',
        height: '100vh'
    },
    board: {
        // border: '1px solid black',
        textAlign: 'center'
    },
    info: {
        //border: '1px solid black',
    }
});

export default function Game(props) {
    const { gamestate, isp1 } = props;
    const classes = useStyles();
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
            }
            setTimeout(() => {
                setAnnouncement(false);
            }, 1250);
        });

        socket.on("user-disconnected", () => {
            setOppDisconnected(true);
        })

    }, [])

    return (
        <Grid container spacing={4} xs={12} className={classes.mainGrid} justify="space-evenly" alignItems="center">
            {oppDisconnected && <div>Opponent Disconnected!</div>}
            <Grid className={classes.board}  >
                {!oppDisconnected && <Board gamestate={gamestate} isp1={isp1} />}
            </Grid>
            <Grid item className={classes.info} >
                {announcement && <div>{msg}</div>}
                {!announcement && <Stats gamestate={gamestate} isp1={isp1} />}
            </Grid>
        </Grid>
    )
}