import axios from 'axios';

const KEY = '0d49139fc61c9163c90d73e6278961b6';
const BASE_URL = 'https://api.themoviedb.org/3/';

export async function FethPopularMovies() {
  const popularFilms = await axios.get(
    `${BASE_URL}trending/all/day?api_key=${KEY}&language=en-US&page=1`
  );

  return popularFilms.data;
}

export async function FethInformationMovies(id) {
  const popularFilms = await axios.get(
    `${BASE_URL}movie/${id}?api_key=${KEY}&language=en-US`
  );

  return popularFilms.data;
}

export async function FetchCreditsMovie(id) {
  const popularFilms = await axios.get(
    `${BASE_URL}movie/${id}/credits?api_key=${KEY}&language=en-US&page=1`
  );

  return popularFilms.data;
}

export async function FetchReviewsMovie(id) {
  const popularFilms = await axios.get(
    `${BASE_URL}movie/${id}/reviews?api_key=${KEY}&language=en-US&page=1`
  );

  return popularFilms.data;
}

export async function FetchMovieByName(name) {
  const popularFilms = await axios.get(
    `${BASE_URL}search/movie?api_key=${KEY}&query=${name}&page=1&include_adult=false`
  );

  return popularFilms.data;
}
