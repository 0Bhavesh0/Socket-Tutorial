const { log } = require('console');
const express = require('express');

const app = express()
const server = require('http').createServer(app);

const io = require('socket.io')(server,{
    cors:{
        origin:"*",
    }
})

io.on('connection', (socket)=>{
    // console.log("what is socket", socket)
    console.log("Socket is connected");

    socket.on("chat", (payload)=>{
        console.log("Payload", payload)
        io.emit("chat",payload)
    })
    
})

server.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})