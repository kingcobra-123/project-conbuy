import { useEffect, useState, createContext, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useColorScheme} from 'react-native';
import Landingpage from './src/components/auth/landingpage';
import SignUp from './src/components/auth/signup';
import SignIn from './src/components/auth/signin';
import ForgetPassword from './src/components/auth/forgetpassword';
import MyTabs from './src/components/Homepage/bottomtabnavigator';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Firebase_Auth } from './src/components/auth/firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';
import UserProvider from './src/components/userprofile/userprofile';
import UserMetaDataProvider from './src/components/userprofile/usermetadata';
import HighLevelCategoryProvider from './src/utilitycomponents/fetchcategories';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import ListingsStackScreen from './src/components/Homepage/bottomtabnavigator';





const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    notification: '#fff4b8',
  },
};




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
    <UserProvider>
      <UserMetaDataProvider>  
      <HighLevelCategoryProvider>
      <PaperProvider theme={MyTheme}>
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
      </PaperProvider>
      </HighLevelCategoryProvider>
      </UserMetaDataProvider>
      </UserProvider>
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
