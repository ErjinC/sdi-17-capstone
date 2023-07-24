import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './header/Header.js'
import { useEffect } from 'react';
import Profile from './header/Profile';
import Login from './login/Login';
import Register from './register/Register.js'

function App() {
  const navigate = useNavigate()


  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<p>placeholder</p>} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
