import React, { useState, useEffect } from 'react';
import shortid from 'shortid';
import { Tabs, Pagination } from 'antd';
import 'antd/dist/antd.css';
import { format } from 'date-fns';

import { fetchData } from '../../Helpers';
import FilmItem from '../interface/FilmItem';
import List from '../List';
import SearchInput from '../Search';
import './index.css';

const { TabPane } = Tabs;

const navbar: Array<string> = ['Search', 'Rated'];

const App: React.FC = () => {
  const [activeTab, setTabs] = useState<string>('1');
  const [films, setFilms] = useState<Array<FilmItem>>([]);

  const handleTabs = (key: string) => {
    console.log(key);
  };

  const loadData = async (value: string): Promise<void> => {
    const data: Array<FilmItem> | null = await fetchData(
      `https://api.themoviedb.org/3/search/movie?api_key=e9f559802c673e3e74a73543bc0c8382&query=${value}`
    );
    if (data) {
      setFilms(
        data.reduce(
          (acc: Array<FilmItem>, item: FilmItem): Array<FilmItem> => [
            ...acc,
            {
              id: shortid.generate(),
              ...item,
              release_date: format(new Date(item.release_date), 'MMMM dd, yyyy'),
            },
          ],
          []
        )
      );
    }
  };

  useEffect(() => {
    loadData('return');
  }, []);

  const searchData = (value: string): void => {
    loadData(value);
  };

  return (
    <div className="page">
      <div className="wrapper">
        <div className="navbar">
          <div className="navbar-wrapper">
            <Tabs defaultActiveKey={activeTab} centered onChange={handleTabs}>
              {navbar.map((item: string, index: number) => (
                <TabPane tab={item} key={shortid.generate()} />
              ))}
            </Tabs>
            <SearchInput searchData={searchData} />
          </div>
        </div>
        <List items={films} />
        <Pagination size="small" total={50} />
      </div>
    </div>
  );
};

export default App;
