const port = process.env.PORT || 3000;

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": "*", //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    },
    origins: '*:*'
});

const moment = require('moment');
const { userJoin, getUserById, getUsers, deletePeopleById } = require('./helper/user.helper');

//socket code
io.on('connection', socket => {
    console.log(socket.id, ' connected');

    //disconnected
    socket.on('disconnect', () => {
        const user = getUserById(socket.id);
        if (!user) {
            return;
        }
        deletePeopleById(socket.id);
        socket.broadcast.to(user?.room).emit('server-response-send-message', {
            username: '* Bot *',
            message: `${user.username} has left the chat`,
            time: moment().format('LT'),
            isMine: false
        });
        // notification number people in room
        socket.broadcast.to(user?.room).emit('server-response-login', {
            room: user.room,
            users: getUsers(user.room)
        });
    })

    //login
    socket.on('client-login', (data) => {
        //push user to users
        userJoin(socket.id, data.username, data.room);
        //get user
        const user = getUserById(socket.id);
        if (!user) {
            return;
        }
        //join to room
        socket.join(user.room);
        // message to other people
        socket.broadcast.to(user.room).emit('server-response-send-message', {
            username: '* Bot *',
            message: `${user.username} has joined room`,
            time: moment().format('LT'),
            isMine: false
        });
         // message to current socket
         socket.emit('server-response-send-message', {
            username: '* Bot *',
            message: `Welcome ${user.username} !!! Let's send your first message to other people in room`,
            time: moment().format('LT'),
            isMine: false
        });
        // notification number people in room
        io.to(user.room).emit('server-response-login', {
            room: user.room,
            users: getUsers(user.room)
        });
    })

    // send message
    socket.on('client-send-message', (data) => {
        const user = getUserById(socket.id);
        if (!user) {
            return;
        }
        socket.emit('server-response-send-message', {
            username: user.username,
            message: data,
            time: moment().format('LT'),
            isMine: true
        });

        socket.broadcast.to(user.room).emit('server-response-send-message', {
            username: user.username,
            message: data,
            time: moment().format('LT'),
            isMine: false
        });
    })
});



// connection
server.listen(port, () => {
    console.log(`Port ${port} is running ...`)
})