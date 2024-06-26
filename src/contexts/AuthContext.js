import React, { useContext, useEffect, useState } from 'react';
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  const value = {
    currentUser,
    signUp,
    login
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false)
    });
  }, []);

  return <AuthContext.Provider value={value}>
    {!loading && children}
  </AuthContext.Provider>
}
