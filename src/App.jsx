import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateTask from './Components/CreateTask';
import TaskTable from './Components/TableData';
// import TaskTable from './Components/TableData'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<TaskTable />} />
        <Route path='/task/:id/' element={<CreateTask />} />
      </Routes>
    </>
  )
}

export default App
