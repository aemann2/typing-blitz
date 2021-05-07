import React, { useContext } from 'react';
import { ScoreContext } from '../context/ScoreContext';
import { WordsContext } from '../context/WordsContext';
import { GameStateContext } from '../context/GameStateContext';
import useKeypress from '../hooks/useKeypress';

const Score = () => {
  const { score, setScore } = useContext(ScoreContext);
  const { currentWord, substring } = useContext(WordsContext);
  const { isGameOver, isTimeOut } = useContext(GameStateContext);

  useKeypress((e) => {
    if (currentWord && !isGameOver && !isTimeOut) {
      // if a substring has been created (after a first character has been typed)
      if (substring) {
        // if it's the last character and the right letter...
        if (e.key === substring[0] && substring.length === 1) {
          setScore(score + 10);
          // elif it's the right letter...
        } else if (e.key === substring[0]) {
          setScore(score + 10);
          // if it's the wrong letter
        } else {
          setScore(score - 10);
        }
      } else if (e.key === currentWord[0]) {
        // if it's the right character of the first letter, set the substring and highlight
        setScore(score + 10);
      } else {
        //otherwise, switch the word out
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
