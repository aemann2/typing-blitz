import { useContext } from 'react';
import { ScoreContext } from '../context/ScoreContext';
import { WordsContext } from '../context/WordsContext';
import { GameStateContext } from '../context/GameStateContext';

export default function useResetGameState() {
  const { setScore } = useContext(ScoreContext);
  const {
    wordArray,
    currentWord,
    setCurrentWord,
    setSubstring,
    setToHighlight,
  } = useContext(WordsContext);
  const { setIsGameOver, setIsTimeOut } = useContext(GameStateContext);

  setIsGameOver(false);
  setIsTimeOut(false);
  setScore(0);
  setCurrentWord(wordArray[wordArray.indexOf(currentWord) + 1]);
  setSubstring(wordArray[wordArray.indexOf(currentWord) + 1]);
  setToHighlight('');
}
