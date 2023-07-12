import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const postData = (e) => {
      e.preventDefault();
      axios.post('http://localhost:4000/login', {
        email,
        password
      })
      .then(res => {console.log('posting data', res);
      if(!res.data.error){
        const token = res.data;
        localStorage.setItem('token', token.toString());
        if(email=="admin@admin.com" &&password=="admin"){
        navigate('/adminDashboard');
        }
        else{
          navigate('/dashboard');
        }
      };
    })
      .catch(err => console.error(err));
    };
  
  
    return (
  <>
      <Navbar/>
      <div className='card signUpPage'>
      <h1>Login</h1>
      <form onSubmit={postData} className='signUp'>

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
        <button className='btn submitbtn' type="submit">Login</button>
        </div>
      </form>
      </div>
      </>
  )
}

export default Login