const serverUrl = 'http://127.0.0.1:8000';
const port = 8001;
const url = 'http://127.0.0.1:' + port;

const io = require('socket.io').listen(port);
const fs = require('fs');
const path = require('path');

const socket = require('socket.io-client')(serverUrl);

socket.on('connect', () => {
    socket.emit('register', {
        url,
        videoIds: [1, 2, 3]
    });

});


//resource server

io.sockets.on('connection', socket => {
    socket.on('query', videoId => {
        fs.readFile(path.resolve(__dirname, 'files', videoId + '.flv'), (error, data) => {
            if(data){
                socket.emit('data', data);
            }
        });
    })
});
