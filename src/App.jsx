import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateTask from './Components/CreateTask';
import TaskTable from './Components/TableData';
import Sorry from './Components/Sorry';
// import TaskTable from './Components/TableData'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Sorry/>} />
      </Routes>
    </>
  )
}

export default App
