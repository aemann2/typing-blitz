import React, { useContext } from 'react';
import classes from './css/WordPreview.module.css';
import { WordsContext } from '../../context/WordsContext';

const WordPreview = () => {
  const { wordArray, currentWord } = useContext(WordsContext);
  const currentWordIndex = wordArray.indexOf(currentWord);
  return (
    <div>
      <h1>{wordArray[currentWordIndex + 1]}</h1>
      <h1>{wordArray[currentWordIndex + 2]}</h1>
    </div>
  );
};

export default WordPreview;
