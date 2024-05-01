import css from './MovieDetailsPage.module.css';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { getMovieId } from '../../movies-api';
import Loader from '../../components/Loader/Loader';

export default function MovieDetailsPage() {

  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const backLinkURLRef = useRef(location.state ?? '/');

  useEffect(() => {
    async function fetchMovieId() {
      try {
        setError(false);
        setLoading(true);
        const data = await getMovieId(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMovieId();
  }, [movieId]);

  return (
    <div >
        <Link to={backLinkURLRef.current} className={css.backLink}> Go back </Link>
        
        {loading && <Loader/>}
        {error && <p>Sorry, we have a little problem. Try again a few minutes.</p>}
        {movie && (
        <div className={css.movieCard}>
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                                  : 'https://i.ibb.co/7j51bv6/cat.jpg'}
            alt='main poster by movie'
            className={css.moviePoster}/>
          
            <div className={css.movieText}>
            <h2>{movie.original_title}</h2>
            <p>User score: {movie.vote_average * 10}%</p>
            
            <h2>Overview</h2>
            <p>{movie.overview}</p>

            <h2>Genres</h2>
            <ul>
              {movie.genres.map(genre => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
                      
          </div>
        </div>
        )}
          
    <hr />
          
      <p>Additional information</p>
    
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>

      <Suspense fallback={<Loader/>}>
        <Outlet />
      </Suspense>
    </div>
  );
}