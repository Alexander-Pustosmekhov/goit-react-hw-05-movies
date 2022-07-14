import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FethPopularMovies } from 'components/service/FetchMovies';
import { constants } from 'helpers/constants';
import s from './HomeList.module.css';

const { movies, home } = constants;

export default function HomeList() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    FethPopularMovies()
      .then(res => setPost(res.results))
      .catch(err => console.log(err.message));
  }, []);

  return (
    <>
      <ul className={s.list}>
        {post.map(({ original_name, title, id }) => {
          return (
            <li key={id}>
              <Link
                className={s.link}
                to={`${movies}/${id}`}
                state={{ home, from: home }}
              >
                {original_name ?? title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
