import EditIcon from '@mui/icons-material/Edit'
import React, { use } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import { deleteLeaveRequest} from '~/services/apiService';
import { useAuth } from '~/context/AuthContext';


function ButtonAction({ status, id, refreshTable }) {
  const { user } = useAuth();
  const handleDelete = async () => {
    const token = user.token;
    const response = await deleteLeaveRequest(token, id);
    console.log(response);
    if (response.status === 204) {
      alert('Leave request deleted successfully!');
      refreshTable(); // Call refresh function after successful deletion
    } else {
      alert('Failed to delete leave request.');
    }
  } 
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
      <Button variant="text">
        <Tooltip title="Edit">
          <EditIcon />
        </Tooltip>
      </Button>

      <Button 
        variant="text"
        onClick={handleDelete}
      >
        <Tooltip title="Delete">
          <DeleteIcon />
        </Tooltip>
      </Button>      
    </Box>
  )
}

export default ButtonAction
