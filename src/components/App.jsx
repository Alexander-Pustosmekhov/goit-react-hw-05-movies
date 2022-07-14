import { lazy, Suspense } from 'react';
import Navigation from './Navigation/Navigation';
import { Routes, Route } from 'react-router-dom';
import { constants } from 'helpers/constants';
import Home from './Home/Home';

const Movies = lazy(() =>
  import('./Movies/Movies' /* webpackChunkName: "Movies" */)
);
const MoviesId = lazy(() =>
  import('./Movies/MoviesId/MoviesId' /* webpackChunkName: "MoviesId" */)
);
const Cast = lazy(() =>
  import('./Movies/Cast/Cast' /* webpackChunkName: "Cast" */)
);
const Reviews = lazy(() =>
  import('./Movies/Reviews/Reviews' /* webpackChunkName: "Reviews" */)
);

const { home, movies, movieId, cast, reviews } = constants;

export const App = () => {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path={home} element={<Home />}></Route>
        <Route
          path={movies}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Movies />
            </Suspense>
          }
        />
        <Route
          path={`${movies}/${movieId}`}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <MoviesId />
            </Suspense>
          }
        >
          <Route
            path={cast}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Cast />
              </Suspense>
            }
          />
          <Route
            path={reviews}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Reviews />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};
