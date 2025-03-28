import ModeSelect from '~/components/ModeSelect'
import Box from '@mui/material/Box'
import AppsIcon from '@mui/icons-material/Apps'
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Tooltip from '@mui/material/Tooltip'
import Profiles from './Profiles'

function index() {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      px: { xs: 4, sm: 8 }, // Increased horizontal padding
      gap: 2,
      overflowX: 'auto',
      bgcolor: (theme) => theme.palette.background.paper,
      borderBottom: '1px solid',
      borderColor: 'divider'
    }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: { xs: 2, sm: 3 }, // Adjusted gap
        flex: '1 1 auto' // Allow box to grow and take available space
      }}>
        <AppsIcon sx={{ 
          color: 'primary.main',
          fontSize: { xs: '24px', sm: '28px' }
        }}/>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 0 
        }}>
          <Typography 
            variant='h6' 
            sx={{ 
              fontSize: { xs: '1rem', sm: '1.2rem' }, 
              fontWeight: 'bold', 
              color: 'primary.main',
              display: { xs: 'none', sm: 'block' }
            }}
          >
            Employee Leave Management
          </Typography>
          <Typography 
            variant='h6' 
            sx={{ 
              fontSize: { xs: '1rem', sm: '1.2rem' }, 
              fontWeight: 'bold', 
              color: 'primary.main',
              display: { xs: 'block', sm: 'none' }
            }}
          >
            ELS
          </Typography>
        </Box>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: { xs: 2, sm: 3 }, // Increased gap between right elements
        ml: 'auto' // Push to the right
      }}>
        <ModeSelect />
        <Tooltip title="Notifications">
          <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon sx={{ color: 'primary.main' }}/>
          </Badge>
        </Tooltip>
        <Profiles />
      </Box>
    </Box>
  )
}

export default index
