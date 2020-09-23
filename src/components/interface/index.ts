export interface FilmItem {
  id?: string;
  original_title: string;
  release_date: string;
  vote_average: number;
  overview: string;
  genre_ids: Array<number>;
  poster_path: string;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface NotItems {
  message: string;
}

export interface ResponseFilm {
  page: number;
  results: Array<FilmItem>;
  total_results: number;
  total_pages: number;
  success?: boolean;
}

export interface ResponseGenres {
  genres: Array<IGenre>;
}

export interface ResponseGuestSession {
  success: boolean;
  guest_session_id: string;
  expires_at: string;
}

export interface SearchDataType {
  searchData: (value: string) => void;
}
