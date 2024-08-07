import { Autocomplete, Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useParams, useNavigate } from 'react-router-dom';

const CreateTask = () => {

  const routeParams = useParams()
  const navigate = useNavigate();
  const [taskID, setTaskID] = useState('')

  useEffect(() => {
    const { id } = routeParams

    if (id != 'new') {
      setTaskID(id)
      const existingTasks = JSON.parse(localStorage.getItem('taskData'))
      const taskToEdit = existingTasks.find(task => task.id === parseInt(id));

      if (taskToEdit) {
        formik.setValues({
          id: taskToEdit.id,
          taskTitle: taskToEdit.taskTitle,
          status: taskToEdit.status,
          assignedMembers: taskToEdit.assignedMembers,
          dueDate: taskToEdit.dueDate,
          isAssigned: taskToEdit.isAssigned,
          estimatedHours: taskToEdit.estimatedHours,
          priority: taskToEdit.priority
        })
      }
    }
  }, [routeParams])

  const SelectStatus = [
    { id: 1, status: 'Uninitiated' },
    { id: 2, status: 'In Progress' },
    { id: 3, status: 'Completed' },
  ];

  const teamMember = [
    { id: 1, team: 'Team Member 1' },
    { id: 2, team: 'Team Member 2' },
    { id: 3, team: 'Team Member 3' },
    { id: 4, team: 'Team Member 4' },
  ];

  const isAssigned = [
    { id: 1, value: 'True' },
    { id: 2, value: 'False' },
  ];

  const SelectPriority = [
    { id: 1, priority: 'Low' },
    { id: 2, priority: 'Medium' },
    { id: 3, priority: 'High' },
  ];

  const validationSchema = yup.object().shape({
    taskTitle: yup.string().required('Please enter your task title'),
    status: yup.string().required('Please enter your status'),
    assignedMembers: yup.string().required('Please enter your assigned Member'),
    dueDate: yup.string().required('Please select due date'),
    isAssigned: yup.string().required('Please select is assigned'),
    estimatedHours: yup.string().required('Please select estimated hours'),
    priority: yup.string().required('Please select priority'),
  });

  const generateRandomId = () => {
    return Math.floor(Math.random() * 10);
  };

  const handleSubmit = (values) => {
    const today = new Date();
    const todayISO = today.toISOString().split('T')[0];

    const existingTasks = JSON.parse(localStorage.getItem('taskData')) || [];

    if (taskID) {
      // Update existing task
      const updatedTasks = existingTasks.map(task =>
        task.id === parseInt(taskID) ? { ...task, ...values, id: parseInt(taskID), createdOn: todayISO } : task
      );
      localStorage.setItem('taskData', JSON.stringify(updatedTasks));
    } else {
      // Create new task
      const task = { id: generateRandomId(), ...values, createdOn: todayISO };
      existingTasks.push(task);
      localStorage.setItem('taskData', JSON.stringify(existingTasks));
    }

    formik.resetForm();
    navigate('/');
    window.location.reload()
  };

  const formik = useFormik({
    initialValues: {
      taskTitle: '',
      status: '',
      assignedMembers: '',
      dueDate: '',
      isAssigned: '',
      estimatedHours: '',
      priority: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <div style={{ padding: '20px' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4" align="center">Create Task</Typography>
            </Grid>

            <Grid item xs={12} container alignItems="center">
              <Grid item xs={4}>
                <Typography variant="h6">Task Title</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  name="taskTitle"
                  label="Task Title"
                  variant="outlined"
                  required
                  value={formik.values.taskTitle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.taskTitle && Boolean(formik.errors.taskTitle)}
                  helperText={formik.touched.taskTitle && formik.errors.taskTitle}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid item xs={12} container alignItems="center">
              <Grid item xs={4}>
                <Typography variant="h6">Status</Typography>
              </Grid>
              <Grid item xs={8}>
                <Autocomplete
                  disablePortal
                  value={SelectStatus.find(option => option.status === formik.values.status) || null}
                  options={SelectStatus}
                  getOptionLabel={(option) => option.status}
                  onChange={(event, value) => formik.setFieldValue('status', value ? value.status : '')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Status"
                      name='status'
                      fullWidth
                      variant="outlined"
                      required
                      onBlur={formik.handleBlur}
                      error={formik.touched.status && Boolean(formik.errors.status)}
                      helperText={formik.touched.status && formik.errors.status}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} container alignItems="center">
              <Grid item xs={4}>
                <Typography variant="h6">Assigned Members</Typography>
              </Grid>
              <Grid item xs={8}>
                <Autocomplete
                  disablePortal
                  value={teamMember.find(option => option.team === formik.values.assignedMembers) || null}
                  options={teamMember}
                  getOptionLabel={(option) => option.team}
                  onChange={(event, value) => formik.setFieldValue('assignedMembers', value ? value.team : '')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Assigned Team Members"
                      name='assignedMembers'
                      fullWidth
                      variant="outlined"
                      required
                      onBlur={formik.handleBlur}
                      error={formik.touched.assignedMembers && Boolean(formik.errors.assignedMembers)}
                      helperText={formik.touched.assignedMembers && formik.errors.assignedMembers}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} container alignItems="center">
              <Grid item xs={4}>
                <Typography variant="h6">Due Date</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  name="dueDate"
                  value={formik.values.dueDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.dueDate && Boolean(formik.errors.dueDate)}
                  helperText={formik.touched.dueDate && formik.errors.dueDate}
                  required
                />
              </Grid>
            </Grid>

            <Grid item xs={12} container alignItems="center">
              <Grid item xs={4}>
                <Typography variant="h6">Is Assigned</Typography>
              </Grid>
              <Grid item xs={8}>
                <Autocomplete
                  disablePortal
                  value={isAssigned.find(option => option.value === formik.values.isAssigned) || null}
                  options={isAssigned}
                  getOptionLabel={(option) => option.value}
                  onChange={(event, value) => formik.setFieldValue('isAssigned', value ? value.value : '')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select is Assigned"
                      name='isAssigned'
                      fullWidth
                      variant="outlined"
                      required
                      onBlur={formik.handleBlur}
                      error={formik.touched.isAssigned && Boolean(formik.errors.isAssigned)}
                      helperText={formik.touched.isAssigned && formik.errors.isAssigned}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} container alignItems="center">
              <Grid item xs={4}>
                <Typography variant="h6">Estimated Hours</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  type="time"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  name="estimatedHours"
                  value={formik.values.estimatedHours}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.estimatedHours && Boolean(formik.errors.estimatedHours)}
                  helperText={formik.touched.estimatedHours && formik.errors.estimatedHours}
                  required
                />
              </Grid>
            </Grid>

            <Grid item xs={12} container alignItems="center">
              <Grid item xs={4}>
                <Typography variant="h6">Priority</Typography>
              </Grid>
              <Grid item xs={8}>
                <Autocomplete
                  disablePortal
                  value={SelectPriority.find(option => option.priority === formik.values.priority) || null}
                  options={SelectPriority}
                  getOptionLabel={(option) => option.priority}
                  onChange={(event, value) => formik.setFieldValue('priority', value ? value.priority : '')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Priority"
                      name='priority'
                      fullWidth
                      variant="outlined"
                      required
                      onBlur={formik.handleBlur}
                      error={formik.touched.priority && Boolean(formik.errors.priority)}
                      helperText={formik.touched.priority && formik.errors.priority}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} container justifyContent="center">
              <Button
                variant="contained"
                style={{ border: '2px solid green', color: 'black', backgroundColor: 'white' }}
                type="submit"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </div>
      </form>
    </Container>
  );
};

export default CreateTask;
