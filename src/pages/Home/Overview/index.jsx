import React from 'react'
import { Typography, Box } from '@mui/material'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'year', label: 'Year', minWidth: 170 },
  { id: 'id1', label: '2025', minWidth: 170 },
  { id: 'id2', label: '', minWidth: 50 },
  { id: 'id3', label: '', minWidth: 170 },
];

function createData(year, id1, id2, id3) {
  return { year, id1, id2, id3 };
}

const rows = [
  createData('Total Office Deduction', '12', 'Remail Office Deduction', '12'),
];
function index() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
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
