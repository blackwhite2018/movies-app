import { createContext } from 'react';
import { IGenre } from '../interface';

const Genres = createContext<Array<IGenre>>([]);

export default Genres;
