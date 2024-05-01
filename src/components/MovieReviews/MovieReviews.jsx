import css from './MovieReviews.module.css';
import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import { getMovieReviews } from "../../movies-api";
import Loader from '../Loader/Loader';
import { nanoid } from "nanoid";

export default function MovieReviews() {

    const { movieId } = useParams();
    const [reviews, setReviews] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchMovieReviews(){
            try {
                setLoading(true);
                const data = await getMovieReviews(movieId);
                setReviews(data);
                console.log(data);
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        fetchMovieReviews()
    }, [movieId])

    return (
        <div>
        {loading && <Loader />}
        {error && <p>Sorry, we have a little problem. Try again a few minutes.</p>}
        {reviews && reviews.length > 0 ?
                (<ul className={css.reviewsList}>
                {reviews.map(review => (
                <li key={nanoid()}>
                <h3>Author: {review.author}</h3>
                <p>{review.content}</p>
            </li>
        ))}    
    </ul>) : 'We don`t have any reviews for tis movie'}
  </div>
  )
}