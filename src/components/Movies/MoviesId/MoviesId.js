import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FethInformationMovies } from 'components/service/FetchMovies';
import { constants } from 'helpers/constants';

const { home, cast, reviews } = constants;

export default function MoviesId() {
  const [post, setPost] = useState([]);
  const params = useParams();

  console.log(post);
  const { genres, title, vote_average, overview, poster_path } = post;

  useEffect(() => {
    FethInformationMovies(params.movieId)
      .then(res => setPost(res))
      .catch(err => console.log(err.message));
  }, [params.movieId]);

  const IMG_URL = 'https://image.tmdb.org/t/p';

  return (
    <>
      <Link to={home}>Go back</Link>
      <div>
        <img
          width="300"
          src={`${
            poster_path !== null
              ? IMG_URL + '/w500' + poster_path
              : 'https://upload.wikimedia.org/wikipedia/commons/b/ba/No_image_available_400_x_600.svg'
          }`}
          alt={`${title !== '' ? title : 'No info!'}`}
        />
        <h2>{title}</h2>
        <p>{`User score: ${vote_average * 10}%`}</p>
        <ul>
          <li>
            <h3>Overview</h3>
            <p>{overview}</p>
          </li>
          <li>
            <h3>Genres</h3>
            <ul>
              {genres?.map(({ id, name }) => (
                <li key={id}>{name}</li>
              ))}
            </ul>
          </li>
        </ul>
        <p>Additional information</p>
        <ul>
          <li>
            <Link to={cast}>Cast</Link>
          </li>
          <li>
            <Link to={reviews}>Reviews</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
