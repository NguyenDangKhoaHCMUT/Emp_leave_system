import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'

function ButtonAction() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
      <Button variant="text">
        <Tooltip title="Edit">
          <EditIcon />
        </Tooltip>
      </Button>

      <Button variant="text">
        <Tooltip title="Delete">
          <DeleteIcon />
        </Tooltip>
      </Button>      
    </Box>
  )
}

export default ButtonAction
