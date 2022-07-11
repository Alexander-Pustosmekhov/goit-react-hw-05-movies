import axios from 'axios';

const KEY = '0d49139fc61c9163c90d73e6278961b6';
const BASE_URL = 'https://api.themoviedb.org/3/movie/';

export async function FethPopularMovies() {
  const popularFilms = await axios.get(
    `${BASE_URL}popular?api_key=${KEY}&language=en-US&page=`
  );

  return popularFilms.data;
}

export async function FethInformationMovies(id) {
  const popularFilms = await axios.get(
    `${BASE_URL}${id}?api_key=${KEY}&language=en-US`
  );

  return popularFilms.data;
}
