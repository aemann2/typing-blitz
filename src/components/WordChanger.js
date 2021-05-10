import React, { useEffect, useContext } from 'react';
import { WordsContext } from '../context/WordsContext';
import { GameStateContext } from '../context/GameStateContext';
import fetchArray from '../utils/fetchArray';
import useKeypress from '../hooks/useKeypress';
import Highlighter from './Highlighter';

const WordChanger = () => {
  const {
    wordArray,
    setWordArray,
    currentWord,
    setCurrentWord,
    substring,
    setSubstring,
  } = useContext(WordsContext);
  const { isGameOver, isTimeOut } = useContext(GameStateContext);

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

  useKeypress((e) => {
    if (currentWord && !isGameOver && !isTimeOut) {
      // if a substring has been created (after a first character has been typed)
      if (substring) {
        // if it's the last character and the right letter...
        if (e.key === substring[0] && substring.length === 1) {
          setSubstring(null);
          changeCurrentWord();
          // elif it's the right letter...
        } else if (e.key === substring[0]) {
          setSubstring(substring.slice(1, currentWord.length));
          // if it's the wrong letter
        } else {
          setSubstring(null);
          changeCurrentWord();
        }
      } else if (e.key === currentWord[0]) {
        // if it's the right character of the first letter, set the substring
        setSubstring(currentWord.slice(1, currentWord.length));
      } else {
        //otherwise, switch the word out
        setSubstring(null);
        changeCurrentWord();
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
