const http = require("http")
const fs = require("fs/promises")
const fs2 = require("fs")
const express = require("express")
const path = require("path")
const puerto = 3000
const host = "192.168.1.42"
const app = express();

const server = http.createServer(app);

const io = require("socket.io")(server)

app.use(express.static(path.join(__dirname,"public")))

app.get("/",async (req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"))
})

io.on("connection",(socket)=>{
    console.log("Usuario conectado")

    socket.on("recibir",(msg)=>{
        io.emit("message",msg)
    })

    socket.on("diconnect",()=>{
        console.log("Usuario desconectado")
    })
})

server.listen(puerto,host,()=>{
    console.log("Server escuchando en el puerto "+puerto)
    console.log("Host del servidor "+host)
})