import React, { useState, useEffect } from 'react';
import useKeypress from '../hooks/useKeypress';
import fetchArray from '../utils/fetchArray';
import { Highlight } from 'react-highlight-regex';

const WordChanger = () => {
  const [wordArray, setWordArray] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [toHighlight, setToHighlight] = useState('');
  let regex = null;

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

  useKeypress(currentWord, changeWord, toHighlight, setToHighlight);

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
