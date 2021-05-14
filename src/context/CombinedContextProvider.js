import GameStateContextProvider from './GameStateContext';
import WordsContextProvider from './WordsContext';
import ScoreContextProvider from './ScoreContext';

import { combineComponents } from '../utils/combineComponents';

const providers = [
  GameStateContextProvider,
  WordsContextProvider,
  ScoreContextProvider,
];

export const CombinedContextProvider = combineComponents(...providers);
