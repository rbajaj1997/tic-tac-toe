import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import styles from './SquareStyle.module.css';

/**
 * 
 * 1 -> Player 1 i.e He is O
 * -1 -> Player 2 i.e He is X
 */

export default function Board(props) {
    const { isp1 } = props;
    const init = {
        p1_name: "",
        p2_name: "",
        p1_score: 0,
        p2_score: 0,
        ties: 0,
        p1_turn: true,
        grid: [0, 1, 0, 0, -1, 0, 0, 1, 1]
    };
    const [gamestate, setGameState] = useState(init);

    const squareClicked = (index) => {
        console.log('Square Clicked!');
        if (gamestate.grid[index] !== 0) {
            return;
        } else {
            if (isp1) {
                setGameState((prevState) => {
                    let newGrid = prevState.grid;
                    newGrid[index] = 1;
                    return { ...prevState, grid: newGrid }
                });
            } else {
                setGameState((prevState) => {
                    let newGrid = prevState.grid;
                    newGrid[index] = -1;
                    return { ...prevState, grid: newGrid }
                });
            }
        }
    }

    const valueDecider = (val) => {
        switch (val) {
            case 1:
                return 'O';
            case -1:
                return 'X';
            default:
                return null;
        }
    }

    return (
        <Grid container direction="column">
            <Grid item container>
                <button onClick={() => squareClicked(0)} className={styles.button}>{valueDecider(gamestate.grid[0])}</button>
                <button onClick={() => squareClicked(1)} className={styles.button}>{valueDecider(gamestate.grid[1])}</button>
                <button onClick={() => squareClicked(2)} className={styles.button}>{valueDecider(gamestate.grid[2])}</button>
            </Grid>
            <Grid item container>
                <button onClick={() => squareClicked(3)} className={styles.button}>{valueDecider(gamestate.grid[3])}</button>
                <button onClick={() => squareClicked(4)} className={styles.button}>{valueDecider(gamestate.grid[4])}</button>
                <button onClick={() => squareClicked(5)} className={styles.button}>{valueDecider(gamestate.grid[5])}</button>
            </Grid>
            <Grid item container>
                <button onClick={() => squareClicked(6)} className={styles.button}>{valueDecider(gamestate.grid[6])}</button>
                <button onClick={() => squareClicked(7)} className={styles.button}>{valueDecider(gamestate.grid[7])}</button>
                <button onClick={() => squareClicked(8)} className={styles.button}>{valueDecider(gamestate.grid[8])}</button>
            </Grid>
        </Grid>
    )
}