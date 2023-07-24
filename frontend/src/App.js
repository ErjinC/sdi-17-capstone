import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './header/Header.js'
import { useEffect } from 'react';
import Profile from './header/Profile';
import Login from './login/Login';
import Register from './register/Register.js'
import useAuth from './useAuth.js'

function App() {
  const navigate = useNavigate()
  const { setAuth } = useAuth()


  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<p>placeholder</p>} />
        <Route path='/login' element={<Login setAuth={setAuth}/>} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
