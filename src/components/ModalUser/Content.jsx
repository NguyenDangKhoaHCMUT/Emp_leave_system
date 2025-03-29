import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Typography, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { useAuth } from '~/context/AuthContext';
import { createLeaveRequest } from '~/services/apiService';

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

function Content({ onCancel }) {
  const [fileUrl, setFileUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleFileUpload = async (file) => {
    setIsUploading(true);
    const formData1 = new FormData();
    formData1.append('file', file);
    formData1.append('upload_preset', 'quiz_images');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dlt7xgvn9/image/upload', {
        method: 'POST',
        body: formData1
      });
      const data = await response.json();
      console.log('File uploaded successfully:', data);
      const uploadedUrl = data.secure_url;
      setFileUrl(uploadedUrl);
      
      // Update attachmentUrls in formData
      setFormData(prevData => ({
        ...prevData,
        attachmentUrls: [...prevData.attachmentUrls.filter(url => url !== null), uploadedUrl]
      }));
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  };
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    idUserReceive: 0,
    leaveType: null,
    startDate: null,
    endDate: null,
    reason: '',
    attachmentUrls: [fileUrl],
  });
  
  const resetForm = () => {
    setFormData({
      idUserReceive: 0,
      leaveType: null,
      startDate: null,
      endDate: null,
      reason: '',
      attachmentUrls: [],
    });
    setFileUrl(null);
  };

  const handleCancel = React.useCallback(() => {
    resetForm();
    console.log("Cancel button clicked, executing onCancel");
    if (typeof onCancel === 'function') {
      onCancel();
    } else {
      console.error("onCancel is not a function");
    }
  }, [onCancel]);

  const handleApply = async () => {
    const token = user.token;

    try {
      const payload = {
        idUserReceive: formData.idUserReceive,
        leaveType: formData.leaveType,
        startDate: formData.startDate,
        endDate: formData.endDate,
        reason: formData.reason,
        attachmentUrls: formData.attachmentUrls,
      };

      const response = createLeaveRequest(token, payload);
      console.log('API Response:', response.data);
      alert('Leave applied successfully!');
    } catch (error) {
      console.error('Error applying leave:', error.response?.data || error.message);
      alert('Failed to apply leave.');
    }
  };

  return (
    <Box
      sx={{
        overflow: 'auto',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'primary.main',
          width: '100%',
          padding: 2,
          color: 'white',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Apply leave
        </Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          padding: 2, 
          color: 'primary.main',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            width: '100%',
          }}
        >
          <Box sx={{ width: '20%' }}>
            <Typography variant="h6">Select Date</Typography>
          </Box>
          <Box sx={{ width: '80%', display: 'flex', gap: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']} sx={{ width: '40%' }}>
                <DatePicker
                  label="From"
                  value={formData.startDate}
                  onChange={(newValue) =>
                    setFormData({ ...formData, startDate: newValue })
                  }
                />
              </DemoContainer>
              <DemoContainer components={['DatePicker']} sx={{ width: '40%' }}>
                <DatePicker
                  label="To"
                  value={formData.endDate}
                  onChange={(newValue) =>
                    setFormData({ ...formData, endDate: newValue })
                  }
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
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            width: '100%',
          }}
        >
          <Box sx={{ width: '20%' }}>
            <Typography variant="h6">Reason</Typography>
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
                value={formData.reason}
                onChange={(e) =>
                  setFormData({ ...formData, reason: e.target.value })
                }
              />
            </div>
          </Box>
        </Box>
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            width: '100%',
          }}
        >
          <Box sx={{ width: '20%' }}></Box>
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
                disabled={isUploading}
              >
                {isUploading ? 'Uploading...' : 'Upload file'}
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) => event.target.files && handleFileUpload(event.target.files[0])}
                  disabled={isUploading}
                />
              </Button>
              {isUploading && (
                <Typography sx={{ mt: 1, color: 'text.secondary' }}>
                  Uploading file...
                </Typography>
              )}
              {fileUrl && !isUploading && (
                <Box>
                  <Box
                    component="img"
                    sx={{
                      mt: 2,
                      maxWidth: 300,
                      maxHeight: 200,
                      objectFit: 'contain',
                      borderRadius: 1
                    }}
                    src={fileUrl}
                    alt="Uploaded file preview"
                  />
                </Box>
              )}
            </div>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: '100%',
          padding: 2,
          backgroundColor: 'grey.200',
          color: 'primary.main',
          height: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 3,
        }}
      >
        <Button variant="contained" onClick={handleApply}>
          Apply
        </Button>
        {/* <Button 
          variant="outlined" 
          onClick={(e) => {
            e.stopPropagation(); // Prevent event bubbling
            handleCancel();
          }}
        >
          Cancel
        </Button> */}
      </Box>
    </Box>
  );
}


export default Content
