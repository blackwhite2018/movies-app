import React, { useContext } from 'react';
import { Tag, Rate } from 'antd';

import Genres from '../context/Genres';
import IGenre from '../interface/Genre';
import { strSliceMaxLen } from '../../Helpers';
import './index.css';

const ratingColor = (rating: number): string => {
  if (rating >= 0 && rating < 3) return ' rating-color-1';
  if (rating >= 3 && rating < 5) return ' rating-color-2';
  if (rating >= 5 && rating < 7) return ' rating-color-3';
  if (rating >= 7) return ' rating-color-4';
  return '';
};

export default ({
  id,
  data: { original_title, release_date, vote_average, overview, genre_ids },
  handleChangeRate,
}: any) => {
  const genres: Array<IGenre> = useContext<Array<IGenre>>(Genres);

  const classNameAverage = `rating${ratingColor(vote_average)}`;

  const handleChange = (value: number) => {
    handleChangeRate(id, value);
  };

  return (
    <div className="list-item">
      <img src={`${process.env.PUBLIC_URL}/img/img.jpg`} alt="The way back" className="poster list-item__poster" />
      <div className="list-item__container">
        <div className="list-item__meta">
          <h5 className="list-item__header">{original_title}</h5>
          <time className="list-item__date">{release_date}</time>
          <div className="list-genre list-item__list-genre">
            {genre_ids.map((genre_id: number) => genres[genre_id] && <Tag key={genre_id}>{genres[genre_id].name}</Tag>)}
          </div>
          <div className={classNameAverage}>{vote_average}</div>
        </div>
        <p className="list-item__description">{strSliceMaxLen(overview, 120)}</p>
        <Rate onChange={handleChange} count={10} allowHalf defaultValue={vote_average} />
      </div>
    </div>
  );
};
