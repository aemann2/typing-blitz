import React, { useContext } from 'react';
import classes from './css/Score.module.css';
import { ScoreContext } from '../../context/ScoreContext';
import { WordsContext } from '../../context/WordsContext';
import { GameStateContext } from '../../context/GameStateContext';
import useKeypress from '../../hooks/useKeypress';

const Score = () => {
  const { score, setScore } = useContext(ScoreContext);
  const { currentWord, substring } = useContext(WordsContext);
  const { isTimeOut } = useContext(GameStateContext);

  useKeypress((e) => {
    if (currentWord && !isTimeOut) {
      // if the key is the first letter of the current word, or if the substring exists and the key is the first letter...
      if (!substring && e.key === currentWord[0]) {
        setScore(score + 10);
      } else if (substring && e.key === substring[0]) {
        setScore(score + 10);
      } else {
        setScore(score - 10);
      }
    }
  });

  return (
    <>
      <h2 className={classes.score}>Score:{score} </h2>
    </>
  );
};

export default Score;
