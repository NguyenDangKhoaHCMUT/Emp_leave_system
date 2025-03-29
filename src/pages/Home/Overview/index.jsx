import React, { use } from 'react'
import { Typography, Box } from '@mui/material'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {getUserProfile} from '~/services/apiService'
import { useAuth } from '~/context/AuthContext';
import { useEffect, useState } from 'react';




const rows = [
];

function index() {

  const {user} = useAuth()
  const token = user.token

  console.log(user)

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [remainDay, setRemainDay] = useState(0)

  const columns = [
    { id: 'year', label: 'Year', minWidth: 170 },
    { id: 'id1', label: '2025', minWidth: 170 },
    { id: 'id2', label: 'Remaining Office Deduction', minWidth: 50 },
    { id: 'id3', label: `${remainDay}`, minWidth: 170 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserProfile(token);
        console.log('API Response:', response.data);
        let remainDay1 = response.data.user.leaveDaysRemain;
        setRemainDay(remainDay1)
        console.log('remainDay:', remainDay1)
      } catch (error) {
        console.error('Error fetching data:', error.response?.data || error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <Box sx={{
      padding: 2,
      overflow: 'auto',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }}>
      <Typography variant='h5' sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'primary.main' }}>Overview</Typography>

      <Paper sx={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: 320 }}>
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
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <>
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                          </TableCell>
                          </>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}

export default index
