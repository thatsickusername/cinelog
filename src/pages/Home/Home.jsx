import { useEffect } from 'react';
import './Home.css'
import useNowPlaying from '../../hooks/useNowPlaying';

function Home() {

    const NowPlaying = useNowPlaying()
    return (
        <div>
            <div className='navbar'>
                <h1 className='logo'>CineLog</h1>
                <input className='searchbar' type='text'></input>
            </div>

            <div className='home-feed'>
                {NowPlaying && NowPlaying.data?.results.map(Movie => (
                    <div key={Movie.id} className='popular-feed'>
                        <div className='small-card'>
                            <p>{Movie.title}</p>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    );
}

export default Home;