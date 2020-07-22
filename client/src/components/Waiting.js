import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
    snackBar: {
        '@media (min-width: 600px)': {
            bottom: '40px'
        }
    }
}));


export default function Waiting(props) {
    const classes = useStyles();
    const [openCopyMessage, setOpenCopyMessage] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(props.roomKey);
        setOpenCopyMessage(true);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenCopyMessage(false);
    };

    return (
        <Grid container direction="column" spacing={4} xs={12} justify="center" alignItems="center" style={{ minHeight: '100vh', textAlign: 'center' }}>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                classes={{ anchorOriginBottomLeft: classes.snackBar }}
                open={openCopyMessage}
                autoHideDuration={2000}
                onClose={handleClose}
                message="Room Key Copied!"
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                } />
            <Grid item>
                <Typography variant="h5" gutterBottom>
                    Waiting for someone to join
                </Typography>
            </Grid>
            <Grid item>
                <CircularProgress />
            </Grid>
            <Grid item>
                <Typography variant="h6" gutterBottom>
                    Click to Copy Session Code:
                </Typography>
            </Grid>
            <Grid item style={{ marginTop: '-2rem' }}>
                <Button variant="contained" color="default" onClick={handleCopy}>
                    {props.roomKey}
                </Button>
            </Grid>
        </Grid>
    );
}
