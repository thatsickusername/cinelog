import {db} from "./firebase"
import { collection, addDoc, setDoc, doc, getDoc, deleteDoc, serverTimestamp, getDocs } from 'firebase/firestore'

export const useFirestore = ()=>{
    
    const checkIfInWatchList = async (userId, dataId) =>{
        const docRef = doc(db, "users", userId?.toString(), "watchlist", dataId?.toString())
        const docSnap = await getDoc(docRef)
    
        if(docSnap.exists()) return true
        else return false
    }

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

    const getUserWatchlist = async(uid) => {
        try{
            const watchlistRef = collection(db, "users", uid?.toString(), "watchlist")
            const snap = await getDocs(watchlistRef);

            const watchlist = snap.docs.map(doc =>({
                id: doc.id,
                ...doc.data()
            }))
            return watchlist;
        }catch(error){
            console.log(error)
        }
    }

    const checkIfAlreadyReviewed = async (movieId, userId) =>{
        const docRef = doc(db, "movies", movieId?.toString(), "reviews", userId?.toString())
        const docSnap = await getDoc(docRef)
        if(docSnap.exists()) return true
        else return false
    }


    const addReviewToMovie = async (movieId, userId, data) =>{
        try{
            if (await checkIfAlreadyReviewed(movieId, userId)){
                console.log("Movie already Reviewed")
                return false
            }
            await setDoc(doc(db,"movies", movieId, "reviews", userId), data)
            console.log("Document written")
        }catch{
            console.log(error, 'Error adding doccument')
        }
    }

    const getMovieReviews = async(movieId) => {
        try{
            const reviewsRef = collection(db, "movies", movieId, "reviews")
            const snap = await getDocs(reviewsRef);

            const reviewList = snap.docs.map(doc =>({
                id: doc.id,
                ...doc.data()
            }))
            return reviewList;
        }catch(error){
            console.log(error)
        }
    }

    return {
        addToWatchlist, checkIfInWatchList, removeFromWatchlist, checkIfInUser, getUserProfile, getUserWatchlist, checkIfAlreadyReviewed, addReviewToMovie, getMovieReviews
    }
}

