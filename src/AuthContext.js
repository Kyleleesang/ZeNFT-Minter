import React, { useContext, useState, useEffect } from "react"
import fire from './fire';
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword,sendPasswordResetEmail,signOut,onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return fire.auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return fire.auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return fire.auth.signOut()
  }

  function resetPassword(email) {
    return fire.auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = fire.auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}