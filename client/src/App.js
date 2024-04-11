import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/signup/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Privateroutes from './components/Privateroutes';
import AddTask from './components/AddTask';
import ViewTask from './components/ViewTask';
import EditTask from './components/EditTask';
import { useState } from 'react';
import { ToastContainer } from "react-toastify";

function App() {
  const [alert, setAlert] = useState(null);




  const showAlert = (payload) => {
    setAlert({
      type: payload.type,
      msg: payload.msg
    })

    setTimeout(() => {
      setAlert(null);
    }, 2000)
  }

  return (
   
      <div className='main_content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login alert={alert} showAlert={showAlert} />} />
          <Route path='/signup' element={<SignUp alert={alert} showAlert={showAlert} />} />


          <Route element={<Privateroutes />}>

            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/addtask' element={<AddTask alert={alert} showAlert={showAlert}/>} />
            <Route path='/task/:taskid' element={<ViewTask />} />
            <Route path='/task/edit' element={<EditTask />} />

          </Route>
        </Routes>
        <ToastContainer position="top-center" />
      </div>
  
  );
}

export default App;
