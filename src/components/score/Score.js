import React, { useContext, useRef } from 'react';
import classes from './css/Score.module.css';
import { ScoreContext } from '../../context/ScoreContext';
import { WordsContext } from '../../context/WordsContext';
import { GameStateContext } from '../../context/GameStateContext';
import useKeypress from '../../hooks/useKeypress';

const Score = () => {
  const { score, setScore } = useContext(ScoreContext);
  const { currentWord } = useContext(WordsContext);
  const { isTimeOut } = useContext(GameStateContext);

  const countRef = useRef(-1);

  const counter = () => {
    countRef.current = countRef.current + 1;
    console.log(countRef.current);
    return countRef.current;
  };

  useKeypress((e) => {
    if (currentWord && !isTimeOut) {
      let i = counter();
      if (e.key === currentWord[i]) {
        setScore(score + 10);
        if (i === currentWord.length - 1) {
          if (e.key === currentWord[i]) {
            setScore(score + 10);
          } else {
            setScore(score - 10);
          }
          countRef.current = -1;
        }
      } else {
        setScore(score - 10);
        countRef.current = -1;
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
