import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FetchReviewsMovie } from 'components/service/FetchMovies';
import s from './Reviews.module.css';

export default function Reviews() {
  const params = useParams();
  const [post, setPost] = useState({});
  const [err, setErr] = useState('');

  console.log(params);

  useEffect(() => {
    FetchReviewsMovie(params.movieId)
      .then(res => setPost(res))
      .catch(err => setErr(err.message));
  }, [params.movieId]);

  const { results, total_results } = post;
  console.log(results);

  return (
    <>
      {total_results > 0 ? (
        <>
          <ul className={s.list}>
            {results.map(({ author, content, id }) => {
              return (
                <li key={id}>
                  <h3>Author: {author}</h3>
                  <p>{content}</p>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p>Комментарии не найдены</p>
      )}
      {err ?? <p>Комментарии не найдены {err}</p>}
    </>
  );
}
