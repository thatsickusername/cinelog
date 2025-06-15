import { createContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import PropTypes from "prop-types";
import { useFirestore } from "../services/firestore";


export const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const {checkIfInUser} = useFirestore() 

    function signInWithGoogle(){
        const provider = new GoogleAuthProvider()
        return signInWithPopup(auth, provider)
    }

    function logout(){
        return signOut(auth)
    }

    useEffect(()=>{
        const userSetup = onAuthStateChanged (auth, async (currentUser)=>{
            if(currentUser){
                setUser(currentUser)

                await checkIfInUser({
                    uid: currentUser.uid,
                    displayName: currentUser.displayName,
                    email: currentUser.email,
                    photoURL: currentUser.photoURL,
                })
            }else{
                setUser(null)
            }
            setIsLoading(false)
        })

        return ()=> userSetup()
    },[checkIfInUser])

    return <AuthContext.Provider value={{user, isLoading, signInWithGoogle, logout}}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}
