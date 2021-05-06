import React, { useState, useEffect } from 'react';
import useKeypress from '../hooks/useKeypress';
import { Highlight } from 'react-highlight-regex';

const WordChanger = ({ wordArray, currentWord, setCurrentWord }) => {
  const [toHighlight, setToHighlight] = useState('');
  let regex = null;

  useEffect(() => {
    setCurrentWord(wordArray[0]);
  }, [wordArray, setCurrentWord]);

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
