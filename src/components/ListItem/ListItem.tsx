import React from 'react';
import { Tag, Rate } from 'antd';

import { strSliceMaxLen } from '../../Helpers';
import './index.css';

export default ({ data: { original_title, release_date, vote_average, overview } }: any) => (
  <div className="list-item">
    <img src={`${process.env.PUBLIC_URL}/img/img.jpg`} alt="The way back" className="poster list-item__poster" />
    <div className="list-item__container">
      <div className="list-item__meta">
        <h5 className="list-item__header">{original_title}</h5>
        <time className="list-item__date">{release_date}</time>
        <div className="list-genre list-item__list-genre">
          <Tag>Action</Tag>
          <Tag>Drama</Tag>
        </div>
        <div className="rating">{vote_average}</div>
      </div>
      <p className="list-item__description">{strSliceMaxLen(overview, 120)}</p>
      <Rate count={10} allowHalf defaultValue={vote_average} />
    </div>
  </div>
);
