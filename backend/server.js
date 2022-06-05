const express = require('express')
const app = express()

const server = require('http').createServer(app)
const { Server } = require('socket.io')

const io = new Server(server)


// Middleware
app.use(express.json())

app.get('/', (req, res) => {

  res.send('hello from simple server :)')

})

io.on('connection', (socket) => {
  console.log('user connected')
})

// Server
const PORT = process.env.PORT || 8000
server.listen(PORT, () => console.log(`Server is currently running on port ${PORT}...!`))
