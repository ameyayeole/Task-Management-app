import React, {useState ,useEffect} from 'react';
import axios from 'axios';
import UserDashboardside from '../components/userDashboardside';
const TaskForm = () => {
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
    <div>
<UserDashboardside/>
<main>
      <h2>Add Task</h2>
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
          <label>Status:</label>
          <input
            type="checkbox"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
          />
        </div>
        <div>
          <label>Assigned To:</label>
          <input
            type="text"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </main>
    </div>
  );
};

export default TaskForm;
