import React, { useState } from 'react';

import { debounce } from '../../Helpers';
import SearchDataType from '../interface/SearchDataType';
import './index.css';

export default ({ searchData }: SearchDataType): JSX.Element => {
  const [value, setValue] = useState<string>('');
  const debounceFn: Function = debounce(searchData, 700);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const target = evt.target as HTMLInputElement;
    setValue(target.value);
    debounceFn(target.value);
  };

  return (
    <input
      type="search"
      className="search-input navbar__search-input"
      placeholder="Type to search..."
      value={value}
      onChange={handleChange}
    />
  );
};
