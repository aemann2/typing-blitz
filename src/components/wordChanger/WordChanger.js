import React, { useEffect, useContext, useRef } from 'react';
import classes from './css/WordChanger.module.css';
import { WordsContext } from '../../context/WordsContext';
import { GameStateContext } from '../../context/GameStateContext';
import useKeypress from '../../hooks/useKeypress';
import Highlighter from '../highlighter/Highlighter';
import generateWords from '../../utils/randomWords';

const WordChanger = () => {
  const { wordArray, setWordArray, currentWord, setCurrentWord } =
    useContext(WordsContext);
  const { isTimeOut, difficulty } = useContext(GameStateContext);

  const countRef = useRef(-1);

  useEffect(() => {
    setWordArray(generateWords(difficulty));
  }, [setWordArray, difficulty]);

  useEffect(() => {
    setCurrentWord(wordArray[0]);
  }, [wordArray, setCurrentWord]);

  const changeCurrentWord = () => {
    const wordIndex = wordArray.indexOf(currentWord);
    setCurrentWord(wordArray[wordIndex + 1]);
  };

  const counter = () => {
    countRef.current = countRef.current + 1;
    return countRef.current;
  };

  useKeypress((e) => {
    let i = counter();
    if (currentWord && !isTimeOut) {
      if (e.key !== currentWord[i]) {
        changeCurrentWord();
        countRef.current = -1;
      }
      if (i === currentWord.length - 1) {
        changeCurrentWord();
        countRef.current = -1;
      }
    }
  });

  return (
    <main>
      <Highlighter />
    </main>
  );
};

export default WordChanger;
