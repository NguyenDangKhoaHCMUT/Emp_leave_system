import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import { Box, Typography, Button, TextField } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useAuth } from '~/context/AuthContext';
import { approveRequest, declineRequest, getAttachment } from '~/services/apiService';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import dayjs from 'dayjs';

// Backdrop component
const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ 'base-Backdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

// Color definitions
const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

// Styled components
const StyledModal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled('div')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 4px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `,
);

// Main component
// Main component
export default function ModalUpdate({ rowData, open, onClose, onUpdateSuccess }) {
    const { user } = useAuth();
    // Initialize state using useEffect to handle prop changes
    const [feedback, setFeedback] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [attachment, setAttachment] = React.useState(null);
    const [isLoadingAttachment, setIsLoadingAttachment] = React.useState(false);
    
    // Update state when rowData changes and fetch attachment
    React.useEffect(() => {
      if (rowData) {
        setFeedback(rowData.feedback || '');
        setStatus(rowData.status || 'PENDING');
        
        // Fetch attachment if we have a rowData with ID
        if (rowData.id) {
          fetchAttachment(rowData.id);
        }
      }
    }, [rowData, user.token]);
    
    // Function to fetch the attachment
    const fetchAttachment = async (requestId) => {
      try {
        setIsLoadingAttachment(true);
        const response = await getAttachment(user.token, requestId);
        if (response.data && response.data.length > 0) {
          setAttachment(response.data[0]); // Get the first attachment
        } else {
          setAttachment(null);
        }
      } catch (error) {
        console.error('Error fetching attachment:', error);
        setAttachment(null);
      } finally {
        setIsLoadingAttachment(false);
      }
    };
  
    // Handle form submission - only handle approve/reject actions
    const handleSubmit = async (action) => {
      try {
        setIsSubmitting(true);
        let response;
        
        if (action === 'approve') {
          // Call the approve API endpoint
          response = await approveRequest(rowData.id, user.token);
          console.log('Approving request:', rowData.id);
        } else if (action === 'reject') {
          // Call the decline API endpoint
          response = await declineRequest(rowData.id, user.token);
          console.log('Rejecting request:', rowData.id);
        }
        
        console.log('Response:', response);
        
        // If successful
        if (response && response.status === 200) {
          // Update the status locally 
          setStatus(action === 'approve' ? 'APPROVED' : 'REJECTED');
          
          // Call the success callback
          if (onUpdateSuccess) {
            onUpdateSuccess();
          }
        }
      } catch (error) {
        console.error('Error updating leave request:', error);
      } finally {
        setIsSubmitting(false);
      }
    };
  
    return (
      <StyledModal
        aria-labelledby="update-modal-title"
        aria-describedby="update-modal-description"
        open={open}
        onClose={onClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ width: 850 }}>
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
              <Typography variant='h6' sx={{ fontWeight: 'bold'}}>Leave Request Details</Typography>
            </Box>
            
            <Box sx={{
              width: '100%',
              padding: 2,
              color: 'primary.main',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}>
              {/* Request Dates Section */}
              <Box sx={{ 
                mt: 2,
                display: 'flex', 
                width: '100%',
              }}>
                <Box sx={{ width: '20%' }}>
                  <Typography variant='h6'>Request Dates</Typography>
                </Box>
                <Box sx={{ width: '80%', display: 'flex', gap: 2 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']} sx={{ width: '40%' }}>
                      <DatePicker 
                        label="From" 
                        value={rowData?.startDate ? dayjs(rowData.startDate) : null}
                        readOnly
                      />
                    </DemoContainer>
                    <DemoContainer components={['DatePicker']} sx={{ width: '40%' }}>
                      <DatePicker 
                        label="To" 
                        value={rowData?.endDate ? dayjs(rowData.endDate) : null}
                        readOnly
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  <Box
                    component="form"
                    sx={{ '& > :not(style)': { m: 1 } }}
                    noValidate
                  >
                    <TextField 
                      id="filled-basic" 
                      label="No of days" 
                      variant="filled" 
                      value={rowData?.days || (rowData?.endDate && rowData?.startDate ? 
                        Math.ceil((new Date(rowData.endDate) - new Date(rowData.startDate)) / (1000 * 60 * 60 * 24)) + 1 : 
                        0)}
                      InputProps={{ readOnly: true }}
                    />
                  </Box>
                </Box>
              </Box>
              
              {/* Employee Section */}
              <Box sx={{ 
                mt: 2,
                display: 'flex', 
                width: '100%',
              }}>
                <Box sx={{ width: '20%' }}>
                  <Typography variant='h6'>Employee</Typography>
                </Box>
                <Box
                  component="form"
                  sx={{
                    width: '40%',
                    '& .MuiTextField-root': { width: '100%' },
                  }}
                  noValidate
                >
                  <TextField 
                    id="outlined-basic" 
                    variant="outlined" 
                    value={rowData?.idUserSend || 'Unknown'}
                    InputProps={{ readOnly: true }}
                  />
                </Box>
              </Box>
              
              {/* Reason Section */}
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
                  }}
                  noValidate
                >
                  <TextField
                    id="outlined-multiline-reason"
                    multiline
                    maxRows={4}
                    value={rowData?.reason || ''}
                    InputProps={{ readOnly: true }}
                  />
                </Box>
              </Box>
              
              {/* Attachment Section - New */}
              {(attachment || isLoadingAttachment) && (
                <Box sx={{ 
                  mt: 2,
                  display: 'flex', 
                  width: '100%',
                }}>
                  <Box sx={{ width: '20%' }}>
                    <Typography variant='h6'>Attachment</Typography>
                  </Box>
                  <Box sx={{ width: '80%' }}>
                    {isLoadingAttachment ? (
                      <Typography color="text.secondary">Loading attachment...</Typography>
                    ) : attachment ? (
                      <Box>
                        {attachment.url.match(/\.(jpeg|jpg|gif|png)$/) ? (
                          <Box
                            component="img"
                            src={attachment.url}
                            alt="Attachment"
                            sx={{
                              maxWidth: 300,
                              maxHeight: 200,
                              objectFit: 'contain',
                              borderRadius: 1,
                              border: '1px solid #ddd',
                              mt: 1
                            }}
                          />
                        ) : (
                          <Button 
                            variant="outlined" 
                            href={attachment.url} 
                            target="_blank"
                            startIcon={<CloudUploadIcon />}
                            sx={{ mt: 1 }}
                          >
                            View Attachment
                          </Button>
                        )}
                      </Box>
                    ) : (
                      <Typography color="text.secondary">No attachment found</Typography>
                    )}
                  </Box>
                </Box>
              )}
  
              {/* Status Section */}
              <Box sx={{ 
                mt: 2,
                display: 'flex', 
                width: '100%',
              }}>
                <Box sx={{ width: '20%' }}>
                  <Typography variant='h6'>Status</Typography>
                </Box>
                <Box sx={{ width: '20%' }}>
                  <Typography 
                    variant='subtitle1' 
                    sx={{ 
                      fontWeight: 'bold', 
                      color: status === 'APPROVED' ? 'success.main' : 
                             status === 'REJECTED' ? 'error.main' : 'warning.main'
                    }}
                  >
                    {status}
                  </Typography>
                </Box>
              </Box>
            </Box>
            
            {/* Action Buttons */}
            <Box sx={{
              width: '100%',
              padding: 2,
              backgroundColor: 'grey.200',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 3
            }}>
              {user.role === 'admin' && status === 'PENDING' && (
                <>
                  <Button 
                    variant="contained" 
                    color="success" 
                    onClick={() => handleSubmit('approve')}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'Approve'}
                  </Button>
                  <Button 
                    variant="contained" 
                    color="error" 
                    onClick={() => handleSubmit('reject')}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'Reject'}
                  </Button>
                </>
              )}
              <Button variant="outlined" onClick={onClose}>Close</Button>
            </Box>
          </Box>
        </ModalContent>
      </StyledModal>
    );
  }

ModalUpdate.propTypes = {
  rowData: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdateSuccess: PropTypes.func,
};