import React, { createContext, useState, useEffect, useContext } from 'react'
import { Text, View } from 'react-native'
import { Firebase_Auth } from '../auth/firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';

export const userContext = React.createContext(null)

const UserProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const[loading, setLoading] = useState(true)
  const auth = Firebase_Auth

  useEffect(()=>{
    setLoading(true)
    const subscribe = onAuthStateChanged(auth, currentuser=>{
      if(currentuser){
        setUser(currentuser)
        setLoading(false)
      } else {
        setUser(null)
        setLoading(false)
      }

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
