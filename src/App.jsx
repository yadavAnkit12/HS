import React from 'react';
import { Outlet } from 'react-router-dom';
import TaskTable from './Components/TableData'

function App() {

  return (
    <>
     <TaskTable/>
     <Outlet />
    </>
  )
}

export default App
