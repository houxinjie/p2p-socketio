const queryserver = 'http://127.0.0.1:8000';

const io = require('socket.io-client');

const querysocket = io(queryserver);

const videoId = 3;

querysocket.on('connect', () => {

    querysocket.on('url', url => {
        console.log('received url: ' + url);
        if(!url) {
            return querysocket.disconnect();
        }
        const socket = io(url);
        socket.on('connect', () => {
            socket.emit('query', videoId);
        });

        socket.on('data', data => {
            console.log(data.length);
            socket.disconnect();
            querysocket.disconnect();
        });

    });


    querysocket.emit('query', videoId);


})
