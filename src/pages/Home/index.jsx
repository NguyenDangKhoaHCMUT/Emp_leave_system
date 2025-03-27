import Box from '@mui/material/Box'
import theme from '~/theme'
import Overview from './Overview'
import Modal from '~/components/Modal'
import TableContent from './TableContent'
function index() {
  return (
    <Box sx={{
      height: `calc(100vh - ${theme.trello.appBarHeight}px)`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'secondary.light',
      overflow: 'auto',
      padding: 2
    }}>
      <Box sx={{
        width: '90%',
        height: '30%',
        backgroundColor: 'white',
        color: 'primary.main',
        borderRadius: 2,
        border: '1px solid #bdc3c7',
        alignItems: 'center'
      }}>
        <Overview />
      </Box>
      <Box sx={{
        mt: 4,
        width: '90%',
        height: '80%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        border: '1px solid #bdc3c7',
        padding: 2
      }}>
        <Box sx={{
          height: '10%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}>
          <Modal />
        </Box>
        <Box sx={{
          mt: 2,
          height: '80%',
          overflowY: 'auto'
        }}>
          <TableContent />
        </Box>
      </Box>
    </Box>
  )
}

export default index
