import React, { useState, useEffect } from 'react';
import useKeypress from '../hooks/useKeypress';
import fetchArray from '../utils/fetchArray';

const WordChanger = () => {
  const [wordArray, setWordArray] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);

  useEffect(() => {
    fetchArray(setWordArray);
  }, []);

  useEffect(() => {
    setCurrentWord(wordArray[0]);
  }, [wordArray]);

  const changeWord = () => {
    const wordIndex = wordArray.indexOf(currentWord);
    setCurrentWord(wordArray[wordIndex + 1]);
  };

  useKeypress(currentWord, changeWord);

  return (
    <main>
      <h1>{currentWord}</h1>
    </main>
  );
};

export default WordChanger;
