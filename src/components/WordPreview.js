import React from 'react';

const WordPreview = ({ wordArray, currentWord }) => {
  const currentWordIndex = wordArray.indexOf(currentWord);
  return (
    <div>
      <h1>{wordArray[currentWordIndex + 1]}</h1>
      <h1>{wordArray[currentWordIndex + 2]}</h1>
    </div>
  );
};

export default WordPreview;
