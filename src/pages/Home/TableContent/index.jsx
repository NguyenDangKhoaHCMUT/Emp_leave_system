import React, { useEffect, useState } from 'react';
import { useAuth } from '~/context/AuthContext';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getAllLeaveRequests } from '~/services/apiService';

import ButtonAction from './ButtonAction';

const columns = [
  { id: 'from', label: 'From', minWidth: 170 },
  { id: 'to', label: 'To', minWidth: 170 },
  { id: 'days', label: 'Days', minWidth: 50 },
  { id: 'status', label: 'Status', minWidth: 170 },
  { id: 'reason', label: 'Reason', minWidth: 170 },
  { id: 'action', label: 'Action', minWidth: 170, align: 'right' },
];

export default function Index() {
  const { user } = useAuth();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [refreshData, setRefreshData] = useState(0);

  const refreshTable = () => {
    setRefreshData(prev => prev + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = user.token;
        const response = await getAllLeaveRequests(token);
        const data = response.data.map((item) => {
          return {
            from: item.startDate,
            to: item.endDate,
            days: Math.ceil((new Date(item.endDate) - new Date(item.startDate)) / (1000 * 60 * 60 * 24)),
            status: item.status,
            reason: item.reason,
            action: <ButtonAction status={item.status} id={item.id} refreshTable={refreshTable} />,
          };
        });
        setRows(data);
      } catch (error) {
        console.error('Error fetching leave requests:', error);
      }
    };

    fetchData();
  }, [user, refreshData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: '90%' }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
