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
  const [filters, setFilters] = React.useState({
    taskTitle: '',
    id: '',
    status: '',
    assignedMembers: '',
    dueDate: '',
    isAssigned: '',
    estimatedHours: '',
    priority: '',
    createdOn: ''
  });

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

  const handleFilterChange = (field, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [field]: value
    }));
  };

  const filteredRows = rows.filter(row => {
    return Object.keys(filters).every(filterKey => {
      if (!filters[filterKey]) return true;

      // Handle taskId and assignedMembers filters specifically
      if (filterKey === 'id') {
        return row[filterKey].toString().includes(filters[filterKey].toString());
      }

      if (filterKey === 'assignedMembers') {
        return row[filterKey].toLowerCase().includes(filters[filterKey].toLowerCase());
      }

      // Handle other filters
      if (typeof row[filterKey] === 'string') {
        return row[filterKey].toLowerCase().includes(filters[filterKey].toLowerCase());
      }

      return true;
    });
  });

  const paginatedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleGetStatusColor=(status)=>{
    if(status==='Uninitiated'){
      return 'red'
    } else if(status==='In Progress'){
      return 'rgb(159, 43, 104)'
    } else {
      return 'rgb(0, 128, 0)'

    }
  }

  const handleGetBackgroundColor=(status)=>{
    if(status==='Uninitiated'){
      return 'rgb(250, 160, 160 )'
    } else if(status==='In Progress'){
      return 'rgb(207, 159, 255)'
    } else {
      return 'rgb(80, 200, 120)'

    }
  }

  const handleGetTeamColor=(teams) => {
    if(teams==='Team Member 1'){
      return 'red'
    } else if(teams==='Team Member 2'){
      return 'rgb(0, 150, 255)'
    } else if(teams==='Team Member 3'){
      return 'rgb(240, 128, 0)'
    } else{
      return 'rgb(205, 127, 50)'
    }
  }  

  const handleTeamBackgroundColor=(teams) => {
    if(teams==='Team Member 1'){
      return 'rgb(250, 160, 160 )'
    } else if(teams==='Team Member 2'){
      return 'rgb(137, 207, 240)'
    } else if(teams==='Team Member 3'){
      return 'rgb(244, 187, 68)'
    } else{
      return 'rgb(225, 193, 110)'
    }
  } 

  const handleGetPriorityColor=(priority) => {
    if(priority==='Low'){
      return 'green'
    } else if(priority==='Medium'){
      return 'rgb(255, 192, 0)'
    }  else{
      return 'red'
    }
  } 

  const handleGetPriorityBgColor=(priority) => {
    if(priority==='Low'){
      return 'rgb(50, 205, 50)'
    } else if(priority==='Medium'){
      return 'rgb(255, 255, 143)'
    }  else{
      return 'rgb(250, 160, 160 )'
    }
  }

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
            <TableRow style={{ backgroundColor: 'rgb(218,165,32)' }}>
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
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: 'rgb(218,165,32)' }}
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
                  sx={{ mb: 1, mt: 1, width: '130px' }}
                  onChange={(e) => handleFilterChange('taskTitle', e.target.value)}
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
                  sx={{ mb: 1, mt: 1, width: '130px' }}
                  onChange={(e) => handleFilterChange('id', e.target.value)}
                />
              </TableCell>
              <TableCell align="right">
                <Autocomplete
                  fullWidth
                  options={['Uninitiated', 'In progress', 'Completed']}
                  onChange={(e, value) => handleFilterChange('status', value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      color="secondary"
                      autoComplete="off"
                      sx={{ mb: 1, mt: 1, width: '130px' }}
                    />
                  )}
                />
              </TableCell>
              <TableCell align="right">
                <Autocomplete
                  fullWidth
                  options={['Team member 1', 'Team member 2', 'Team member 3', 'Team member 4']}
                  onChange={(e, value) => handleFilterChange('assignedMembers', value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      color="secondary"
                      autoComplete="off"
                      sx={{ mb: 1, mt: 1, width: '130px' }}
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
                  sx={{ mb: 1, mt: 1, width: '130px' }}
                  onChange={(e) => handleFilterChange('dueDate', e.target.value)}
                />
              </TableCell>
              <TableCell align="right">
                <Autocomplete
                  fullWidth
                  options={['True', 'False']}
                  onChange={(e, value) => handleFilterChange('isAssigned', value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      color="secondary"
                      autoComplete="off"
                      sx={{ mb: 1, mt: 1, width: '130px' }}
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
                  sx={{ mb: 1, mt: 1, width: '130px' }}
                />
              </TableCell>
              <TableCell align="right">
                <Autocomplete
                  fullWidth
                  options={['Low', 'Medium', 'High']}
                  onChange={(e, value) => handleFilterChange('priority', value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      color="secondary"
                      autoComplete="off"
                      sx={{ mb: 1, mt: 1, width: '130px' }}
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
                  sx={{ mb: 1, mt: 1, width: '130px' }}
                  onChange={(e) => handleFilterChange('createdOn', e.target.value)}
                />
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            {paginatedRows.map((row, index) => (
              <TableRow
                key={row.id}
                draggable
                onDragStart={() => dragRow.current = index}
                onDragEnter={() => draggedOverRow.current = index}
                onDragEnd={handleInterChangeRow}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } ,cursor:'pointer'}}
                
              >
                <TableCell component="th" scope="row">
                </TableCell>
                <TableCell align="right">{page * rowsPerPage + index + 1}</TableCell>
                <TableCell align="right">{row.taskTitle}</TableCell>
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right"><span style={{color:handleGetStatusColor(row.status),
                  backgroundColor:handleGetBackgroundColor(row.status),padding:'5px',borderRadius:'10px'}}>{row.status}</span></TableCell>
                <TableCell align="right"><span style={{color:handleGetTeamColor(row.assignedMembers),
                  backgroundColor:handleTeamBackgroundColor(row.assignedMembers),padding:'5px',borderRadius:'10px'}}>{row.assignedMembers}</span></TableCell>
                <TableCell align="right">{row.dueDate}</TableCell>
                <TableCell align="right">{row.isAssigned}</TableCell>
                <TableCell align="right">{row.estimatedHours}</TableCell>
                <TableCell align="right"><span style={{color:handleGetPriorityColor(row.priority),
                  backgroundColor:handleGetPriorityBgColor(row.priority),padding:'10px',borderRadius:'10px'}}>{row.priority}</span></TableCell>
                <TableCell align="right">{row.createdOn}</TableCell>
                <TableCell align="right">
                  <EditIcon onClick={() => handleEditTask(row.id)} style={{ cursor: 'pointer' }} />
                  <DeleteForeverIcon onClick={() => handleDeleteTask(row.id)} style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredRows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default TaskTable;
