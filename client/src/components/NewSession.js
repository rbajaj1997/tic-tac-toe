import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';

//import io from 'socket.io-client';
import socket from '../api/port';

export default function NewSession(props) {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [username, setUsername] = useState('');
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
        if (username !== '') {
            setDialogOpen(false);
            setIncomplete(false);
            socket.emit("create-session", username);
        } else {
            event.preventDefault();
            setIncomplete(true);
            // TODO: Give a warning
        }

    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    return (
        <div>
            <Button variant="contained" color="primary" size="large" onClick={handleClickOpen}>
                Create Session
            </Button>
            <Dialog open={isDialogOpen} onClose={handleClose} aria-labelledby="form-dialog-create-session">
                {incomplete && <Alert severity="error">Please enter your username</Alert>}
                <DialogTitle id="form-dialog-title"> Create a Session</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To create a new session, please enter your username and hit the join button
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="username"
                        label="Username"
                        type="text"
                        fullWidth
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSumbit} color="primary">
                        Create & Join
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
