import React from 'react'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ToggleButtonComponent from '../../Components/ToogleButtom/ToogleButton';
import UndoRedo from '../../Components/UndoRedo/UndoRedo';
import WhiteBoard from '../../Components/WhiteBoard/WhiteBoard';
const RoomPage = () => {
  const [tool, setTool] = React.useState('pencil');
  const canvasRef = React.useRef(null);
  const ctxRef = React.useRef(null);
  const [elements, setElements] = React.useState([])



  return (
    <Container sx={{display: 'flex',alignItems: 'center',gap:'1rem', height:'100vh', flexDirection:'column'}}>
      <Typography variant="h3" sx={{fontFamily:'Poppins', fontWeight: '700', color:'#eee', marginTop:'1rem'}}>Collaborative WhiteBoard</Typography>
      <ToggleButtonComponent tool={tool} setTool={setTool}/>
      <UndoRedo/>
      <WhiteBoard tool={tool} canvasRef={canvasRef} ctxRef={ctxRef} elements={elements} setElements={setElements}/>
    </Container>
  )
}

export default RoomPage