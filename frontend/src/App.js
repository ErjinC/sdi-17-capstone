import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './header/Header.js'
import { useEffect, useState, createContext } from 'react';
import Profile from './header/Profile';
import Login from './login/Login';
import MyListings from './myListings/MyListings';
import Register from './register/Register.js'
import FrontPage from './frontpage/FrontPage.js'
import CreateListing from './myListings/CreateListing';
import Admin from './admin/Admin';

export const ParentContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState({success:false});
  const [userFavorites, setUserFavorites] = useState((sessionStorage.getItem('CurrentUser') !== null)?JSON.parse(sessionStorage.getItem('CurrentUser')).favorites.split(',').map(item => parseInt(item)):[]);
  const [locations, setLocations] = useState([])
  
  useEffect(() => {
    if (sessionStorage.getItem('CurrentUser') !== null) {
      setCurrentUser(JSON.parse(sessionStorage.getItem("CurrentUser")))
    }
    
    fetch('http://localhost:3001/bases')
        .then((res) => res.json())
        .then((data) => {
            setLocations(data)
        })
    
  },[])

  const contextValues = {
    currentUser, 
    setCurrentUser,
    userFavorites,
    setUserFavorites,
    locations,
    setLocations
  }

  return (
    <ParentContext.Provider value={contextValues}>
        <Header />
        <div id='fullpage'>
          <Routes>
            <Route path='/' element={<FrontPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/register' element={<Register />} />
            <Route path='/listings' element={<MyListings />} />
            <Route path='/createListing' element={<CreateListing />} />
            <Route path='/admin' element={<Admin />} />
          </Routes>
        </div>
        {/* <div id='credits'>Created by SDI-17 Group 6 - Andrew Galbraith | Anthony Gravante | Ben Lesko | Erjin Choi | Kevin Cagle | Moses Jackson</div> */}
    </ParentContext.Provider>
  );
}

export default App;
