interface FilmItem {
  id?: string;
  original_title: string;
  release_date: string;
  vote_average: number;
  overview: string;
  genre_ids: Array<number>;
}

export default FilmItem;
