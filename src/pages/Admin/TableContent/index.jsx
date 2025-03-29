import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Chip } from '@mui/material';
import { getAllListRequest } from '~/services/apiService';
import { useAuth } from '~/context/AuthContext';
import ButtonAction from './ButtonAction';
import ModalUpdate from './ModalUpdate';

// Define columns
const columns = [
  { id: 'id', label: 'ID', align: 'right' },
  { id: 'startDate', label: 'Start Date', align: 'left' },
  { id: 'endDate', label: 'End Date', align: 'left' },
  { id: 'leaveType', label: 'Leave Type', align: 'left' },
  { id: 'reason', label: 'Reason', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: 'idUserSend', label: 'Requester ID', align: 'right' },
  // { id: 'idUserReceive', label: 'Approver ID', align: 'right' },
  { id: 'details', label: 'Details', align: 'right' },
];

// Function to get status chip color
const getStatusColor = (status) => {
  switch(status) {
    case 'APPROVED':
      return 'success';
    case 'REJECTED':
      return 'error';
    case 'PENDING':
      return 'warning';
    default:
      return 'default';
  }
};

export default function index() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [datas, setDatas] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const { user } = useAuth();
  
  // Fetch data
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllListRequest(user.token);
        setDatas(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [user.token]);
  
  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  // Handle opening the modal with row data
  const handleOpenModal = (rowData) => {
    setSelectedRow(rowData);
    setModalOpen(true);
  };
  
  // Handle closing the modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRow(null);
  };
  
  // Handle successful update
  const handleUpdateSuccess = () => {
    // Refresh data after successful update
    const fetchData = async () => {
      try {
        const response = await getAllListRequest(user.token);
        setDatas(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
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
            {datas
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((data) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={data.id}>
                  {columns.map((column) => {
                    const value = data[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'details' ? (
                          <Button 
                            variant="text" 
                            onClick={() => handleOpenModal(data)}
                          >
                            <ButtonAction />
                          </Button>
                        ) : column.id === 'status' ? (
                          <Chip
                            label={value || '-'}
                            color={getStatusColor(value)}
                            size="small"
                            sx={{ fontWeight: 'bold' }}
                          />
                        ) : column.id.includes('Date') || column.id.includes('At') ? (
                          value ? new Date(value).toLocaleDateString() : '-'
                        ) : (
                          value || '-'
                        )}
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

      {/* Modal for updating leave request */}
      {selectedRow && (
        <ModalUpdate
          rowData={selectedRow}
          open={modalOpen}
          onClose={handleCloseModal}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </Paper>
  );
}