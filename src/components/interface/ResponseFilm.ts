import FilmItem from './FilmItem';

interface ResponseFilm {
  page: number;
  results: Array<FilmItem>;
  total_results: number;
  total_pages: number;
  success?: boolean;
}

export default ResponseFilm;
