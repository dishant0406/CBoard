import React from 'react'
import rough from 'roughjs';

const WhiteBoard = ({canvasRef, ctxRef, elements, setElements, tool, textcolor, socket}) => {

  const [drawing, setDrawing] = React.useState(false);

  const roughGenerator = rough.generator()

  React.useEffect(()=>{
    const canvas = canvasRef.current;
    canvas.height = window.innerHeight *2;
    canvas.width = window.innerWidth * 2;
    const ctx = canvas.getContext('2d');

    ctx.strokeStyle = textcolor;
    ctx.lineWidth = 2;
    ctx.lineCap ='round';

    ctxRef.current = ctx;
  },[])

  React.useEffect(() => {
      ctxRef.current.strokeStyle = textcolor;
  }, [textcolor])
  

  React.useLayoutEffect(() => {
    const roughCanvas = rough.canvas(canvasRef.current);

    if(elements.length >0 ){
      ctxRef.current.clearRect(0,0,canvasRef.current.width,canvasRef.current.height);
    }
    elements.forEach(element => {
      if(element.type==='pencil'){
        roughCanvas.linearPath(element.path, {stroke:element.stroke, strokeWidth:5, roughness:0})
      }
      else if(element.type==='line'){
        roughCanvas.draw( roughGenerator.line(element.offsetX, element.offsetY, element.width, element.height, {stroke:element.stroke, strokeWidth:5, roughness:0}))
      }
      else if(element.type==='rect'){
        roughCanvas.draw( roughGenerator.rectangle(element.offsetX, element.offsetY, element.width, element.height, {stroke:element.stroke, strokeWidth:5, roughness:0}))
      }
    })
  }, [elements])


  const handleMouseDown =(e)=>{
    const {offsetX, offsetY} = e.nativeEvent;
      if(tool === 'pencil'){
        setElements((prev)=>{
          return [...prev, {type:'pencil', offsetX, offsetY, path:[[offsetX, offsetY]], stroke:textcolor}]
        })
      }
      else if(tool==='line'){
        setElements((prev)=>{
          return [...prev, {type:'line', offsetX, offsetY, width:offsetX, height:offsetY, stroke:textcolor}]
        })
      }
      else if(tool ==='rect'){
        setElements((prev)=>{
          return [...prev, {type:'rect', offsetX, offsetY, width:0, height:0, stroke:textcolor}]
        })
      }
    setDrawing(true)
  }

  const handleMouseMove =(e)=>{
    if(drawing){
      const {offsetX, offsetY} = e.nativeEvent;

      

      if(tool ==='pencil'){
        //for pencil
        const {path} = elements[elements.length-1];
        const newPath = [...path, [offsetX, offsetY]]

        setElements((prev)=>{
          return prev.map((ele, index)=>{
            if(index === elements.length-1){
              return {
                ...ele, path:newPath
              }
            }
            else{
              return ele
            }
          })
         })

         
      socket.emit('boardUpdate', {elements})
      }
      else if(tool ==='line'){
        setElements((prev)=>{
          return prev.map((ele, index)=>{
            if(index === elements.length-1){
              return {
                ...ele, width:offsetX, height:offsetY
              }
            }
            else{
              return ele
            }
          })
         })
         
      socket.emit('boardUpdate', {elements})
      }
      else if(tool ==='rect'){
        setElements((prev)=>{
          return prev.map((ele, index)=>{
            if(index === elements.length-1){
              return {
                ...ele, width:offsetX - ele.offsetX, height:offsetY - ele.offsetY
              }
            }
            else{
              return ele
            }
          })
         })
         
    socket.emit('boardUpdate', {elements})
      }
      
      }
  }

  const handleMouseUp =(e)=>{
   
    setDrawing(false)
    socket.emit('boardUpdate', {elements})
  }

  return (
    <div onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}  style={{border: '0.3rem solid #000', height: '70%', width:'100%', overflow: 'hidden'}}>
      <canvas ref={canvasRef} style={{backgroundColor:'#fff'}}></canvas>
    </div>
  )
}

export default WhiteBoard