import { useEffect, useState } from 'react';
import MoviesSearchBar from '../../components/MoviesSearchBar/MoviesSearchBar';
import { getSearchMovies } from '../../movies-api';
import MoviesList from '../../components/MoviesList/MoviesList';
import { useSearchParams } from "react-router-dom";
import Loader from '../../components/Loader/Loader';

export default function MoviesPage() {

    const [movies, setMovies] = useState([])
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('')
    const [searchParams, setSearchParams] = useSearchParams();
    const movieParam = searchParams.get("query") ?? ""

    useEffect(() => {
        async function fetchNewMovie(){
            try {
                setError(false);
                setLoading(true);
                const data = await getSearchMovies(movieParam)
                setMovies(data);
            } catch (error) {
              setError(true)  
            } finally {
                setLoading(false)
            }
        }
        fetchNewMovie()
    }, [movieParam, query])

    const handleSearchMovies = newMovie => {
        searchParams.set("query", newMovie);
        setSearchParams(searchParams);
        setQuery(newMovie);
    }
  
    return (
        <div>
            <MoviesSearchBar onSearch={handleSearchMovies}/>
            {loading && <Loader/>}
            {error && <p>Sorry, we have a little problem. Try again a few minutes.</p>}
            {movies.length > 0 && <MoviesList data={movies}/>}
        </div>
    )
}