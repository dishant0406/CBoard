const express = require('express')
const app = express()

const server = require('http').createServer(app)
const io = require('socket.io')(server)



// Middleware
app.use(express.json())

app.get('/', (req, res) => {

  res.send('hello from simple server :)')

})

// Server
const PORT = process.env.PORT || 8000
server.listen(PORT, () => console.log(`Server is currently running on port ${PORT}...!`))
