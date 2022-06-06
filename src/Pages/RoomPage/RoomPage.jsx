import React from 'react'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ToggleButtonComponent from '../../Components/ToogleButtom/ToogleButton';
import UndoRedo from '../../Components/UndoRedo/UndoRedo';
import WhiteBoard from '../../Components/WhiteBoard/WhiteBoard';
import toast from 'react-hot-toast';


const RoomPage = ({socket, elements, setElements}) => {
  const [tool, setTool] = React.useState('pencil');
  const canvasRef = React.useRef(null);
  const ctxRef = React.useRef(null);
  
  const [textcolor, setColor] = React.useState('#000')
  const [historyArray, setHistoryArray] = React.useState([])

  React.useEffect(()=>{
    socket.on('arrayUpdate', data=>{
      console.log(data)
      setElements(data.elements)
    })
  },[])

  
  const handleClearCanvas = ()=>{
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.fillRect = 'white';
    ctx.clearRect(0,0,canvasRef.current.width,canvasRef.current.height);
    setElements([])
  }

  const handleUndoClick = ()=>{
    setHistoryArray(prev=>{
      return [...prev, elements[elements.length-1]]
    })

    setElements(prev=>{
      return prev.slice(0, prev.length-1)
    })

    
    socket.emit('boardUpdate', {elements})
  }

  const handleRedoClick = () => {
    setElements(prev=>{
      return [...prev, historyArray[historyArray.length-1]]
    })

    setHistoryArray(prev=>{
      return prev.slice(0, prev.length-1)
    })

    
    socket.emit('boardUpdate', {elements})
  }

  return (
    <Container sx={{display: 'flex',alignItems: 'center',gap:'1rem', height:'100vh', flexDirection:'column'}}>
      <Typography variant="h3" sx={{fontFamily:'Poppins', fontWeight: '700', color:'#eee', marginTop:'1rem'}}>Collaborative WhiteBoard</Typography>
      <ToggleButtonComponent textcolor={textcolor} setColor={setColor} tool={tool} setTool={setTool}/>
      <UndoRedo handleRedoClick={handleRedoClick} handleUndoClick={handleUndoClick} elements={elements} historyArray={historyArray} handleClearCanvas={handleClearCanvas}/>
      <WhiteBoard socket={socket} textcolor={textcolor} tool={tool} canvasRef={canvasRef} ctxRef={ctxRef} elements={elements} setElements={setElements}/>
    </Container>
  )
}

export default RoomPage