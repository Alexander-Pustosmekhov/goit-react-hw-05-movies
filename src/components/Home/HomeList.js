import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FethPopularMovies } from 'components/service/FetchMovies';
import { constants } from 'helpers/constants';

const { movies } = constants;

export default function HomeList() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    FethPopularMovies()
      .then(res => setPost(res.results))
      .catch(err => console.log(err.message));
  }, []);

  return (
    <>
      <ul>
        {post.map(({ original_name, title, id }) => {
          return (
            <li key={id}>
              <Link to={`${movies}/${id}`}>{original_name ?? title}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
