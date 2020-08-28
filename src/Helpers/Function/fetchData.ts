import FilmItem from '../../components/interface/FilmItem';

export default async (url: string): Promise<Array<FilmItem> | null> => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json.results;
  } catch (e) {
    return null;
  }
};
