import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import App from './App.jsx'
import './index.css'
import CreateTask from './Components/CreateTask.jsx';
import TaskTable from './Components/TableData.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<TaskTable />}>

      {/* <Route path="/newTask" element={<CreateTask />} />  */}
      <Route path="/task/:id/*" element={<CreateTask/>} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <RouterProvider router={router} />
  
)

