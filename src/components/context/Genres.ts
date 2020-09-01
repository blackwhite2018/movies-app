import { createContext } from 'react';
import IGenre from '../interface/Genre';

const Genres = createContext<Array<IGenre>>([]);

export default Genres;
