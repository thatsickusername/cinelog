import axios from "axios";
import { useEffect, useState } from "react";
const token = import.meta.env.VITE_tmdbKey

function useDetails(type, id){
    const [data, setdata] = useState({})

    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/${type}/${id}?language=en-US`,
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
    };
      
    const fetchData = async ()=>{
        axios
        .request(options)
        .then(res => setdata(res.data))
        .catch(err => console.error(err));
    }
      
    useEffect(()=>{
        fetchData()
    },[])

    return data;
}

export default useDetails