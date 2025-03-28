import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Logout from '@mui/icons-material/Logout'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { getUserProfile } from '~/services/apiService'

function Profiles() {
  const navigate = useNavigate()
  const { logout, user } = useAuth()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleLogout = async () => {
    logout()
    handleClose()
    navigate('/login')
  }
  return (
    <Box>
      <Tooltip title={user.name}>
        <IconButton
          onClick={handleClick}
          size="small"  
          sx={{ padding: 0 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true" 
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            sx={{ width: 32, height: 32 }}
            alt={user.name}
            src='https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/472216957_1924617648026190_5823984232582036858_n.jpg'
          />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu-profiles"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-profiles'
        }}
      >
        <MenuItem>
          <Avatar 
            sx={{ width: 28, height: 28, mr: 2 }}
            alt={user.name}
            src='https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/472216957_1924617648026190_5823984232582036858_n.jpg'
          />
          {user.name}
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Profiles
