const express = require('express')
const app = express();
const http = require('http') 
const socketio = require('socket.io')
const path = require('path')
const server = http.createServer(app)
const io = socketio(server)  


const  user = {

}
app.use('/',express.static(path.join(__dirname,'/public')))


io.on('connection',(socket)=>{
  socket.on('login',(data)=>{ 
    user[socket.id] = data.name;
  })
  socket.on('msg_send',(data)=>{ 
    console.log(data.msg) 
    io.emit('recv_msg',{
      msg:data.msg,
      name:user[socket.id]
    })
  })

})

server.listen(process.env.PORT || 3001,()=>{  

  console.log("server starting at port 3001")
})