import React, { useEffect, useContext } from 'react';
import classes from './css/WordChanger.module.css';
import { WordsContext } from '../../context/WordsContext';
import { GameStateContext } from '../../context/GameStateContext';
import useKeypress from '../../hooks/useKeypress';
import Highlighter from '../highlighter/Highlighter';
import generateWords from '../../utils/randomWords';

const WordChanger = () => {
  const {
    wordArray,
    setWordArray,
    currentWord,
    setCurrentWord,
    substring,
    setSubstring,
  } = useContext(WordsContext);
  const { isTimeOut, difficulty, showPopup } = useContext(GameStateContext);

  useEffect(() => {
    setWordArray(generateWords(difficulty));
  }, [setWordArray, difficulty]);

  useEffect(() => {
    setCurrentWord(wordArray[0]);
  }, [wordArray, setCurrentWord]);

  const changeCurrentWord = () => {
    setSubstring(null);
    const wordIndex = wordArray.indexOf(currentWord);
    setCurrentWord(wordArray[wordIndex + 1]);
  };

  useKeypress((e) => {
    if (currentWord && !isTimeOut && !showPopup) {
      // if a substring has been created (after a first character has been typed)
      if (substring && !showPopup) {
        // if it's the last character and the right letter...
        if (e.key === substring[0] && substring.length === 1) {
          changeCurrentWord();
          // elif it's the right letter...
        } else if (e.key === substring[0]) {
          setSubstring(substring.slice(1, currentWord.length));
          // if it's the wrong letter
        } else {
          changeCurrentWord();
        }
      } else if (e.key === currentWord[0]) {
        // if it's the right character of the first letter, set the substring
        setSubstring(currentWord.slice(1, currentWord.length));
      } else {
        //otherwise, switch the word out
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
