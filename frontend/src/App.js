import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './header/Header.js'
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate()


  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<p>placeholder</p>} />
      </Routes>
    </div>
  );
}

export default App;
