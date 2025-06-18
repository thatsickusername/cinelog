import { useEffect, useState } from "react"
import axios from "axios"
const token = import.meta.env.VITE_tmdbKey;

function useTopRatedMovies(){
    const [data, setData] = useState({})
    const [isLoading, setLoading] = useState(true)

    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
    }

    const fetchData = async () => {
      axios
      .request(options)
      .then(res => setData(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
    } 

    useEffect(()=>{
      fetchData()
    }, [])

    return { data, isLoading }
}

export default useTopRatedMovies