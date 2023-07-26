import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './header/Header.js'
import { useEffect, useState } from 'react';
import Profile from './header/Profile';
import Login from './login/Login';
import MyListings from './myListings/MyListings';
import Register from './register/Register.js'
import FrontPage from './frontpage/FrontPage.js'
import BoatDetail from './vehiclecarddetail/BoatDetail.js'
// import useAuth from './useAuth.js';

function App() {
  // const navigate = useNavigate()
  // const { setAuth } = useAuth()
  //set to default api return 
  const [currentUser, setCurrentUser] = useState({success:false});

  useEffect(() => {
    if (sessionStorage.getItem('CurrentUser') !== null) {
      setCurrentUser(JSON.parse(sessionStorage.getItem("CurrentUser")))
    }
  },[])

  return (
    <>
      <Header currentUser = {currentUser}/>
      <div id='fullpage'>
        <Routes>
          <Route path='/' element={<FrontPage currentUser = {currentUser}/>} />
          <Route path='/login' element={<Login currentUser = {currentUser} setCurrentUser={setCurrentUser}/>} />
          <Route path='/profile' element={<Profile currentUser = {currentUser} setCurrentUser={setCurrentUser} />} />
          <Route path='/register' element={<Register currentUser = {currentUser} />} />
          <Route path='/test' element={<BoatDetail currentUser = {currentUser} />} />
          <Route path='/listings' element={<MyListings />} />
        </Routes>
      </div>
      <div id='credits'>Created by SDI-17 Group 6 - Andrew Galbraith | Anthony Gravante | Ben Lesko | Erjin Choi | Kevin Cagle | Moses Jackson</div>
    </>
  );
}

export default App;
