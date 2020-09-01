import React, { useState, useEffect, lazy, Suspense } from 'react';
import shortid from 'shortid';
import { Tabs, Pagination, Spin } from 'antd';
import 'antd/dist/antd.css';
import { format, isValid } from 'date-fns';

import FilmItem from '../interface/FilmItem';
import SearchInput from '../Search';
import Error from '../Error';
import NotItems from '../NotItems';

import { fetchData } from '../../Helpers';
import Genres from '../context/Genres';
import ResponseGenres from '../interface/ResponseGenres';
import ResponseFilm from '../interface/ResponseFilm';
import ResponseGuestSession from '../interface/ResponseGuestSession';
import IGenre from '../interface/Genre';
import { URL_MOVIES, API_KEY } from '../../config';
import './index.css';

const { TabPane } = Tabs;

const navbar: Array<string> = ['Search', 'Rated'];
let List: any = lazy(() => import('../List'));

const App: React.FC = () => {
  const [error, setError] = useState<boolean>(false);
  const [activeTab, setTabs] = useState<string>('1');
  const [films, setFilms] = useState<Array<FilmItem>>([]);
  const [page, setPage] = useState<number>(1);
  const [sizePage, setSizePage] = useState<number>(10);
  const [currentValueSearch, setCurrentValueSearch] = useState<string>('return');
  const [genres, setGenres] = useState<Array<IGenre>>([]);
  const [sessionID, setSessionID] = useState<string>('');

  const createGuestSession = async (): Promise<void> => {
    const sessionResponse: ResponseGuestSession | null = await fetchData(
      `${URL_MOVIES}authentication/guest_session/new?api_key=${API_KEY}`
    );

    if (!sessionResponse) {
      setError(true);
      return;
    }

    const { success, guest_session_id }: ResponseGuestSession = sessionResponse;

    if (success) {
      try {
        localStorage.setItem('uuid_session', guest_session_id);
        setSessionID(guest_session_id);
      } catch (e) {
        setError(true);
      }
    }
  };

  const updateFilms = (response: Array<FilmItem>) => {
    setFilms(
      response.splice((page - 1) * sizePage, sizePage).reduce((acc: Array<FilmItem>, item: FilmItem): Array<
        FilmItem
      > => {
        const newItem = { id: shortid.generate(), ...item };
        if (!isValid(new Date(item.release_date))) newItem.release_date = '';
        else newItem.release_date = format(new Date(item.release_date), 'MMMM dd, yyyy');
        return [...acc, newItem];
      }, [])
    );
  };

  const loadData = async (value: string): Promise<void> => {
    const data: ResponseFilm | null = await fetchData(
      `${URL_MOVIES}search/movie?api_key=${API_KEY}&query=${value}&page=${page}`
    );

    const genresIds: ResponseGenres | null = await fetchData(`${URL_MOVIES}genre/movie/list?api_key=${API_KEY}`);

    if (data?.success === false) {
      setError(true);
      return;
    }

    if (genresIds) setGenres(genresIds.genres);

    if (data) {
      const { results } = data;
      updateFilms(results);
    } else setError(true);
  };

  const handleTabs = async (key: string) => {
    if (key !== activeTab) {
      setTabs(key);
      const response: ResponseFilm | null = await fetchData(
        `${URL_MOVIES}guest_session/${sessionID}/rated/movies?api_key=${API_KEY}&language=en-US&sort_by=created_at.asc`
      );
      switch (key) {
        case '1':
          loadData(currentValueSearch);
          break;
        case '2':
          if (response) {
            const { results } = response;
            updateFilms(results);
          }
          break;
      }
    }
  };

  useEffect(() => {
    loadData(currentValueSearch);
    createGuestSession();
  }, []);

  useEffect(() => {
    List = lazy(() => import('../List'));
  }, [films]);

  useEffect(() => {
    loadData(currentValueSearch);
  }, [page]);

  const searchData = (value: string): void => {
    loadData(value);
    setCurrentValueSearch(value);
  };

  if (error) {
    return <Error />;
  }

  const handleChangePagination = (newPage: number, pageSize: any) => {
    if (page !== newPage) setPage(newPage);
  };

  const handleChangeRate = (id: number, value: number) => {
    fetch(`${URL_MOVIES}movie/${id}/rating?api_key=${API_KEY}&guest_session_id=${sessionID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ value }),
    });
  };

  return (
    <div className="page">
      <div className="wrapper">
        <div className="navbar">
          <div className="navbar-wrapper">
            <Tabs defaultActiveKey={activeTab} centered onChange={handleTabs}>
              {navbar.map((item: string, index: number) => (
                <TabPane tab={item} key={index + 1} />
              ))}
            </Tabs>
            <SearchInput searchData={searchData} />
          </div>
        </div>
        {films.length === 0 ? (
          <NotItems message="No movies found" />
        ) : (
          <Suspense fallback={<Spin />}>
            <Genres.Provider value={genres}>
              <List items={films} handleChangeRate={handleChangeRate} />
            </Genres.Provider>
          </Suspense>
        )}
        <Pagination
          defaultCurrent={page}
          defaultPageSize={sizePage}
          onChange={handleChangePagination}
          size="small"
          total={50}
        />
      </div>
    </div>
  );
};

export default App;
