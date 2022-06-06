import React from 'react'
import './App.css'
import Container from '@mui/material/Container';
import {BrowserRouter, Route, Switch} from 'react-router-dom' 
import JoinRoomForm from './Components/Form/JoinRoomForm'
import CssBaseline from '@mui/material/CssBaseline';
import CreateRoomForm from './Components/Form/CreateRoomForm';
import RoomPage from './Pages/RoomPage/RoomPage';

const App = () => {
  return (
    <BrowserRouter>
    <CssBaseline/>
      <Container>
        <Switch>
        <Route path="/" exact><CreateRoomForm/></Route>
        <Route path="/join"><JoinRoomForm/></Route>
        <Route path="/:roomId"><RoomPage/></Route>
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default App