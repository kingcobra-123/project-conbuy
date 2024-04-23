import React, { createContext, useState, useEffect, useContext } from 'react'
import { Text, View } from 'react-native'
import { Firebase_Auth } from '../auth/firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';

export const userContext = React.createContext(null)

const UserProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const auth = Firebase_Auth

  useEffect(()=>{
    const subscribe = onAuthStateChanged(auth, currentuser=>{
      setUser(currentuser)
    });
    return subscribe;
  }, [])

  return(
    <userContext.Provider value={user}>
      {children}
    </userContext.Provider>
  )
};

export default UserProvider;
