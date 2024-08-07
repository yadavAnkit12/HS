import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import App from './App.jsx'
import './index.css'
import CreateTask from './Components/CreateTask.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>

      <Route path="/newTask" element={<CreateTask />} />
      <Route path="/:id" element={<CreateTask/>} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <RouterProvider router={router} />
  
)

