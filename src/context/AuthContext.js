import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, sendSignInLinkToEmail } from "firebase/auth";
import { auth, actionCodeSettings } from "../firebase";


const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

 const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (email, password) => {
    const objeect = await signInWithEmailAndPassword(auth, email, password);
    console.log(objeect)
  };

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const logout = async () => await signOut(auth)

  const resetPassword = async (email) => sendPasswordResetEmail(auth, email);

  const sendE = async (email) => sendSignInLinkToEmail(auth, email, actionCodeSettings)
.then(() => {
  window.localStorage.setItem('emailForSignIn', email);
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
});
 

  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log({ currentUser });
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubuscribe();
  }, []);

  return (
    <authContext.Provider value={{ signup, login, user, logout, loading, loginWithGoogle, resetPassword, sendE}}>
      {children}
    </authContext.Provider>
  );
}