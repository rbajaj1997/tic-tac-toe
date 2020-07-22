import io from 'socket.io-client';

const port = "http://localhost:8090/"; //need to change before deployment
const socket = io(port);
export default socket;