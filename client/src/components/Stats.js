import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Stats(props) {
    const { gamestate, isp1 } = props;

    const wins = isp1 ? gamestate.p1_score : gamestate.p2_score;
    const losses = isp1 ? gamestate.p2_score : gamestate.p1_score;
    const ties = gamestate.ties;

    return (
        <Grid container direction="column" spacing={6}>
            <Grid item>
                <Typography variant="h5" gutterBottom>
                    {isp1 ? gamestate.p1_turn ? "Your turn" : `${gamestate.p2_name}'s turn` : null}
                    {!isp1 ? !gamestate.p1_turn ? "Your turn" : `${gamestate.p1_name}'s turn` : null}
                </Typography>
            </Grid>
            <Grid item>
                {((isp1 && !gamestate.p1_turn) || (!isp1 && gamestate.p1_turn)) ? <CircularProgress /> : null}
            </Grid>
            <Grid container item direction="column" spacing={4}>
                <Grid container item spacing={3}>
                    <Grid item>
                        Wins
                    </Grid>
                    <Grid item>
                        Ties
                    </Grid>
                    <Grid item>
                        Losses
                    </Grid>
                </Grid>
                <Grid container item spacing={3}>
                    <Grid item>
                        {wins}
                    </Grid>
                    <Grid item>
                        {ties}
                    </Grid>
                    <Grid item>
                        {losses}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}