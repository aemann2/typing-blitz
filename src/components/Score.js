import React, { useContext } from 'react';
import { ScoreContext } from '../context/ScoreContext';
import { WordsContext } from '../context/WordsContext';
import { GameStateContext } from '../context/GameStateContext';
import useKeypress from '../hooks/useKeypress';

const Score = () => {
  const { score, setScore } = useContext(ScoreContext);
  const { currentWord, substring } = useContext(WordsContext);
  const { isTimeOut } = useContext(GameStateContext);

  useKeypress((e) => {
    if (currentWord && !isTimeOut) {
      // if the key is the first letter of the current word, or if the substring exists and the key is the first letter...
      if (e.key === currentWord[0] || (substring && e.key === substring[0])) {
        setScore(score + 10);
      } else {
        setScore(score - 10);
      }
    }
  });

  return (
    <>
      <h2>Score:{score} </h2>
    </>
  );
};

export default Score;
