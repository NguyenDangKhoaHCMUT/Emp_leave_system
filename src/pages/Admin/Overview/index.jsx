import BoxOverview from "./BoxOverview";
import Box from "@mui/material/Box";
import React from "react";

function index() {
  const [employees, setEmployees] = React.useState(100);
  const [totalLeaveDay, setTotalLeaveDay] = React.useState(20);
  const [requestDenied, setRequestDenied] = React.useState(100);
  const [pendingLeaveRequests, setPendingLeaveRequests] = React.useState(100);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        gap: 2,
        width: "100%",
        flexWrap: "wrap", // Sửa lỗi và thêm thuộc tính này
      }}
    >
      <Box>
        <BoxOverview number={employees} title="Employees" color="#D7F5E4" />
      </Box>
      <Box>
        <BoxOverview
          number={totalLeaveDay}
          title="Total Leave Day"
          color="#D7F5E4"
        />
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
