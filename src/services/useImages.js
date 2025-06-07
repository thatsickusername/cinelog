import axios from "axios";
import { useEffect, useState } from "react";
const token = import.meta.env.VITE_tmdbKey

function useImages(type, id){
    const [data, setdata] = useState({})
    const [isLoading, setLoading] = useState(true)

    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/${type}/${id}/images`,
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
    };
      
    const fetchData = async ()=>{
        axios
        .request(options)
        .then(res => setdata(res.data))
        .catch(err => console.error(err))
        .finally(setLoading(false))
    }
      
    useEffect(()=>{
        fetchData()
    },[])

    return {data, isLoading};
}

export default useImages