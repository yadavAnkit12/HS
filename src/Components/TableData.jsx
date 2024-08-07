import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Autocomplete, TablePagination, TextField } from '@mui/material';

const rows = [
  {
    order: "1",
    serialNo: "12345",
    taskTitle: "Task A",
    taskId: "001",
    status: "In Progress",
    assignedMembers: "John Doe",
    dueDate: "2024-08-10",
    isAssigned: "Yes",
    estimatedHours: "10",
    priority: "High",
    createdOn: "2024-08-01",
    action: "Edit"
  },
  {
    order: "1",
    serialNo: "12345",
    taskTitle: "Task A",
    taskId: "001",
    status: "In Progress",
    assignedMembers: "John Doe",
    dueDate: "2024-08-10",
    isAssigned: "Yes",
    estimatedHours: "10",
    priority: "High",
    createdOn: "2024-08-01",
    action: "Edit"
  },
  {
    order: "1",
    serialNo: "12345",
    taskTitle: "Task A",
    taskId: "001",
    status: "In Progress",
    assignedMembers: "John Doe",
    dueDate: "2024-08-10",
    isAssigned: "Yes",
    estimatedHours: "10",
    priority: "High",
    createdOn: "2024-08-01",
    action: "Edit"
  },
  {
    order: "1",
    serialNo: "12345",
    taskTitle: "Task A",
    taskId: "001",
    status: "In Progress",
    assignedMembers: "John Doe",
    dueDate: "2024-08-10",
    isAssigned: "Yes",
    estimatedHours: "10",
    priority: "High",
    createdOn: "2024-08-01",
    action: "Edit"
  },
  {
    order: "1",
    serialNo: "12345",
    taskTitle: "Task A",
    taskId: "001",
    status: "In Progress",
    assignedMembers: "John Doe",
    dueDate: "2024-08-10",
    isAssigned: "Yes",
    estimatedHours: "10",
    priority: "High",
    createdOn: "2024-08-01",
    action: "Edit"
  },
  {
    order: "1",
    serialNo: "12345",
    taskTitle: "Task A",
    taskId: "001",
    status: "In Progress",
    assignedMembers: "John Doe",
    dueDate: "2024-08-10",
    isAssigned: "Yes",
    estimatedHours: "10",
    priority: "High",
    createdOn: "2024-08-01",
    action: "Edit"
  },
  {
    order: "1",
    serialNo: "12345",
    taskTitle: "Task A",
    taskId: "001",
    status: "In Progress",
    assignedMembers: "John Doe",
    dueDate: "2024-08-10",
    isAssigned: "Yes",
    estimatedHours: "10",
    priority: "High",
    createdOn: "2024-08-01",
    action: "Edit"
  },
];

const TaskTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  return (
    <>

      <TableContainer component={Paper} style={{ maxWidth: '100%' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor: 'rgb(245, 245, 220)' }}>
              <TableCell style={{ fontSize: '12px', fontWeight: 'bold' }}>ORDER</TableCell>
              <TableCell align="right" style={{ fontSize: '12px', fontWeight: 'bold' }}>SERIAL NO. </TableCell>
              <TableCell align="right" style={{ fontSize: '12px', fontWeight: 'bold' }}>TASK TITLE</TableCell>
              <TableCell align="right" style={{ fontSize: '12px', fontWeight: 'bold' }}>TASK ID</TableCell>
              <TableCell align="right" style={{ fontSize: '12px', fontWeight: 'bold' }}>STATUS

              </TableCell>
              <TableCell align="right" style={{ fontSize: '12px', fontWeight: 'bold' }}>ASSIGNED MEMBERS

              </TableCell>
              <TableCell align="right" style={{ fontSize: '12px', fontWeight: 'bold' }}>DUE DATE

              </TableCell>
              <TableCell align="right" style={{ fontSize: '12px', fontWeight: 'bold' }}>IS ASSIGNED

              </TableCell>
              <TableCell align="right" style={{ fontSize: '12px', fontWeight: 'bold' }}>ESTIMATED HOURS

              </TableCell>
              <TableCell align="right" style={{ fontSize: '12px', fontWeight: 'bold' }}>PRIORITY

              </TableCell>
              <TableCell align="right" style={{ fontSize: '12px', fontWeight: 'bold' }}>CREATED ON

              </TableCell>
              <TableCell align="right" style={{ fontSize: '12px', fontWeight: 'bold' }}>ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 },backgroundColor: 'rgb(245, 245, 220)'  }}
            >
              <TableCell component="th" scope="row">
              </TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">    <TextField
                type="text"
                variant="outlined"
                color="secondary"
                fullWidth
                id="email"
                // label="Email"
                autoComplete='off'
                required
                sx={{ mb: 1, mt: 1, minWidth: '100px' }}
              /></TableCell>
              <TableCell align="right">   <TextField
                type="text"
                variant="outlined"
                color="secondary"
                fullWidth
                id="email"
                // label="Email"
                autoComplete='off'
                required
                sx={{ mb: 1, mt: 1, minWidth: '100px' }}
              /></TableCell>
              <TableCell align="right">  <Autocomplete
                fullWidth
                id="status"
                options={['Uninitiated', 'In progress', 'Completed']}
                // value={status}
                onChange={(e, value) => ''}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    color="secondary"
                    // label="Status"
                    autoComplete="off"
                    sx={{ mb: 1, mt: 1, minWidth: '100px' }}
                  />

                )}
              /></TableCell>
              <TableCell align="right"><Autocomplete
                fullWidth
                id="status"
                options={['Team member 1', 'Team member 2', 'Team member 3', 'Team member 4']}
                // value={status}
                onChange={(e, value) => ''}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    color="secondary"
                    // label="Assigned Member"
                    autoComplete="off"
                    sx={{ mb: 1, mt: 1, minWidth: '100px' }}
                  />

                )}
              /></TableCell>
              <TableCell align="right">     <TextField
                type="date"
                variant="outlined"
                color="secondary"
                fullWidth
                id="email"
                autoComplete='off'
                InputLabelProps={{ shrink: true }}
                required
                sx={{ mb: 1, mt: 1, minWidth: '100px' }}
              /></TableCell>
              <TableCell align="right">   <Autocomplete
                fullWidth
                id="status"
                options={['Yes', 'No']}
                // value={status}
                onChange={(e, value) => ''}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    color="secondary"
                    // label="Assigned Member"
                    autoComplete="off"
                    sx={{ mb: 1, mt: 1, minWidth: '100px' }}
                  />

                )}
              /></TableCell>
              <TableCell align="right">   <TextField
                type="time"
                variant="outlined"
                color="secondary"
                fullWidth
                id="email"
                autoComplete='off'
                InputLabelProps={{ shrink: true }}
                required
                sx={{ mb: 1, mt: 1, minWidth: '100px' }}
              /></TableCell>
              <TableCell align="right">   <Autocomplete
                fullWidth
                id="status"
                options={['Low', 'Medium', 'High']}
                // value={status}
                onChange={(e, value) => ''}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    color="secondary"
                    // label="Assigned Member"
                    autoComplete="off"
                    sx={{ mb: 1, mt: 1, minWidth: '100px' }}
                  />

                )}
              /></TableCell>
              <TableCell align="right">  <TextField
                type="date"
                variant="outlined"
                color="secondary"
                fullWidth
                id="email"
                autoComplete='off'
                InputLabelProps={{ shrink: true }}
                required
                sx={{ mb: 1, mt: 1, minWidth: '100px' }}
              /></TableCell>
              <TableCell></TableCell>
            </TableRow>
            {paginatedRows.map((row) => (
              <TableRow
                key={row.serialNo}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.order}
                </TableCell>
                <TableCell align="right">{row.serialNo}</TableCell>
                <TableCell align="right">{row.taskTitle}</TableCell>
                <TableCell align="right">{row.taskId}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">{row.assignedMembers}</TableCell>
                <TableCell align="right">{row.dueDate}</TableCell>
                <TableCell align="right">{row.isAssigned}</TableCell>
                <TableCell align="right">{row.estimatedHours}</TableCell>
                <TableCell align="right">{row.priority}</TableCell>
                <TableCell align="right">{row.createdOn}</TableCell>
                <TableCell align="right">
                  <div className='flex gap-2'>
                    <EditIcon />
                    <DeleteForeverIcon />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default TaskTable
