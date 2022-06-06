import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import RestorePageIcon from '@mui/icons-material/RestorePage';
const UndoRedo =()=> {
  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button startIcon={<UndoIcon />}>Undo</Button>
      <Button startIcon={<RedoIcon />}>Redo</Button>
      <Button color="error" startIcon={<RestorePageIcon />}>Clear Canvas</Button>
    </ButtonGroup>
  );
}

export default UndoRedo