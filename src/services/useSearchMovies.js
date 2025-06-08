import axios from "axios";
import { useEffect, useState } from "react";
const token = import.meta.env.VITE_tmdbKey;

function useSearchMovies(search_query){
    const [data, setData] = useState({})
    const [isLoading, setLoading] = useState(true)

    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/search/movie?query=${search_query}&include_adult=false&language=en-US&page=1`,
        headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`
        }
    };
    
    const fetchData = async () =>{
        axios
        .request(options)
        .then(res => setData(res.data))
        .catch(err => console.error(err))
        .finally(setLoading(false))
    }

    useEffect(()=>{
        fetchData()
    },[search_query])
    
    return {data, isLoading}
}

export default useSearchMovies;