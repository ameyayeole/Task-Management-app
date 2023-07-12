import React,{useState,useEffect} from 'react'
import axios from 'axios'
import AdminDashboardside from '../components/adminDashboardside';


const AssignTask = () => {
        const [title, setTitle] = useState('');
        const [body, setBody] = useState('');
        const [dueDate, setDueDate] = useState('');
        const [status, setStatus] = useState(false);
        const [assignedTo, setAssignedTo] = useState('');
        const [token, setToken] = useState('');
      
        useEffect(() => {
      
          const storedToken = localStorage.getItem('token'); 
          setToken(storedToken);
        }, []);
      
        function handleSubmit(e) {
          e.preventDefault();
      
          const newTask = {
            title,
            body,
            dueDate,
            status,
            assignedTo,
          };
      
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          };
      
          axios.post('http://localhost:4000/addTask', newTask, config)
            .then((res) => {
              console.log("posting data");
              console.log(res.data);
              // Reset form fields
              setTitle('');
              setBody('');
              setDueDate('');
              setStatus(false);
              setAssignedTo('');
            })
            .catch((err) => console.log(err));
        }
    
      
  return (
    <>
        <AdminDashboardside/>
        <main>
        <h2>Assign Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Body:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
    
        <div>
          <label>Assigned To:</label>
          <input
            type="email"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            required
          />
        </div>
        <button type="submit">Assign</button>
      </form>
    </main>
    
    </>
  )
}

export default AssignTask