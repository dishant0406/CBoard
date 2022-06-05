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
const CreateRoomForm = () => {
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
        />
      <Grid container alignItems="center" justifyContent="center" spacing={{md:3, xs:1}} columns={{ xs: 4, md: 12 }}>
      <Grid item xs={7}>
      <TextField
          required
          fullWidth 
          variant="outlined"
          label="Generate Room Code"
          InputProps={{
            readOnly: true,
          }}
        />
        </Grid>
        <Grid item xs={5} >
        <ButtonGroup disableElevation variant="contained">
      <Button startIcon={<AddIcon />}>Generate</Button>
      <Button startIcon={<ContentCopyIcon />}>Copy</Button>
      
    </ButtonGroup>
    </Grid>
    </Grid>
    <Button variant="contained" sx={{width:'100%'}} endIcon={<AddCircleIcon />}>
        Generate Room
      </Button>
    <Typography variant="h7"><Link to='/join'>Want to join a Room? Join a Room!</Link></Typography>
    </Box>
    </Container>
  )
}

export default CreateRoomForm