import { Link, useLocation } from 'react-router-dom';
import css from './MoviesList.module.css';

export default function MoviesList({ data }) {
    const location = useLocation();

    return (
    <ul className={css.list}>
      {data.map(movie => (
        <li key={movie.id} className={css.listItem}>
          <Link to={`/movies/${movie.id}`} state={location}>
           <p>* {movie.title} </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}