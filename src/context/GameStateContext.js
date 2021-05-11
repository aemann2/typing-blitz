import React, { createContext, useState } from 'react';

export const GameStateContext = createContext();

const GameStateContextProvider = (props) => {
  const [isTimeOut, setIsTimeOut] = useState(true);
  const [difficulty, setDifficulty] = useState('easy');

  return (
    <GameStateContext.Provider
      value={{ isTimeOut, setIsTimeOut, difficulty, setDifficulty }}
    >
      {props.children}
    </GameStateContext.Provider>
  );
};

export default GameStateContextProvider;
