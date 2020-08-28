import React, { useState, useEffect, lazy, Suspense } from 'react';
import shortid from 'shortid';
import { Tabs, Pagination, Spin, Alert } from 'antd';
import 'antd/dist/antd.css';
import { format, isValid } from 'date-fns';

import { fetchData } from '../../Helpers';
import FilmItem from '../interface/FilmItem';
import SearchInput from '../Search';
import './index.css';

const { TabPane } = Tabs;

const navbar: Array<string> = ['Search', 'Rated'];
let List: any = lazy(() => import('../List'));
const App: React.FC = () => {
  const [error, setError] = useState<boolean>(false);
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
        data.slice(0, 20).reduce((acc: Array<FilmItem>, item: FilmItem): Array<FilmItem> => {
          const newItem = { id: shortid.generate(), ...item };
          if (!isValid(new Date(item.release_date))) {
            newItem.release_date = '';
          } else {
            newItem.release_date = format(new Date(item.release_date), 'MMMM dd, yyyy');
          }
          return [...acc, newItem];
        }, [])
      );
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    loadData('return');
  }, []);

  useEffect(() => {
    List = lazy(() => import('../List'));
  }, [films]);

  const searchData = (value: string): void => {
    loadData(value);
  };

  if (error) {
    return (
      <Alert
        message="Error Text"
        description="Error Description Error Description Error Description Error Description Error Description Error Description"
        type="error"
        closable
      />
    );
  }

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
        <Suspense fallback={<Spin />}>
          <List items={films} />
        </Suspense>
        <Pagination size="small" total={50} />
      </div>
    </div>
  );
};

export default App;
