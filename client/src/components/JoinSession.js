import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//import io from 'socket.io-client';
import socket from '../api/port';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));



export default function JoinSession() {
    const classes = useStyles();
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [roomKey, setRoomKey] = useState('');
    const [invalid, setInvalid] = useState(false);
    const [incomplete, setIncomplete] = useState(false);

    const handleClickOpen = () => {
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
        setIncomplete(false);
    };

    const handleSumbit = (event) => {
        // Logic to Come Here
        if (username !== '' && roomKey !== '') {
            setDialogOpen(false);
            setIncomplete(false);
            socket.emit("join-session", roomKey, username);
        } else {
            event.preventDefault();
            setIncomplete(true);
        }
    };

    useEffect(() => {
        socket.on("invalid-roomkey", () => {
            setInvalid(true);
        })
    }, [])

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setInvalid(false);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleRoomKeyChange = (event) => {
        setRoomKey(event.target.value);
    };

    return (
        <div>
            <Button variant="contained" size="large" color="primary" onClick={handleClickOpen}>
                Join a Session
            </Button>
            <Snackbar
                open={invalid}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                onClose={handleSnackBarClose}
            >
                <Alert variant="filled" severity="error">Invalid Room Key. Please try again.</Alert>
            </Snackbar>
            <Dialog open={isDialogOpen} onClose={handleClose} aria-labelledby="form-dialog-create-session">
                {incomplete && <Alert severity="error">Please enter username & room key</Alert>}
                <DialogTitle id="form-dialog-title">Join a Session</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To join a session, please enter your username and room key
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="username"
                        label="Username"
                        type="text"
                        fullWidth
                        required
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <TextField
                        margin="dense"
                        id="roomkey"
                        label="Room Key"
                        type="text"
                        fullWidth
                        required
                        value={roomKey}
                        onChange={handleRoomKeyChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSumbit} color="primary">
                        Join
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
