import React, {useState} from 'react'
import './Login.css'
// import { ToastContainer, toast } from 'react-toastify';
import { ChakraProvider, useToast } from '@chakra-ui/react';
import 'react-toastify/dist/ReactToastify.css';
import { ParentContext } from '../App';

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
  const {currentUser, setCurrentUser} = React.useContext(ParentContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast()

  const handleSubmit = async e => {
    // e.preventDefault();
    if (username === '' || password === '') {
      toast({
        title: 'Please fill in both fields',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    } else {
      // console.log('trying to fetch: ', username, password)
      // auth will return either {object} or false
      const res = await loginUser([{
        'username': username,
        'password': password
      }]);
      
      if (!res.success) {
        toast({
          title: 'Invalid username or password',
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      } else {
        sessionStorage.setItem('CurrentUser', JSON.stringify(res))
        //Redirect to homepage
        // window.location='/'
        // alert('Login Successful!')
        toast({
          title: 'Login Successful!',
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
        setTimeout(() => {
          window.location='/'
        }, 2000);
      }
    }
  }


  return (
    <ChakraProvider>
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
              onKeyDown={(e) => {if(e.key === "Enter") {
                handleSubmit()
              }}}
              onChange={e => {
                setPassword(e.target.value)
              }}
              ></input>
            </div>

            <button id="loginbutton" 
            onClick={handleSubmit}>Login</button>
          </div>

        </div>
      </div>
      {/* <ToastContainer/> */}
    </div>
    </ChakraProvider>
  )
}

export default Login;