'use strict';

const io = require('socket.io').listen(8000);

const resources = require('./resources');

io.sockets.on('connection', socket => {

    console.log('a client connected');

    socket.on('register', message => {
        message.videoIds.forEach(videoId => {
            resources.push(socket, videoId, message.url);
        });
        //console.log(resources.all());
    });


    socket.on('query', videoId => {
        const url = resources.query(videoId);
        socket.emit('url', url);
    });


    socket.on('disconnect', () => {
        resources.remove(socket);
        console.log('a client disconnected');
        //console.log(resources.all());
    })

})
