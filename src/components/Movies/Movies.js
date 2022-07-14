import { useState, useEffect } from 'react';
import { FetchMovieByName } from 'components/service/FetchMovies';
import { Link, useSearchParams } from 'react-router-dom';
import { constants } from 'helpers/constants';
import s from './Movies.module.css';

const { movies } = constants;

export default function Movies() {
  const [name, setName] = useState('');
  const [searchFilm, setSearchFilm] = useState({});
  const [err, setErr] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');

  function onChange({ target: { value } }) {
    setName(value.trim());
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSearchParams({ query: name });
  }

  useEffect(() => {
    if (query === null) {
      return;
    }

    FetchMovieByName(query)
      .then(result => setSearchFilm(result))
      .catch(error => setErr(error.message));
  }, [query]);

  const { results, total_results } = searchFilm;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          className={s.input}
          type="text"
          name="name"
          value={name}
          onChange={onChange}
        />
        <button className={s.button} type="submit">
          Search
        </button>
      </form>
      {results ? (
        <ul className={s.list}>
          {results.map(({ id, original_title }) => {
            return (
              <li key={id}>
                <Link
                  className={s.link}
                  to={`${movies}/${id}`}
                  state={{ movies, from: `/movies?query=${query}` }}
                >
                  {original_title}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
      {total_results === 0 ? <p>Введите правильное название</p> : null}
      {err ? <p>Films not found {err}</p> : null}
    </>
  );
}
