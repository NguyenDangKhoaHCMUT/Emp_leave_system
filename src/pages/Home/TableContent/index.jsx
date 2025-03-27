import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'from', label: 'From', minWidth: 170 },
  { id: 'to', label: 'To', minWidth: 170 },
  { id: 'days', label: 'Days', minWidth: 50 },
  { id: 'status', label: 'Status', minWidth: 170 },
  {
    id: 'reason',
    label: 'Reason',
    minWidth: 170,
  },
  {
    id: 'approver',
    label: 'Appover',
    minWidth: 170,
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
    align: 'right',
  },
];

function createData(from, to, days, status, reason, approver, action) {
  return { from, to, days, status, reason, approver, action };
}

const rows = [
  createData('31 Dec 2024', '31 Dec 2024', 1, 'Pending', 'Sickkkkkkkkkkkkkkkkkk mahjasadf ajlsfdl;asjf;lasdjf asdlfjaslfjsadlfjasd;lfj;jfalfja;sfjasdlfjlasdfjl', 'Admin', 'Approve'),
  createData('31 Dec 2024', '31 Dec 2024', 1, 'Reject', 'Sick', 'Admin', 'Approve'),
  createData('31 Dec 2024', '31 Dec 2024', 1, 'Approved', 'Sick', 'Admin', 'Approve'),
  createData('31 Dec 2024', '31 Dec 2024', 1, 'Pending', 'Sick', 'Admin', 'Approve'),
  createData('31 Dec 2024', '31 Dec 2024', 1, 'Pending', 'Sick', 'Admin', 'Approve'),
  createData('31 Dec 2024', '31 Dec 2024', 1, 'Pending', 'Sick', 'Admin', 'Approve'),
  createData('31 Dec 2024', '31 Dec 2024', 1, 'Pending', 'Sick', 'Admin', 'Approve'),
];

export default function index() {
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
    <Paper sx={{ 
      width: '100%',
    }}>
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
