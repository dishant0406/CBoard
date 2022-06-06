import * as React from 'react';
import CreateIcon from '@mui/icons-material/Create';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import Crop32Icon from '@mui/icons-material/Crop32';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';

const ToggleButtonComponent = ({tool, setTool})=> {
  

  const handleAlignment = (event, newAlignment) => {
    setTool(newAlignment);
  };

  return (
    <>
    <ToggleButtonGroup
      value={tool}
      exclusive
      onChange={handleAlignment}
      aria-label="selected tool"
    >
      <Tooltip title="Pencil" arrow>
      <ToggleButton value="pencil" aria-label="pencil">
        <CreateIcon color="primary"/>
      </ToggleButton>
      </Tooltip>
      <Tooltip title="Line" arrow>
      <ToggleButton value="line" aria-label="line">
        <HorizontalRuleIcon color="primary"/>
      </ToggleButton>
      </Tooltip>
      <Tooltip title="Rectangle" arrow>
      <ToggleButton value="rect" aria-label="rectangle">
        <Crop32Icon color="primary"/>
      </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
    </>
  );
}

export default ToggleButtonComponent