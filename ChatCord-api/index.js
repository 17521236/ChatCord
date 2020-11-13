const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const server= require('http').Server(app);
const io = require('socket.io')(server,{
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

// load middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST,PUT,PATCH,DELETE,GET,HEAD,OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// router here
app.get('/', (req, res) => {
    res.send('ok')
})

//socket code
io.on('connection', socket => {
	console.log(socket.id,' connected');
    //disconnected
    socket.on('disconnect', () => {
        console.log(socket.id, ' disconnected')
    })

    // client send data
    socket.on('message',(data)=>{
        console.log(data);
    })
});



// connection
server.listen(port, () => {
    console.log(`Port ${port} is running ...`)
})