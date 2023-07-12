import {React,useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const postData = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/signup', {
      name,
      email,
      password
    },{
  headers: {
    'Content-Type': 'application/json'
  }
})
    .then(res => {console.log('posting data', res)
    if(!res.data.error){
      navigate('/login');
    };
  })
    .catch((err) => {
      console.log(err);

    });
  };


  return (
    <>
    <Navbar />
    <div className='card signUpPage'>
    <h1 >Sign up</h1>
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
      <div className='button'>
        <button className='btn submitbtn' type="submit">Signup</button>
        </div>
    </form>
    </div>
    </>
  );
}

export default Signup