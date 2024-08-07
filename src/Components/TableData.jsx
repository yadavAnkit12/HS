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
import { Autocomplete, Button, TablePagination, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TaskTable = () => {
  const navigate = useNavigate();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
  const [rows, setRows] = React.useState([]);
  const dragRow = React.useRef(null);
  const draggedOverRow = React.useRef(null);

  React.useEffect(() => {
    const storedData = localStorage.getItem('taskData');
    if (storedData) {
      setRows(JSON.parse(storedData));
    }
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCreateTask = () => {
    navigate('/task/new');
  };

  const handleEditTask = (taskId) => {
    navigate(`/task/${taskId}`);
  };

  const handleDeleteTask = (taskId) => {
    const tdata = JSON.parse(localStorage.getItem('taskData'));
    const itemId = tdata.filter(item => item.id !== taskId);

    localStorage.setItem('taskData', JSON.stringify(itemId));
    setRows(itemId);
  };

  const handleInterChangeRow = () => {
    const newRows = [...rows];
    const dragIndex = dragRow.current;
    const dropIndex = draggedOverRow.current;

    // Swap the elements
    [newRows[dragIndex], newRows[dropIndex]] = [newRows[dropIndex], newRows[dragIndex]];

    setRows(newRows);
    localStorage.setItem('taskData', JSON.stringify(newRows));
  };

  const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <Button
        variant="contained"
        style={{ border: '2px solid yellow', color: 'black', backgroundColor: 'white', margin: '1rem' }}
        onClick={handleCreateTask}
      >
        Create New Task
      </Button>

      <TableContainer component={Paper} style={{ maxWidth: '100%' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor: 'rgb(245, 245, 220)' }}>
              <TableCell style={{ fontSize: '12px', fontWeight: 'bold' }}>ORDER</TableCell>
              <TableCell align="right" style={{ fontSize: '12px', fontWeight: 'bold' }}>SERIAL NO. </TableCell>
              <TableCell align="right" style={{ fontSize: '12px', fontWeight: 'bold' }}>TASK TITLE</TableCell>
              <TableCell align="right" style={{ fontSize: '12px', fontWeight: 'bold' }}>TASK ID</TableCell>
              <TableCell align="right" style={{ fontSize: '12px', fontWeight: 'bold' }}>STATUS</TableCell>
              <TableCell align="right" style={{ fontSize: '12px', fontWeight: 'bold' }}>ASSIGNED MEMBERS</TableCell>
              <TableCell align="right" style={{ fontSize: '12px', fontWeight: 'bold' }}>DUE DATE</TableCell>
              <TableCell align="right" style={{ fontSize: '12px', fontWeight: 'bold' }}>IS ASSIGNED</TableCell>
              <TableCell align="right" style={{ fontSize: '12px', fontWeight: 'bold' }}>ESTIMATED HOURS</TableCell>
              <TableCell align="right" style={{ fontSize: '12px', fontWeight: 'bold' }}>PRIORITY</TableCell>
              <TableCell align="right" style={{ fontSize: '12px', fontWeight: 'bold' }}>CREATED ON</TableCell>
              <TableCell align="right" style={{ fontSize: '12px', fontWeight: 'bold' }}>ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: 'rgb(245, 245, 220)' }}
            >
              {/* Empty row for filtering */}
              <TableCell component="th" scope="row"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">
                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  autoComplete='off'
                  required
                  sx={{ mb: 1, mt: 1, minWidth: '100px' }}
                />
              </TableCell>
              <TableCell align="right">
                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  autoComplete='off'
                  required
                  sx={{ mb: 1, mt: 1, minWidth: '100px' }}
                />
              </TableCell>
              <TableCell align="right">
                <Autocomplete
                  fullWidth
                  options={['Uninitiated', 'In progress', 'Completed']}
                  onChange={(e, value) => ''}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      color="secondary"
                      autoComplete="off"
                      sx={{ mb: 1, mt: 1, minWidth: '100px' }}
                    />
                  )}
                />
              </TableCell>
              <TableCell align="right">
                <Autocomplete
                  fullWidth
                  options={['Team member 1', 'Team member 2', 'Team member 3', 'Team member 4']}
                  onChange={(e, value) => ''}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      color="secondary"
                      autoComplete="off"
                      sx={{ mb: 1, mt: 1, minWidth: '100px' }}
                    />
                  )}
                />
              </TableCell>
              <TableCell align="right">
                <TextField
                  type="date"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  autoComplete='off'
                  InputLabelProps={{ shrink: true }}
                  required
                  sx={{ mb: 1, mt: 1, minWidth: '100px' }}
                />
              </TableCell>
              <TableCell align="right">
                <Autocomplete
                  fullWidth
                  options={['Yes', 'No']}
                  onChange={(e, value) => ''}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      color="secondary"
                      autoComplete="off"
                      sx={{ mb: 1, mt: 1, minWidth: '100px' }}
                    />
                  )}
                />
              </TableCell>
              <TableCell align="right">
                <TextField
                  type="time"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  autoComplete='off'
                  InputLabelProps={{ shrink: true }}
                  required
                  sx={{ mb: 1, mt: 1, minWidth: '100px' }}
                />
              </TableCell>
              <TableCell align="right">
                <Autocomplete
                  fullWidth
                  options={['Low', 'Medium', 'High']}
                  onChange={(e, value) => ''}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      color="secondary"
                      autoComplete="off"
                      sx={{ mb: 1, mt: 1, minWidth: '100px' }}
                    />
                  )}
                />
              </TableCell>
              <TableCell align="right">
                <TextField
                  type="date"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  autoComplete='off'
                  InputLabelProps={{ shrink: true }}
                  required
                  sx={{ mb: 1, mt: 1, minWidth: '100px' }}
                />
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            {paginatedRows.map((row, index) => (
              <TableRow
                key={row.serialNo}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                draggable
                onDragStart={() => (dragRow.current = index)}
                onDragEnter={() => (draggedOverRow.current = index)}
                onDragEnd={handleInterChangeRow}
                onDragOver={(e) => e.preventDefault()}
              >
                <TableCell component="th" scope="row">
                  {row.order}
                </TableCell>
                <TableCell align="right">{row.serialNo}</TableCell>
                <TableCell align="right">{row.taskTitle}</TableCell>
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">{row.assignedMembers}</TableCell>
                <TableCell align="right">{row.dueDate}</TableCell>
                <TableCell align="right">{row.isAssigned}</TableCell>
                <TableCell align="right">{row.estimatedHours}</TableCell>
                <TableCell align="right">{row.priority}</TableCell>
                <TableCell align="right">{row.createdOn}</TableCell>
                <TableCell align="right">
                  <div className='flex gap-2'>
                    <EditIcon onClick={() => handleEditTask(row.id)} className='cursor-pointer' />
                    <DeleteForeverIcon onClick={() => handleDeleteTask(row.id)} className='cursor-pointer' />
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
};

export default TaskTable;
