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

const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts:"Infinity",
  timeout:10000,
  transports:["websocket"]
}

const socket = io(server, connectionOptions)


const App = () => {
  const [user, setUser] = React.useState(null)

  React.useEffect(()=>{
    socket.on('userConnected',(data)=>{
      if(data.success) {
        toast.success('User Joined')
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
          {user ? <RoomPage socket={socket}/> : <Redirect to='/'/>}
        </Route>
        </Switch>
      </Container>
      <Toaster/>
    </BrowserRouter>
  )
}

export default App