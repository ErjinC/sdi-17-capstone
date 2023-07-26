import React, {useState} from 'react'
import './Login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

async function loginUser(credentials) {
  return fetch('http://localhost:3001/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then(data => data.json())
}

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    // e.preventDefault();
    if (username === '' || password === '') {
      toast.error('Please fill in both fields', {
        position: toast.POSITION.BOTTOM_CENTER,
        className: 'toast-message'
      });
    } else {
      // console.log('trying to fetch: ', username, password)
      // auth will return either {object} or false
      const res = await loginUser([{
        'username': username,
        'password': password
      }]);
      
      if (!res.success) {
        toast.error('Invalid username or password', {
          position: toast.POSITION.BOTTOM_CENTER,
          className: 'toast-message'
        });
      } else {
        sessionStorage.setItem('CurrentUser', JSON.stringify(res))
        //Redirect to homepage
        window.location='/'
        alert('Login Successful!')
      }
    }
  }


  return (
    <div id='page'>
      <div id="loginsection">
        <div id='loginheader'>Lemon Drop Login</div>
        <div id='flexcontainerlogin'>
          <div id='loginfield'>
            <div id='username'>
              <span className="material-symbols-outlined loginicon">person</span>
              <input
              type='textbox'
              placeholder='Username'
              onChange={e => {
                setUsername(e.target.value)
              }}
              ></input>
            </div>

            <div id='password'>
              <span className="material-symbols-outlined loginicon">lock</span>
              <input
              type='password'
              placeholder='Password'
              onChange={e => {
                setPassword(e.target.value)
              }}
              ></input>
            </div>

            <button id="loginbutton" onClick={handleSubmit}>Login</button>
          </div>

        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Login