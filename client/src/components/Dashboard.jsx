import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import ViewTask from "./ViewTask";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  let [tasks, setTasks] = useState([])
  let navigate = useNavigate();
  async function fetchTasks() {
    try {
      let token = JSON.parse(localStorage.getItem('token')).token
      let res = await axios.get('/api/task', {
        headers: {
          "authorization": `Bearer ${token}`
        }
      })


      //console.log(res.data)
      setTasks(res.data)


    } catch (error) {
      console.log(error)
    }
  }


  async function deleteTask(taskId) {
    try {
      let token = JSON.parse(localStorage.getItem('token')).token;
      await axios.delete(`/api/task/${taskId}`, {
        headers: {
          "authorization": `Bearer ${token}`
        }
      });

      let updatedTasks = tasks.filter((ele) => ele._id !== taskId);
      setTasks(updatedTasks);
      //fetchTasks(); // Refresh the tasks after deleting a task
    } catch (error) {
      console.log(error);
    }
  }


  function onClickHandler(taskid, taskName, deadline) {

    navigate(
      '/task/edit',
      {
        state: {
          taskid, taskName
          //, deadline: new Date(deadline.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }))
          ,deadline : String(deadline).slice(0,16)
        }
      }
    )
  }


  useEffect(() => {
    fetchTasks()
  }, [])





  return (
    <>
    <div className="dashboard">
      <div className="dashboard_main">
        <div className="dashboard_header">
          <div className="h1">
            <h1><i>DASHBOARD</i></h1>
          </div>
          <div className="h2">
            <ul>
              <li ><Link to='/login' className="h3">BACK</Link></li>
              <li><Link to='/addtask' className="h3">ADD TASK</Link></li>
              <li onClick={() => {
            localStorage.removeItem('token')
            navigate("/");
          }} className="h3">LOG OUT</li>
            </ul>
          </div>
        </div>

        </div>
        <div className="dashboard_data">
         <center><table>
          <thead>
            <tr>
              <th>Serial No</th>
              <th>Task Name</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Delete</th>
              <th>Edit</th>
              <th>View</th>

            </tr>
            </thead>


            {tasks.map((task, index) => {
              return (
                <tbody key={task._id}>
                <tr >
                  <td>{1 + index}</td>
                  <td>{task.taskName}</td>
                  <td>{new Date(task.deadline).toLocaleDateString()}</td>
                  <td>{task.isCompleted ? "completed" : "Pending"}</td>
                  <td><button className="delete-button" type="delete" onClick={() => deleteTask(task._id)}>&#10006;</button></td>
                  <td><button className="edit-button" onClick={() => onClickHandler(task._id, task.taskName, task.deadline)} type="edit">&#9998;</button></td>
                  <td><Link to={`/task/${task._id}`} className="view-link">View</Link></td>
                </tr>
                </tbody>
              )
            })}
          </table>
          </center> 
        </div>
        </div>
    </>
  )
}

export default Dashboard