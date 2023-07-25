import React, {useState} from 'react'
import './Register.css'

const Register = () => {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [base, setBase] = useState('');

  const allBases = [
    'Los Angeles SFB',
    'Edwards AFB',
    'Vandenberg SFB',
    'Patrick SFB',
    'Peterson SFB',
    'Schriever SFB',
    'Buckley SFB',
    'Offutt AFB',
    'Wright-Patterson AFB',
    'Eglin AFB',
    'Kirtland AFB',
    'Lackland AFB',
    'Langley AFB',
    'Travis AFB',
    'Luke AFB'
  ];

  return (
    <div id="page">
      <div id='registersection'>
        <div id='registerheader'>Lemon Drop User Registration</div>
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

            <div id="username">
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

            <div id="password">
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

            <div id="base">
              <span class="material-symbols-outlined loginicon">home</span>
              <select name="base" id='base-value' onChange={() => setBase(document.getElementById('base-value').value)}>
                <option value="" disabled> --Please choose a base -- </option>
                {allBases.map((baseOption) => {
                  return (
                    <option value={ baseOption }>{ baseOption }</option>
                  )
                })}
              </select>

            </div>

            <button
            id='registerbutton'
            onClick={() => {
              if (document.getElementById('first').value === '' || document.getElementById('username').value === '' || document.getElementById('username').value === '' || document.getElementById('password').value === '' || document.getElementById('base').value === '') {
                alert('Please fill in ALL text boxes!')
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
                    'base': base
                  }])
                })
                .then(data => data.json())
                .then(window.location='/login')
                .then(alert('Registration Successful!'))
              }
            }}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register