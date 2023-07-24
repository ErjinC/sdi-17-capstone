import { useState } from 'react';

function useAuth() {
  const getAuth = () => {
    const authString = sessionStorage.getItem('auth');
    const userAuth = JSON.parse(authString);
    return userAuth
  }

  const [auth, setAuth] = useState(getAuth());

  const saveAuth = userAuth => {
    sessionStorage.setItem('auth', JSON.stringify(userAuth));
    setAuth(userAuth)
  }

  return {
    setAuth: saveAuth,
    auth
  }
}


export default useAuth