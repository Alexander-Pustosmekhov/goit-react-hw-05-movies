import Navigation from './Navigation/Navigation';
import { Routes, Route } from 'react-router-dom';
import { constants } from 'helpers/constants';
import Home from './Home/Home';
import Movies from './Movies/Movies';
import MoviesId from './Movies/MoviesId/MoviesId';
import Cast from './Movies/Cast/Cast';

const { home, movies, movieId, cast, reviews } = constants;

export const App = () => {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path={home} element={<Home />}></Route>
        <Route path={movies} element={<Movies />} />
        <Route path={`${movies}/${movieId}`} element={<MoviesId />}>
          <Route path={cast} element={<Cast />} />
          <Route path={reviews} />
        </Route>
      </Routes>
    </div>
  );
};
