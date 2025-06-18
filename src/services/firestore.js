import {db} from "./firebase"
import { collection, setDoc, doc, getDoc, deleteDoc, serverTimestamp, getDocs, query, where } from 'firebase/firestore'

export const useFirestore = ()=>{

    // USER COLLECTION
    
    const checkIfInWatchList = async (userId, dataId) =>{
        const docRef = doc(db, "users", userId?.toString(), "watchlist", dataId?.toString())
        const docSnap = await getDoc(docRef)
    
        if(docSnap.exists()) return true
        else return false
    }

    const addToWatchlist = async (userId, dataId, data) =>{
        try{
            if (await checkIfInWatchList(userId, dataId)){
                console.log("Item already in Watchlist")
                return false
            }
            await setDoc(doc(db,"users", userId?.toString(), "watchlist", dataId?.toString()), data)
            console.log("Document written")
        }catch(error){
            console.log(error, 'Error adding document')
        }
    }

    const removeFromWatchlist = async (userId, dataId) =>{
        try{
            await deleteDoc(doc(db, "users", userId?.toString(), "watchlist", dataId?.toString()))
            console.log("removed from watchlist")
        }catch(error){
            console.log(error, 'Error removing document')
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



    // REVIEW COLLECTION

    const getReviewDocId = (movieId, userId) => `${movieId}_${userId}`

    const checkIfAlreadyReviewed = async (movieId, userId) =>{
        const docId = getReviewDocId(movieId, userId);
        const docRef = doc(db, "reviews", docId)
        const docSnap = await getDoc(docRef)
        return docSnap.exists()
    }


    const addReviewToMovie = async (movieId, userId, data) =>{
        try{

            const docId = getReviewDocId(movieId, userId)

            if (await checkIfAlreadyReviewed(movieId, userId)){
            console.log("Movie already Reviewed")
            return false
        }

        const reviewData = {
            ...data,
            movieId,
            userId,
            createdAt: serverTimestamp(),
          };

       await setDoc(doc(db, "reviews", docId), reviewData)
        console.log("Review added")
        return true
    }catch(error){
        console.log(error, 'Error adding Review')
        return false
        }
    }

    const getMovieReviews = async(movieId) => {
        try{
            const reviewsRef = collection(db, "reviews")
            const q = query(reviewsRef, where("movieId", "==", movieId))
            const snap = await getDocs(q);

            const reviewList = snap.docs.map(doc =>({
                id: doc.id,
                ...doc.data()
            }))
            return reviewList;
        }catch(error){
            console.log("Error getting movie reviews", error);
            return[]
        }
    }

    const getUserReviews = async(userId) =>{
        try {
            const reviewRef = collection(db, "reviews")
            const q = query(reviewRef, where("userId", "==", userId))
            const snap = await getDocs(q)

            const reviewList = snap.docs.map((doc)=>({
                id: doc.id,
                ...doc.data(),
            }))

            return reviewList
        } catch (error) {
            console.log("Error getting user reviews", error);
            return[]
        }
    }

    return {
        addToWatchlist, checkIfInWatchList, removeFromWatchlist, checkIfInUser, getUserProfile, getUserWatchlist, checkIfAlreadyReviewed, addReviewToMovie, getMovieReviews, getUserReviews
    }
}
