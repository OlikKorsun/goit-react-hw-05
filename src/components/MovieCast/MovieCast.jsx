import css from './MovieCast.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast } from '../../movies-api';
import Loader from '../Loader/Loader';

export default function MovieCast() {

  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMovieCast() {
      try {
        setLoading(true);
        const data = await getMovieCast(movieId);
        setCast(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false)
        }  
    }
    fetchMovieCast();
  }, [movieId]);
        
  return (
      <div>
        {loading && <Loader />}
        {error && <p>Sorry, we have a little problem. Try again a few minutes.</p>}
          {cast && cast.length > 0 ?
              (<ul className={css.actorList}>
                  {cast.map(actor => (
                  <li key={actor.id}>
                    <img src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                                              : 'https://i.ibb.co/yFgg4Vz/cat1.jpg' }
                        alt="actor photo" />
                        <p>{actor.name}</p>
                        <p>Character: {actor.character}</p>
                    </li>
                    ))}
              </ul>) : (<p>We did not find information about the actors.</p>)
          }
    </div>
  );
}