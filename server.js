const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const Session = require('./SessionObject').Session;
const path = require('path');

var roomToSessionMapping = {}; //only for joining lobbies
var socketToSessionMapping = {};

io.on('connection', (socket) => {

    //Create Session (Player 1)
    socket.on('create-session', (name) => {
        console.log('Inside Create Session');
        var roomKey = Math.floor(Math.random() * 1000000).toString();
        const session = new Session(socket, roomKey);
        session.SetPlayer1Name(name);
        roomToSessionMapping = { ...roomToSessionMapping, [roomKey]: session };
        socketToSessionMapping = { ...socketToSessionMapping, [socket]: session };
        socket.emit("session-created", name, roomKey);
        console.log('Session Created!');
        socket.on("disconnect", () => {
            try {
                socketToSessionMapping[socket].p2_socket.emit("user-disconnected");
            }
            catch (err) {
                console.log('Error while emiting session disconnected event', err);
            }
            delete roomToSessionMapping[roomKey];
            delete socketToSessionMapping[socket];
        })
    });

    // Join Session (Player 2)
    socket.on('join-session', (roomKey, name) => {
        console.log('Inside Join Session');
        if (roomToSessionMapping[roomKey] === undefined) {
            console.log('Invalid Room key');
            socket.emit("invalid-roomkey");
        } else {
            roomToSessionMapping[roomKey].JoinSession(name, socket);
            roomToSessionMapping[roomKey].Broadcast("valid-code", roomToSessionMapping[roomKey].gameState);
            socketToSessionMapping = { ...socketToSessionMapping, [socket]: roomToSessionMapping[roomKey] };
            delete roomToSessionMapping[roomKey];
            console.log('Session Joined!');
            socket.on("disconnect", () => {
                try {
                    socketToSessionMapping[socket].p1_socket.emit("user-disconnected");
                }
                catch (err) {
                    console.log('Error while emiting session disconnected event', err);
                }
                delete socketToSessionMapping[socket];
            })
        }
    });

    // Game Logic
    socket.on('player-move', (index, value) => {
        // Update Grid on Player Move
        socketToSessionMapping[socket].PlayerMove(index, value);
        // Check Game Status
        switch (socketToSessionMapping[socket].checkWinner()) {
            case "p1":
                socketToSessionMapping[socket].Broadcast("announcement", "p1");
                break;
            case "p2":
                socketToSessionMapping[socket].Broadcast("announcement", "p2");
                break;
            case "tie":
                socketToSessionMapping[socket].Broadcast("announcement", "tie");
                break;
            case "ongoing":
                break;
            default:
                console.log("no switch cases hit");
        }
        socketToSessionMapping[socket].Broadcast("update", socketToSessionMapping[socket].gameState);
    })
});

const port = process.env.PORT || 8090;

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}


server.listen(port, () => {
    console.log(`Listening to port ${port}`);
});