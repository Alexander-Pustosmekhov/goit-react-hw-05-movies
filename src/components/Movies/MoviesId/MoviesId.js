import { useState, useEffect } from 'react';
import {
  useParams,
  Link,
  Outlet,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { FethInformationMovies } from 'components/service/FetchMovies';
import { constants } from 'helpers/constants';
import s from './MoviesId.module.css';

const { cast, reviews, movies } = constants;

export default function MoviesId() {
  const [post, setPost] = useState([]);
  const params = useParams();
  const IMG_URL = 'https://image.tmdb.org/t/p';
  const navigate = useNavigate();
  const location = useLocation();

  console.log(post);
  const { genres, title, vote_average, overview, poster_path } = post;

  useEffect(() => {
    FethInformationMovies(params.movieId)
      .then(res => setPost(res))
      .catch(err => console.log(err.message));
  }, [params.movieId]);

  const handleClick = () => {
    navigate(location.state.from, { replace: false });
  };

  return (
    <>
      <button className={s.button} type="button" onClick={handleClick}>
        Go back
      </button>
      <div className={s.movieId}>
        <img
          width="300"
          src={`${
            poster_path
              ? IMG_URL + '/w500' + poster_path
              : 'https://upload.wikimedia.org/wikipedia/commons/b/ba/No_image_available_400_x_600.svg'
          }`}
          alt={`${title !== '' ? title : 'No info!'}`}
        />
        <h2>{title}</h2>
        <p>{`User score: ${vote_average * 10}%`}</p>
        <ul className={s.list}>
          <li>
            <h3 className={s.itemTitle}>Overview</h3>
            <p>{overview}</p>
          </li>
          <li>
            <h3 className={s.itemTitle}>Genres</h3>
            <ul>
              {genres?.map(({ id, name }) => (
                <li key={id}>{name}</li>
              ))}
            </ul>
          </li>
        </ul>
        <p>Additional information</p>
        <ul className={s.listLink}>
          <li>
            <Link
              className={s.link}
              to={cast}
              state={{ movies, from: location.state.from }}
            >
              Cast
            </Link>
          </li>
          <li>
            <Link
              className={s.link}
              to={reviews}
              state={{ movies, from: location.state.from }}
            >
              Reviews
            </Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </>
  );
}
