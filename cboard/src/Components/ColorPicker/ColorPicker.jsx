import React from 'react'
import ColorPicker from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';

const ReactColorPicker = ({setColor, textcolor}) => {

  function changeHandler(colors) {
    setColor(colors.color)
  }

  return (
    <div style={{ textAlign: 'center', marginTop:'0.5rem' }}>
    <ColorPicker
      animation="slide-up"
      color={textcolor}
      onChange={changeHandler}
    />
  </div>
  )
}

export default ReactColorPicker