import React from 'react';

import ListItem from '../ListItem';
import FilmItem from '../interface/FilmItem';
import './index.css';

export default ({ items, handleChangeRate }: any) => (
  <div className="list wrapper__list">
    {items.map(({ id, original_title, release_date, vote_average, overview, genre_ids }: FilmItem) => (
      <ListItem
        key={id}
        id={id}
        data={{
          original_title,
          release_date,
          vote_average,
          overview,
          genre_ids,
        }}
        handleChangeRate={handleChangeRate}
      />
    ))}
  </div>
);
