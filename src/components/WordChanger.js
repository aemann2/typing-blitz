import React, { useState, useEffect, useContext } from 'react';
import { WordsContext } from '../context/WordsContext';
import fetchArray from '../utils/fetchArray';
import useKeypress from '../hooks/useKeypress';
import { Highlight } from 'react-highlight-regex';

const WordChanger = ({ isGameOver, setIsGameOver, isTimeOut }) => {
  const { wordArray, setWordArray, currentWord, setCurrentWord } = useContext(
    WordsContext
  );
  const [toHighlight, setToHighlight] = useState('');
  let regex = null;

  useEffect(() => {
    fetchArray(setWordArray);
  }, [setWordArray]);

  useEffect(() => {
    setCurrentWord(wordArray[0]);
  }, [wordArray, setCurrentWord]);

  const changeWord = () => {
    const wordIndex = wordArray.indexOf(currentWord);
    setCurrentWord(wordArray[wordIndex + 1]);
  };

  useKeypress(
    currentWord,
    changeWord,
    toHighlight,
    setToHighlight,
    isGameOver,
    setIsGameOver,
    isTimeOut
  );

  if (toHighlight) {
    regex = new RegExp(toHighlight);
  }

  return (
    <main>
      {regex ? (
        <h1>
          <Highlight match={regex} text={currentWord} />
        </h1>
      ) : (
        <h1>{currentWord}</h1>
      )}
    </main>
  );
};

export default WordChanger;
