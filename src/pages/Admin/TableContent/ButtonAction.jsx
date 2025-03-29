import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

function ButtonAction() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Tooltip title="View & Edit">
        <EditIcon />
      </Tooltip>
    </Box>
  );
}

export default ButtonAction;