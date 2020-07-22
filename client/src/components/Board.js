import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import styles from './SquareStyle.module.css';
import socket from '../api/port';
import CloseIcon from '@material-ui/icons/Close';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

export default function Board(props) {
    const { gamestate, isp1 } = props;
    const squareClicked = (index) => {
        // Check if the square has already been clicked -> then return
        if (gamestate.grid[index] !== 0) {
            return;
        } else {
            // Check if it is the correct player's turn -> otherwise return
            if ((gamestate.p1_turn && !isp1) || (!gamestate.p1_turn && isp1)) {
                return;
            }
            if (isp1) {
                socket.emit("player-move", index, 1);
            } else {
                socket.emit("player-move", index, -1);
            }
        }
    }

    const valueDecider = (val) => {
        switch (val) {
            case 1:
                return <RadioButtonUncheckedIcon style={{ fontSize: 80 }}/>;
            case -1:
                return <CloseIcon style={{ fontSize: 80 }}/>;
            default:
                return null;
        }
    }

    return (
        <Grid container direction="column">
            <Grid item container>
                <button onClick={() => squareClicked(0)}
                    className={styles.button}
                >
                    {valueDecider(gamestate.grid[0])}
                </button>
                <button
                    onClick={() => squareClicked(1)}
                    className={`${styles.button} ${styles.rightLeft}`}
                >
                    {valueDecider(gamestate.grid[1])}
                </button>
                <button
                    onClick={() => squareClicked(2)}
                    className={styles.button}
                >
                    {valueDecider(gamestate.grid[2])}
                </button>
            </Grid>
            <Grid item container>
                <button
                    onClick={() => squareClicked(3)}
                    className={`${styles.button} ${styles.topBottom}`}
                >
                    {valueDecider(gamestate.grid[3])}
                </button>
                <button
                    onClick={() => squareClicked(4)}
                    className={`${styles.button} ${styles.topBottom} ${styles.rightLeft}`}
                >
                    {valueDecider(gamestate.grid[4])}
                </button>
                <button
                    onClick={() => squareClicked(5)}
                    className={`${styles.button} ${styles.topBottom}`}
                >
                    {valueDecider(gamestate.grid[5])}
                </button>
            </Grid>
            <Grid item container>
                <button
                    onClick={() => squareClicked(6)}
                    className={styles.button}
                >
                    {valueDecider(gamestate.grid[6])}
                </button>
                <button
                    onClick={() => squareClicked(7)}
                    className={`${styles.button} ${styles.rightLeft}`}
                >
                    {valueDecider(gamestate.grid[7])}
                </button>
                <button
                    onClick={() => squareClicked(8)}
                    className={styles.button}
                >
                    {valueDecider(gamestate.grid[8])}
                </button>
            </Grid>
        </Grid>
    )
}