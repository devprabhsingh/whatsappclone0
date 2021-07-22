const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = socketio(server,{
    cors:{
        origin:"*",
    }
});

let users=[];

io.on('connection',socket=>{
    console.log("new WS connection");

    // listen for join room
    socket.on('joinRoom',(username)=>{
        users.push({id:socket.id,username})
        io.sockets.emit('usersList',users)


    

     // listen for reply
     socket.on('msg',(msg)=>{
         io.to(msg.to).emit('message',msg);
    })

    
    })

    socket.on('disconnect',()=>{
        users = users.filter(u=>u.id==socket.id)
    })
   

})

const port = process.env.PORT || 5000;

server.listen(port);