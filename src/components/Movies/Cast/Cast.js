import { useParams } from 'react-router-dom';
import { FetchCreditsMovie } from 'components/service/FetchMovies';
import { useState, useEffect } from 'react';

export default function Cast() {
  const params = useParams();
  const [post, setPost] = useState({});
  const [err, setErr] = useState('');

  console.log(params);

  useEffect(() => {
    FetchCreditsMovie(params.movieId)
      .then(res => setPost(res))
      .catch(err => setErr(err.message));
  }, [params.movieId]);

  const { cast } = post;

  return (
    <>
      {cast?.length > 0 ? (
        <>
          <ul>
            {cast.splice(0, 10).map(({ character, name, profile_path, id }) => {
              return (
                <li key={id}>
                  <img
                    src={
                      profile_path
                        ? `https://image.tmdb.org/t/p/w500${profile_path}`
                        : 'https://upload.wikimedia.org/wikipedia/commons/b/ba/No_image_available_400_x_600.svg'
                    }
                    alt={name}
                    width="300"
                  />
                  <h3>{name}</h3>
                  <p>Character: {character}</p>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p>Актёры не найдены</p>
      )}
      {err ?? <p>Актёры не найдены {err}</p>}
    </>
  );
}
