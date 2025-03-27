import Box from '@mui/material/Box'

function BoxOverview({number, title, color}) {
  return (
    <Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        color: 'primary.main',
        borderRadius: 1,
        padding: 2,
        gap: 2,
        fontWeight: 'bold',
      }}>
        <Box sx={{
          backgroundColor: color,
          color: 'primary.main',
          borderRadius: 1,
          padding: 1,
          fontSize: 50,
        }}>
          {number}
        </Box>
        <Box>
          {title}
        </Box>
      </Box>
    </Box>
  )
}

export default BoxOverview
