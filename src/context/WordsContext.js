import React, { createContext, useState } from 'react';

export const WordsContext = createContext();

const WordsContextProvider = (props) => {
  const [wordArray, setWordArray] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [toHighlight, setToHighlight] = useState('');

  return (
    <WordsContext.Provider
      value={{
        wordArray,
        setWordArray,
        currentWord,
        setCurrentWord,
        toHighlight,
        setToHighlight,
      }}
    >
      {props.children}
    </WordsContext.Provider>
  );
};

export default WordsContextProvider;
