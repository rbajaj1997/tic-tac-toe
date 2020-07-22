import React from 'react';
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
                return <RadioButtonUncheckedIcon style={{ fontSize: 80 }} />;
            case -1:
                return <CloseIcon style={{ fontSize: 80 }} />;
            default:
                return null;
        }
    }

    return (
        <div class="arena-board">
            <div class="arena-board_row1">
                <button onClick={() => squareClicked(0)} className="square">
                    {valueDecider(gamestate.grid[0])}
                </button>
                <button onClick={() => squareClicked(1)} className="square square_rightLeft">
                    {valueDecider(gamestate.grid[1])}
                </button>
                <button onClick={() => squareClicked(2)} className="square">
                    {valueDecider(gamestate.grid[2])}
                </button>
            </div>
            <div class="arena-board_row2">
                <button onClick={() => squareClicked(3)} className="square square_topBottom">
                    {valueDecider(gamestate.grid[3])}
                </button>
                <button onClick={() => squareClicked(4)} className="square square_rightLeft square_topBottom">
                    {valueDecider(gamestate.grid[4])}
                </button>
                <button onClick={() => squareClicked(5)} className="square square_topBottom">
                    {valueDecider(gamestate.grid[5])}
                </button>
            </div>
            <div class="arena-board_row3">
                <button onClick={() => squareClicked(6)} className="square">
                    {valueDecider(gamestate.grid[6])}
                </button>
                <button onClick={() => squareClicked(7)} className="square square_rightLeft">
                    {valueDecider(gamestate.grid[7])}
                </button>
                <button onClick={() => squareClicked(8)} className="square">
                    {valueDecider(gamestate.grid[8])}
                </button>
            </div>
        </div>
    )
}