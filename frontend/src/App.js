import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './header/Header.js'
import { useEffect, useState } from 'react';
import Profile from './header/Profile';
import Login from './login/Login';
import Register from './register/Register.js'
import FrontPage from './frontpage/FrontPage.js'
// import useAuth from './useAuth.js';

function App() {
  const navigate = useNavigate()
  // const { setAuth } = useAuth()
  //set to default api return 
  const [currentUser, setCurrentUser] = useState({success:false});

  useEffect(() => {
    if (sessionStorage.getItem('CurrentUser') !== null) {
      setCurrentUser(JSON.parse(sessionStorage.getItem("CurrentUser")))
      sessionStorage.setItem("CurrentUser", JSON.stringify(JSON.parse(sessionStorage.getItem("CurrentUser"))))
    }
  },[])

  return (
    <div>
      <Header currentUser = {currentUser}/>
      <Routes>
        <Route path='/' element={<FrontPage currentUser = {currentUser}/>} />
        <Route path='/login' element={<Login currentUser = {currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path='/profile' element={<Profile currentUser = {currentUser} />} />
        <Route path='/register' element={<Register currentUser = {currentUser} />} />
      </Routes>
    </div>
  );
}

export default App;
