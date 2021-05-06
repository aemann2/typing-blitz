import React, { createContext, useState } from 'react';

export const WordsContext = createContext();

const WordsContextProvider = (props) => {
  const [wordArray, setWordArray] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);

  return (
    <WordsContext.Provider
      value={{ wordArray, setWordArray, currentWord, setCurrentWord }}
    >
      {props.children}
    </WordsContext.Provider>
  );
};

export default WordsContextProvider;
