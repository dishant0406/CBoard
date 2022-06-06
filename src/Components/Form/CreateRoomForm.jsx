import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import gift from '../../Assets/gift-dynamic-color.png'
import AddIcon from '@mui/icons-material/Add';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import humanId from 'human-id'
import { useHistory } from "react-router-dom";
import { toast } from 'react-hot-toast';

const CreateRoomForm = ({socket, user, setUser}) => {
  const [roomID, setRoomId] = React.useState(humanId())
  const [name, setName] = React.useState('')
  const history = useHistory();


  
  const handleGenerateRoom = (e)=>{
    e.preventDefault()
    if(name!=''){
      const roomData = {
        name, roomID, userID:humanId(), host:true, presenter:true,
      }
      setUser(roomData)
      socket.emit('userJoined', roomData)
      history.push(`/${roomID}`);
    }
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
        <div style={{display: 'flex', alignItems: 'center'}}><img src={gift} style={{width: '4rem'}}/>Create Room</div>
      </Typography>
      <TextField
          required
          fullWidth 
          variant="outlined"
          label="Enter Your Name"
          value={name}
          onChange={(e)=> setName(e.target.value)}
        />
      <Grid container alignItems="center" justifyContent="center" spacing={{md:3, xs:1}} columns={{ xs: 4, md: 12 }}>
      <Grid item xs={7}>
      <TextField
          required
          fullWidth 
          variant="outlined"
          label="Generate Room Code"
          value={roomID}
          InputProps={{
            readOnly: true,
          }}
          sx={{fontFamily: 'Poppins'}}
        />
        </Grid>
        <Grid item xs={5} >
        <ButtonGroup disableElevation variant="contained">
      <Button startIcon={<AddIcon />} onClick={()=>{setRoomId(humanId())}}>Generate</Button>
      <Button onClick={() => {navigator.clipboard.writeText(roomID); toast.success('RoomID copied!')}} startIcon={<ContentCopyIcon />}>Copy</Button>
      
    </ButtonGroup>
    </Grid>
    </Grid>
    <Button onClick={handleGenerateRoom} variant="contained" sx={{width:'100%'}} endIcon={<AddCircleIcon />}>
        Generate Room
      </Button>
    <Typography variant="h7"><Link to='/join'>Want to join a Room? Join a Room!</Link></Typography>
    </Box>
    </Container>
  )
}

export default CreateRoomForm