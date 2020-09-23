import React from 'react';

import { FilmItem } from '../interface';
import ListItem from '../ListItem';
import './index.css';

export default ({ activeTab, items, handleChangeRate }: any) => (
  <div className="list wrapper__list">
    {items.map(({ id, original_title, release_date, vote_average, overview, genre_ids, poster_path }: FilmItem) => (
      <ListItem
        key={id}
        id={id}
        activeTab={activeTab}
        data={{
          original_title,
          release_date,
          vote_average,
          overview,
          genre_ids,
          poster_path,
        }}
        handleChangeRate={handleChangeRate}
      />
    ))}
  </div>
);
