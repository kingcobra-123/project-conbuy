import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Landingpage from './components/auth/landingpage';
import SignUp from './components/auth/signup';
import SignIn from './components/auth/signin';
import HomePage from './components/Homepage/homepage';
import ForgetPassword from './components/auth/forgetpassword';
import Listings from './components/Homepage/listings';
import DetailedListings from './components/Homepage/detailedlistings';
import MyTabs from './components/Homepage/bottomtabnavigator';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Firebase_App } from './components/auth/firebaseconfig';
import { Firebase_Auth } from './components/auth/firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';



const Stack = createStackNavigator();

export default function App() {
  const[loading, setLoading] = useState(true)
  const[user,setUser] = useState(null)
  const auth = Firebase_Auth

  useEffect  (()=>{
    const subsribe = onAuthStateChanged(Firebase_Auth, currentuser=>{
      setUser(currentuser)
      setLoading(false)
    });
    return subsribe;
  }, []);

  if(loading){
    return null
  }




  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage"
      screenOptions={{headerShown: false}}>
        {user ? (
          <Stack.Screen
            name = "bottomtabs"
            component={MyTabs}
            screenOptions={{headerShown:false}}
          ></Stack.Screen>
        ) : (
          <>
            <Stack.Screen
              name="LandingPage"
              component={Landingpage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp Page"
              component={SignUp}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ForgetPassword"
              component={ForgetPassword}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff4b8',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
