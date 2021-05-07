import React, { useEffect, useContext } from 'react';
import { WordsContext } from '../context/WordsContext';
import * as Helper from '../utils/helpers';
import fetchArray from '../utils/fetchArray';
import useKeypress from '../hooks/useKeypress';
import { Highlight } from 'react-highlight-regex';

const WordChanger = () => {
  const {
    wordArray,
    setWordArray,
    currentWord,
    setCurrentWord,
    setSubstring,
    toHighlight,
    setToHighlight,
  } = useContext(WordsContext);

  let regex = null;

  useEffect(() => {
    fetchArray(setWordArray);
  }, [setWordArray]);

  useEffect(() => {
    setCurrentWord(wordArray[0]);
  }, [wordArray, setCurrentWord]);

  const changeCurrentWord = () => {
    const wordIndex = wordArray.indexOf(currentWord);
    setCurrentWord(wordArray[wordIndex + 1]);
  };

  const resetSubstringAndHighlight = () => {
    setSubstring(null);
    setToHighlight('');
  };

  useKeypress(changeCurrentWord);

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
