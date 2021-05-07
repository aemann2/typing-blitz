import { useEffect, useContext } from 'react';
import { WordsContext } from '../context/WordsContext';
import { ScoreContext } from '../context/ScoreContext';
import { GameStateContext } from '../context/GameStateContext';

export default function useKeypress(callback) {
  const { score, setScore } = useContext(ScoreContext);
  const {
    currentWord,
    toHighlight,
    setToHighlight,
    substring,
    setSubstring,
  } = useContext(WordsContext);
  const { isGameOver, setIsGameOver, isTimeOut } = useContext(GameStateContext);

  useEffect(() => {
    if (currentWord && !isGameOver && !isTimeOut) {
      function onKeydown(e) {
        // if a substring has been created (after a first character has been typed)
        if (substring) {
          // if it's the last character and the right letter...
          if (e.key === substring[0] && substring.length === 1) {
            setSubstring(null);
            setToHighlight('');
            setToHighlight(toHighlight + e.key);
            setScore(score + 10);
            callback();
            // elif it's the right letter...
          } else if (e.key === substring[0]) {
            setSubstring(substring.slice(1, currentWord.length));
            setScore(score + 10);
            setToHighlight(toHighlight + e.key);
            // if it's the wrong letter
          } else {
            setSubstring(null);
            setToHighlight('');
            setScore(score - 10);
            callback();
          }
        } else if (e.key === currentWord[0]) {
          // if it's the right character of the first letter, set the substring and highlight
          setSubstring(currentWord.slice(1, currentWord.length));
          setToHighlight(toHighlight + e.key);
          setScore(score + 10);
        } else {
          //otherwise, switch the word out
          setSubstring(null);
          setToHighlight('');
          setScore(score - 10);
          callback();
        }
      }
      window.addEventListener('keydown', onKeydown);
      return () => window.removeEventListener('keydown', onKeydown);
    }
  }, [
    currentWord,
    substring,
    setSubstring,
    callback,
    toHighlight,
    setToHighlight,
    score,
    setScore,
    isGameOver,
    setIsGameOver,
    isTimeOut,
  ]);
}
