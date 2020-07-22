import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import JoinSession from './JoinSession';
import NewSession from './NewSession';


export default function Landing() {
    return (
        <Grid container direction="column" style={{ minHeight: '100vh', textAlign: 'center', marginTop: '-2rem' }} justify="center" >
            <Grid item >
                <Typography variant="h3" gutterBottom>
                    Tic-Tac-Toe
                </Typography>
            </Grid>
            <br />
            <Grid item container spacing={4} xs={12} style={{ textAlign: 'center' }} justify="center">
                <Grid item>
                    <NewSession />
                </Grid>
                <Grid item>
                    <JoinSession />
                </Grid>
            </Grid>
            <Grid item style={{ marginTop: '2rem' }}>
                <Button variant="contained" target="_blank" style={{ marginRight: '2rem' }} color="default" href="https://github.com/rbajaj1997/tic-tac-toe">
                    Github Repo
            </Button>
            </Grid>
        </Grid>
    );
}