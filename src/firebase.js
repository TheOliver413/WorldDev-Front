import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBxMPyeNNJuHkCS3T_xLHENGc737ashsjg",
    authDomain: "world-developer-f5a6e.firebaseapp.com",
    projectId: "world-developer-f5a6e",
    storageBucket: "world-developer-f5a6e.appspot.com",
    messagingSenderId: "920995481962",
    appId: "1:920995481962:web:dbd163cb1cdfffb00dbd13"
};
export const actionCodeSettings = {
    url: 'https://world-developer.firebaseapp.com/__/auth/action?mode=action&oobCode=code',
    handleCodeInApp: true,
  };
  //noreply@world-developer-f5a6e.firebaseapp.com

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)