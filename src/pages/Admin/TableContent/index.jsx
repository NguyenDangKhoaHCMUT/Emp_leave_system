import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getAllListRequest } from '~/services/apiService';
import { useAuth } from '~/context/AuthContext';

// Define your columns based on your data structure
const columns = [
  { id: 'id', label: 'ID', align: 'right' },
  { id: 'startDate', label: 'Start Date', align: 'left' },
  { id: 'endDate', label: 'End Date', align: 'left' },
  { id: 'leaveType', label: 'Leave Type', align: 'left' },
  { id: 'reason', label: 'Reason', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: 'idUserSend', label: 'Requester ID', align: 'right' },
  { id: 'idUserReceive', label: 'Approver ID', align: 'right' },
  // { id: 'createdAt', label: 'Created At', align: 'left' },
  // { id: 'updatedAt', label: 'Updated At', align: 'left' }
];

// const visibleColumns = ['id', 'idUserSend', 'startDate', 'endDate', 'leaveType', 'status'];

// const displayColumns = columns.filter(column => visibleColumns.includes(column.id));

export default function index() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { user } = useAuth();
  const [datas, setDatas] = React.useState([]);
  // const datas = [
  //   {
  //     "id": 3,
  //     "idUserSend": 6,
  //     "idUserReceive": 1,
  //     "startDate": "2025-03-29",
  //     "endDate": "2025-03-29",
  //     "reason": "string",
  //     "leaveType": "string",
  //     "status": "PENDING",
  //     "createdAt": "2025-03-29T02:05:42.133783",
  //     "updatedAt": null
  //   },
  //   {
  //     "id": 4,
  //     "idUserSend": 6,
  //     "idUserReceive": 1,
  //     "startDate": "2025-06-29",
  //     "endDate": "2025-06-29",
  //     "reason": "string",
  //     "leaveType": "string",
  //     "status": "PENDING",
  //     "createdAt": "2025-03-29T02:05:55.677729",
  //     "updatedAt": null
  //   }
  // ]

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllListRequest(user.token);
        setDatas(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user.token]);

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
            {datas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={data.id}>
                {columns.map((column) => {
                  const value = data[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.id.includes('Date') || column.id.includes('At')
                        ? (value ? new Date(value).toLocaleDateString() : '-')
                        : (value || '-')}
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
        count={datas.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
