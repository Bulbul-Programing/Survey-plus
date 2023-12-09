import { createUserWithEmailAndPassword,updateProfile , onAuthStateChanged, signInWithEmailAndPassword, signOut, signInWithPopup } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../../Firebase_info';
import { GoogleAuthProvider } from "firebase/auth";
import useAxiosPublic from '../../Hooks/useAxiosPublic';

export const AuthContext = createContext()
const AuthProvider = ({children}) => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic()
    // register email and password
    const signUp = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // login with email password
    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const userUpdateProfile = (name, image)=>{
      return updateProfile(auth.currentUser, {
            displayName : name, photoURL: image
        })
    }

    const logOut = () => {
        return signOut(auth)
    }

    // google login
    const provider = new GoogleAuthProvider();
    const googleLogin = ()=>{
        return signInWithPopup(auth, provider)
    }

    useEffect(()=>{
       const unSubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser)

            if(currentUser){
                const userInfo = {email : currentUser.email}
                axiosPublic.post('/jwt', userInfo)
                .then(res => {
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token)
                    }
                })
            }
            else{
                localStorage.removeItem('access-token')
            }


            setLoading(false)
        return ()=>{
            unSubscribe()
        }
       })
    },[])


    const authInfo = {
        signUp,
        login,
        user,
        userUpdateProfile,
        loading,
        logOut,
        googleLogin,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;