import { useState } from 'react';
import { FetchMovieByName } from 'components/service/FetchMovies';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { constants } from 'helpers/constants';

const { movies, movieId } = constants;

export default function Movies() {
  const [name, setName] = useState('');
  const [search, setSearch] = useState([]);
  const [err, setErr] = useState('');
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const productName = searchParams.get('name') ?? '';

  function onChange(e) {
    setName(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    if (name.trim() === '') {
      return;
    }
    FetchMovieByName(name)
      .then(result => setSearch(result))
      .catch(error => setErr(error.message));
    const nextParams = name !== '' ? { name } : {};
    setSearchParams(nextParams);
    setName('');
  }

  const { results, total_results } = search;

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" name="name" value={name} onChange={onChange} />
        <button type="submit">Search</button>
      </form>
      {results ? (
        <ul>
          {results.map(({ id, original_title }) => {
            return (
              <li key={id}>
                <Link to={`${movies}/${movieId}`}>{original_title}</Link>
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
