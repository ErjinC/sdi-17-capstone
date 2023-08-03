import React, {useContext, useState} from 'react'
import './Register.css'
import { ToastContainer, toast } from 'react-toastify';
import { ParentContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { ChakraProvider, Select } from '@chakra-ui/react'

const Register = () => {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [base, setBase] = useState('Los Angeles SFB');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate()

  const { locations } = useContext(ParentContext)

  const handleRegistration = () => {
    // console.log(email)
    if (first === '' || last === '' || username === '' || password === '' || base === '' || phone.length < 10) {
      return toast.error('Please fill in all fields', {position: toast.POSITION.BOTTOM_CENTER})
    } else if (password !== passwordConfirm) {
      return toast.error('Passwords do not match, please try again.', {position: toast.POSITION.BOTTOM_CENTER})
      // alert('Passwords do not match, please try again.')
    } else {
      fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([{
          'first_name': first,
          'last_name': last,
          'username': username,
          'password': password,
          'base': base,
          'email': email,
          'phone': phone.slice(0,3)+'-'+phone.slice(3,6)+'-'+phone.slice(6),
        }])
      })
      .then((data) => data.json())
      .then(res => {
        // console.log(res)
        if(!res.success){
          toast.error('Account already exists', {position: toast.POSITION.BOTTOM_CENTER})
        }else{
          toast.success('Registration successful', {position: toast.POSITION.BOTTOM_CENTER, onClose: () => navigate('/login')})
        }
      })
    }
  }

  return (
      <div id="page">
        <ChakraProvider>
          <div id='registersection'>
            <div id='registerheader'>Lemon Drop Registration</div>
            <div id='flexcontainerregister'>
              <div id='registerfield'>
                <div id="firstname">
                  <span class="material-symbols-outlined loginicon">account_box</span>
                  <input
                  type='textbox'
                  placeholder='First Name'
                  id='first'
                  onChange={() => {
                    setFirst(document.getElementById('first').value)
                  }}
                  ></input>
                </div>

                <div id="lastname">
                  <span class="material-symbols-outlined loginicon">account_box</span>
                  <input
                  type='textbox'
                  placeholder='Last Name'
                  id='last'
                  onChange={() => {
                    setLast(document.getElementById('last').value)
                  }}
                  ></input>
                </div>

                <div id="register-email">
                <span class="material-symbols-outlined loginicon">email</span>
                  <input
                  type='text'
                  defaultValue={email}
                  pattern="^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$"
                  placeholder='E-Mail'
                  id='email-value'
                  onChange={() => {setEmail(document.getElementById('email-value').value)}}
                  ></input>
                </div>

                <div id="base">
                  <span class="material-symbols-outlined loginicon">home</span>
                  {/* <select name="base" id='base-value' onChange={() => setBase(document.getElementById('base-value').value)}> */}
                  <Select name="base" id='base-value' defaultValue='' required onChange={(event) => setBase(event.target.value)}>
                    <option value="" disabled> -- Please choose a base -- </option>
                    {locations?.map((baseOption) => {
                      return (
                        <option value={ baseOption.name }>{ baseOption.name }</option>
                      )
                    })}
                  </Select>
                </div>

                <div id="register-phone">
                <span class="material-symbols-outlined loginicon">phone</span>
                  <input
                  type='text'
                  defaultValue={phone}
                  maxLength={10}
                  pattern="^[0-9]{10}$"
                  placeholder='Phone #'
                  id='phone-value'
                  onChange={() => {setPhone(document.getElementById('phone-value').value)}}
                  ></input>
                </div>

                <div id="register-username">
                <span class="material-symbols-outlined loginicon">person</span>
                  <input
                  type='textbox'
                  placeholder='Username'
                  id='username-value'
                  onChange={() => {
                    setUsername(document.getElementById('username-value').value)
                  }}
                  ></input>
                </div>

                <div id="register-password">
                  <span class="material-symbols-outlined loginicon">lock</span>
                  <input
                  type='password'
                  placeholder='Password'
                  id='password-value'
                  onChange={() => {
                    setPassword(document.getElementById('password-value').value)
                  }}
                  ></input>
                </div>

                <div id="passwordConfirm">
                  <span class="material-symbols-outlined loginicon">lock</span>
                  <input
                  type='password'
                  placeholder='Confirm Password'
                  id='passwordConfirm-value'
                  onKeyDown={(e) => {if(e.key === "Enter") {
                    handleRegistration()
                  }}}
                  onChange={() => {
                    setPasswordConfirm(document.getElementById('passwordConfirm-value').value)
                  }}
                  ></input>
                </div>

                <div id='registerbuttoncontainer'>
                  <button
                  id='registerbutton'
                  onClick={() => {handleRegistration() }}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        <ToastContainer autoClose={1500}/>
        </ChakraProvider>
    </div>
  )
}

export default Register