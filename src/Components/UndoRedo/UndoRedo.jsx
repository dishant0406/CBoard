import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import RestorePageIcon from '@mui/icons-material/RestorePage';
const UndoRedo =({handleClearCanvas, elements, historyArray, handleUndoClick, handleRedoClick})=> {
  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button onClick={handleUndoClick} variant="contained" disabled={elements.length <1} startIcon={<UndoIcon/>}>Undo</Button>
      <Button onClick={handleRedoClick} variant="contained" disabled={historyArray.length<1} startIcon={<RedoIcon />}>Redo</Button>
      <Button onClick={handleClearCanvas} color="error" startIcon={<RestorePageIcon />}>Clear Canvas</Button>
    </ButtonGroup>
  );
}

export default UndoRedo