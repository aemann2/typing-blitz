import React, { useState, useEffect } from 'react';
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

  const handleClick = () => {
    // each click gets the index of the current word and sets a new current word to the index + 1
    const wordIndex = wordArray.indexOf(currentWord);
    setCurrentWord(wordArray[wordIndex + 1]);
  };

  return (
    <main>
      <h1>{currentWord}</h1>
      <button onClick={handleClick}>New word</button>
    </main>
  );
};

export default WordChanger;
