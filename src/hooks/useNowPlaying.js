import { useEffect, useState } from "react"
import axios from "axios"
const token = import.meta.env.VITE_tmbdkey;

function useNowPlaying(){

    const [data, setData] = useState({})

    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
    }

    const fetchData = async () => {
      console.log("fetch data")
      axios
      .request(options)
      .then(res => setData(res))
      .catch(err => console.error(err))
    } 

    useEffect(()=>{
      fetchData()
      console.log("useEffect")
    }, [])
    console.log(data)
    return data
}

export default useNowPlaying