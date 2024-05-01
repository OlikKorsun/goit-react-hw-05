import css from './HomePage.module.css';
import { useEffect, useState } from 'react';
import MoviesList from '../../components/MoviesList/MoviesList';
import { getTrendingMovies } from '../../movies-api';
import Loader from '../../components/Loader/Loader';

export default function HomePage() {
    
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchMovies(){
            try {
                setLoading(true);
                const data = await getTrendingMovies();
                setMovies(data);
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        fetchMovies()
    }, [])

    return(
        <>
        <h2 className={css.trending}>Trending today</h2>
        {loading && <Loader/>}
        {error && <p>Sorry, we have a little problem. Try again a few minutes.</p>}
        {movies.length > 0 && <MoviesList data={movies}/>}
        </>
    )
}