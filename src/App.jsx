import React from 'react'
import './App.css'
import Container from '@mui/material/Container';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom' 
import JoinRoomForm from './Components/Form/JoinRoomForm'
import CssBaseline from '@mui/material/CssBaseline';
import CreateRoomForm from './Components/Form/CreateRoomForm';
import RoomPage from './Pages/RoomPage/RoomPage';
import io from 'socket.io-client'
import toast, { Toaster } from 'react-hot-toast';


const server = 'https://cboardapp.herokuapp.com/';
// const server = 'http://localhost:5000';

const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts:"Infinity",
  timeout:10000,
  transports:["websocket"]
}

const socket = io(server, connectionOptions)


const App = () => {
  const [elements, setElements] = React.useState([])
  const [user, setUser] = React.useState(null)

  React.useEffect(()=>{
    socket.on('userConnected',(data)=>{
      console.log(data)
      if(data.success) {
        toast.success(`${data.name} Joined`)
      }
      else{
        toast.error('Something went wrong')
      }
    })
  }, [])


  return (
    <BrowserRouter>
    <CssBaseline/>
      <Container>
        <Switch>
        <Route path="/" exact><CreateRoomForm socket={socket} user={user} setUser={setUser} /></Route>
        <Route path="/join"><JoinRoomForm socket={socket} user={user} setUser={setUser}/></Route>
        <Route path="/:roomId">
          {user ? <RoomPage socket={socket} elements={elements} setElements={setElements}/> : <Redirect to='/'/>}
        </Route>
        </Switch>
      </Container>
      <Toaster/>
    </BrowserRouter>
  )
}

export default App