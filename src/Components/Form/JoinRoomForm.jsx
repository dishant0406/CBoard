import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom'
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import gift from '../../Assets/gift-dynamic-color.png'
import JoinInnerIcon from '@mui/icons-material/JoinInner';
import { useHistory } from "react-router-dom";
import humanId from 'human-id'

const JoinRoomForm = ({socket, user, setUser}) => {
  const [roomID, setRoomId] = React.useState('');
  const [name, setName] = React.useState('');
  const history = useHistory();

  const handleRoomJoin = ()=>{
    const roomData = {
      name, roomID, userID:humanId(), host:true, presenter:true,
    }
    setUser(roomData)
    socket.emit('userJoined', roomData)
    history.push(`/${roomID}`);
  }

  return (
    <Container sx={{display: 'flex',alignItems: 'center',justifyContent: 'center', height:'100vh'}}>

      <Box
      component="form"
      sx={{
        width:'60%',
        display: 'flex',
        gap:'1rem',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        border: '1px solid #000',
        borderRadius: '0.3rem',
        padding: '2rem 2rem',
        backgroundColor:'#eeeeee'
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h4" gutterBottom component="div" sx={{fontFamily: 'Poppins', fontWeight:'600', color: '#0b6ff9'}}>
        <div style={{display: 'flex', alignItems: 'center'}}><img src={gift} style={{width: '4rem'}}/>Join Room</div>
      </Typography>
      <TextField
          required
          fullWidth 
          variant="outlined"
          label="Enter Your Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
      <TextField
          required
          fullWidth 
          variant="outlined"
          label="Enter Room Code"
          value={roomID}
          onChange={(e)=>setRoomId(e.target.value)}
        />
    <Button onClick={handleRoomJoin} variant="contained" sx={{width:'100%'}} endIcon={<JoinInnerIcon />}>
        Join Room
      </Button>
      <Typography variant="h7">No room? Create a <Link to='/'>Room!</Link></Typography>
    </Box>
    </Container>
  )
}

export default JoinRoomForm