import EditIcon from '@mui/icons-material/Edit'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'

function ButtonAction() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button variant="text" color="white" size='small'>
        <Tooltip title="Detail">
          <EditIcon />
        </Tooltip>
      </Button>      
    </Box>
  )
}

export default ButtonAction
