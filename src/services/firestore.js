import {db} from "./firebase"
import { collection, addDoc, setDoc, doc, getDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'

export const useFirestore = ()=>{
    
    const addToWatchlist = async (userId, dataId, data) =>{
        try{
            if (await checkIfInWatchList(userId, dataId, data)){
                console.log("Item already in Watchlist")
                return false
            }
            await setDoc(doc(db,"users", userId, "watchlist", dataId), data)
            console.log("Document written")
        }catch{
            console.log(error, 'Error adding doccument')
        }
    }

    const removeFromWatchlist = async (userId, dataId) =>{
        try{
            await deleteDoc(doc(db, "users", userId?.toString(), "watchlist", dataId?.toString()))
            console.log("removed from watchlist")
        }catch{
            console.log(error, 'Error adding doccument')
        }
    }

    const checkIfInUser = async({uid, displayName, email, photoURL}) =>{
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);

        if(!userSnap.exists()){
            await setDoc(userRef, {
                uid,
                displayName,
                email,
                photoURL: photoURL || null,
                createdAt: serverTimestamp(),
                lastLogin: serverTimestamp(),
            })
        }else{
            await setDoc(userRef,{ lastLogin: serverTimestamp()}, {merge: true})
        }
    }

    const getUserProfile = async(uid) => {
        try{
            const userRef = doc(db, "users", uid?.toString())
            const snap = await getDoc(userRef);
            if(snap.exists()){
                return snap.data()
            }else return null
        }catch(error){
            console.log(error)
        }
    }

    const checkIfInWatchList = async (userId, dataId) =>{
        const docRef = doc(db, "users", userId?.toString(), "watchlist", dataId?.toString())
        const docSnap = await getDoc(docRef)
    
        if(docSnap.exists()) return true
        else return false
    }

    return {
        addToWatchlist, checkIfInWatchList, removeFromWatchlist, checkIfInUser, getUserProfile
    }
}

