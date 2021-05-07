import React, { createContext, useState } from 'react';

export const GameStateContext = createContext();

const GameStateContextProvider = (props) => {
  const [isGameOver, setIsGameOver] = useState(true);
  const [isTimeOut, setIsTimeOut] = useState(false);

  return (
    <GameStateContext.Provider
      value={{ isGameOver, setIsGameOver, isTimeOut, setIsTimeOut }}
    >
      {props.children}
    </GameStateContext.Provider>
  );
};

export default GameStateContextProvider;
