
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {getReactNativePersistence} from "firebase/auth"
import {getAuth, initializeAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"


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


export const Firebase_App = initializeApp(firebaseConfig);
export const Firebase_Auth = initializeAuth(Firebase_App, {
    persistence: getReactNativePersistence(AsyncStorage)
})
export const Firebase_db = getFirestore(Firebase_App)
export const Firebase_storage = getStorage(Firebase_App)
