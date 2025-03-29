import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import BoxOverview from './BoxOverview';
import { getAllLeaveRequests } from '~/services/apiService';
import { useAuth } from '~/context/AuthContext';

function index() {
  const [total, setTotal] = React.useState(0);
  const [approve, setApprove] = React.useState(0);
  const [requestDenied, setRequestDenied] = React.useState(0);
  const [pendingLeaveRequests, setPendingLeaveRequests] = React.useState(0);
  const { user } = useAuth();

  // Fetch data and count different types of leave requests
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllLeaveRequests(user.token);
        const leaveRequests = response.data;
        
        // Set total count
        setTotal(leaveRequests.length);
        
        // Count by status
        const approvedCount = leaveRequests.filter(request => 
          request.status === 'APPROVED').length;
        setApprove(approvedCount);
        
        const rejectedCount = leaveRequests.filter(request => 
          request.status === 'DECLINED').length;
        setRequestDenied(rejectedCount);
        
        const pendingCount = leaveRequests.filter(request => 
          request.status === 'PENDING').length;
        setPendingLeaveRequests(pendingCount);
        
      } catch (error) {
        console.error('Error fetching leave requests:', error);
      }
    };
    
    fetchData();
  }, [user.token]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        gap: 2,
        width: "100%",
        flexWrap: "wrap", 
      }}
    >
      <Box>
        <BoxOverview
          number={total}
          title="Total Leave Day"
          color="#D7F5E4"
        />
      </Box>
      <Box>
        <BoxOverview number={approve} title="Request Approved" color="#D7F5E4" />
      </Box>
      <Box>
        <BoxOverview
          number={requestDenied}
          title="Request Denied"
          color="#FFE3E3"
        />
      </Box>
      <Box>
        <BoxOverview
          number={pendingLeaveRequests}
          title="Pending Leave Requests"
          color="#FFE493"
        />
      </Box>
    </Box>
  );
}

export default index;