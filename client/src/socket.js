import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

export default socket;
