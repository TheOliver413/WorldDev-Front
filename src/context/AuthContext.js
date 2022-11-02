import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "../firebase";
import app from '../firebase'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { toast } from "react-toastify";

const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};

export default function AuthProvider({ children }) {
  const firestore = getFirestore(app);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email, password, rol, displayName, photoURL, favorites) => {
    const infoUser = await createUserWithEmailAndPassword(auth, email, password)
      .then((currentUser) => {
        console.log(currentUser.email);
        return currentUser;
      })
    const docuRefU = doc(firestore, `users/${infoUser.user.uid}`);
    setDoc(docuRefU, { email: email, rol: rol, displayName: displayName, photoURL: photoURL, favorites: favorites });
  };

  const login = async (email, password) => {
    const objeect = await signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    const infoGoo = await signInWithPopup(auth, googleProvider)
      .then((currentUser) => {
        return currentUser;
      })
    const docuRefU = doc(firestore, `users/${infoGoo.user.uid}`);
    setDoc(docuRefU, { email: infoGoo.user.email, rol: 'user' });
  };

  const logout = async () => await signOut(auth)

  const resetPassword = async (email) => sendPasswordResetEmail(auth, email);

  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log({ currentUser });
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubuscribe();
  }, []);

  return (
    <authContext.Provider value={{ signup, login, user, logout, loading, loginWithGoogle, resetPassword }}>
      {children}
    </authContext.Provider>
  );
}

//, confirmPassword, sendE, emailLink