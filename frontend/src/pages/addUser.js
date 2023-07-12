import React , {useState} from 'react'
import axios from 'axios';

import AdminDashboardside from '../components/adminDashboardside'
const AddUser = () => {
  const [name, setName] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const postData = (e) => {
      e.preventDefault();
      axios.post('http://localhost:4000/signup', {
        name,
        email,
        password
      })
      .then(res => {console.log('posting data', res);
    })
      .catch(err => console.error(err));
    };
  return (
   <>
    <AdminDashboardside/>
    <main>
    <div className='card signUpPage'>
      <h1>Add User</h1>
      <form onSubmit={postData} className='signUp'>
      <div>
        <label>Name</label>
        <input
          type="text"
          id="username"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">ADD User</button>
      </form>
      </div>
    </main>
   </>
  )
}

export default AddUser