// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {getReactNativePersistence} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getAuth, initializeAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTP3HkHxrRTDhJ-KpoUJIQDeul-2rVKSo",
  authDomain: "conbuy-31e58.firebaseapp.com",
  databaseURL: "https://conbuy-31e58-default-rtdb.firebaseio.com",
  projectId: "conbuy-31e58",
  storageBucket: "conbuy-31e58.appspot.com",
  messagingSenderId: "320934733911",
  appId: "1:320934733911:web:87347be4b1f45b86641b12",
  measurementId: "G-71HQWL84LM"
};

// Initialize Firebase
export const Firebase_App = initializeApp(firebaseConfig);
export const Firebase_Auth = initializeAuth(Firebase_App, {
    persistence: getReactNativePersistence(AsyncStorage)
})
export const Firebase_db = getFirestore(Firebase_App)
