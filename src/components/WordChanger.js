import React, { useEffect, useContext } from 'react';
import { WordsContext } from '../context/WordsContext';
import { GameStateContext } from '../context/GameStateContext';
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
    toHighlight,
    setToHighlight,
    substring,
    setSubstring,
  } = useContext(WordsContext);
  const { isGameOver, isTimeOut } = useContext(GameStateContext);

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

  if (toHighlight) {
    regex = new RegExp(toHighlight);
  }

  useKeypress((e) => {
    if (currentWord && !isGameOver && !isTimeOut) {
      // if a substring has been created (after a first character has been typed)
      if (substring) {
        // if it's the last character and the right letter...
        if (e.key === substring[0] && substring.length === 1) {
          resetSubstringAndHighlight();
          setToHighlight(toHighlight + e.key);
          changeCurrentWord();
          // elif it's the right letter...
        } else if (e.key === substring[0]) {
          setSubstring(substring.slice(1, currentWord.length));
          setToHighlight(toHighlight + e.key);
          // if it's the wrong letter
        } else {
          resetSubstringAndHighlight();
          changeCurrentWord();
        }
      } else if (e.key === currentWord[0]) {
        // if it's the right character of the first letter, set the substring and highlight
        setSubstring(currentWord.slice(1, currentWord.length));
        setToHighlight(toHighlight + e.key);
      } else {
        //otherwise, switch the word out
        resetSubstringAndHighlight();
        changeCurrentWord();
      }
    }
  });

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
