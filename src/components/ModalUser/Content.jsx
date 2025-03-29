import Box from '@mui/material/Box'
import { Typography, Button } from '@mui/material'
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function Content() {
  return (
    <Box sx={{
      overflow: 'auto',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Box sx={{
        backgroundColor: 'primary.main',
        width: '100%',
        padding: 2,
        color: 'white',
      }}>
        <Typography variant='h6' sx={{ fontWeight: 'bold'}}>Apply leave</Typography>
      </Box>
      <Box sx={{
        width: '100%',
        padding: 2,
        color: 'primary.main',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Box sx={{ 
          mt: 2,
          display: 'flex', 
          width: '100%',
        }}>
          <Box sx={{ width: '20%' }}>
            <Typography variant='h6'>Select Date</Typography>
          </Box>
          <Box sx={{ width: '80%', display: 'flex', gap: 2 }}>
            <LocalizationProvider 
              dateAdapter={AdapterDayjs} 
            >
              <DemoContainer components={['DatePicker']} sx={{ width: '40%' }}>
                <DatePicker label="From" />
              </DemoContainer>
              <DemoContainer components={['DatePicker']} sx={{ width: '40%' }}>
                <DatePicker label="To" />
              </DemoContainer>
            </LocalizationProvider>

            <Box
              component="form"
              sx={{ '& > :not(style)': { m: 1 } }}
              noValidate
            >
              <TextField id="filled-basic" label="No of days" variant="filled" />
            </Box>
          </Box>
        </Box>
        <Box sx={{ 
          mt: 2,
          display: 'flex', 
          width: '100%',
        }}>
          <Box sx={{ width: '20%' }}>
            <Typography variant='h6'>Reason</Typography>
          </Box>
          <Box
            component="form"
            sx={{
              width: '80%',
              '& .MuiTextField-root': { width: '100%' },
              overflow: 'auto',
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-multiline-flexible"
                multiline
                maxRows={4}
              />
            </div>
          </Box>
        </Box>
        <Box sx={{ 
          mt: 2,
          display: 'flex', 
          width: '100%',
        }}>
          <Box sx={{ width: '20%' }}>
          </Box>
          <Box
            component="form"
            sx={{
              width: '80%',
              '& .MuiTextField-root': { width: '100%' },
              overflow: 'auto',
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload files
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) => console.log(event.target.files)}
                  multiple
                />
              </Button>
            </div>
          </Box>
        </Box>
      </Box>
      
      <Box sx={{
        width: '100%',
        padding: 2,
        backgroundColor: 'grey.200',
        color: 'primary.main',
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 3
      }}>
        <Button variant="contained">Apply</Button>
        <Button variant="outlined">Cancel</Button>
      </Box>
    </Box>
  )
}

export default Content
