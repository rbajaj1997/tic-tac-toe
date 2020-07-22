import React from 'react';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Stats(props) {
    const { gamestate, isp1 } = props;

    const wins = isp1 ? gamestate.p1_score : gamestate.p2_score;
    const losses = isp1 ? gamestate.p2_score : gamestate.p1_score;
    const ties = gamestate.ties;


    return (
        <div className="arena-stats">
            <div className="arena-stats__turn">
                <Typography variant="h6">
                    {isp1 ? gamestate.p1_turn ? "Your turn" : `${gamestate.p2_name}'s turn` : null}
                    {!isp1 ? !gamestate.p1_turn ? "Your turn" : `${gamestate.p1_name}'s turn` : null}
                </Typography>
            </div>
            <div className="arena-stats__spinner">
                {((isp1 && !gamestate.p1_turn) || (!isp1 && gamestate.p1_turn)) ? <CircularProgress /> : null}
            </div>
            <div className="arena-stats__score">
                <div className="arena-stats__score--title">
                    <div>
                        <span className="full-text"><Typography variant="h6">Wins</Typography></span>
                        <span className="short-text"><Typography variant="h6">W</Typography></span>
                    </div>
                    <div>
                        <span className="full-text"><Typography variant="h6">Ties</Typography></span>
                        <span className="short-text"><Typography variant="h6">T</Typography></span>
                    </div>
                    <div>
                        <span className="full-text"><Typography variant="h6">Losses</Typography></span>
                        <span className="short-text"><Typography variant="h6">L</Typography></span>
                    </div>
                </div>
                <div className="arena-stats__score--score">
                    <div><Typography variant="h6">{wins}</Typography></div>
                    <div><Typography variant="h6">{ties}</Typography></div>
                    <div><Typography variant="h6">{losses}</Typography></div>
                </div>
            </div>
        </div>
    );
}