import axios from 'axios';
import { useEffect, useState } from 'react';
const token = import.meta.env.VITE_tmdbKey

function useCredits (id) {
    const [data, setdata] = useState({})
    const [isLoading, setLoading] = useState(true)

    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    };

    const fetchData = async () =>{
        axios
        .request(options)
        .then(res => setdata(res.data))
        .catch(err => console.error(err))
        .finally(setLoading(false))
    }

    useEffect(()=>{
        fetchData()
    },[])
    
    return {data, isLoading}
}

export default useCredits