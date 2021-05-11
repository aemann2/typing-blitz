import React, { createContext, useState } from 'react';

export const GameStateContext = createContext();

const GameStateContextProvider = (props) => {
  const [isTimeOut, setIsTimeOut] = useState(true);

  return (
    <GameStateContext.Provider value={{ isTimeOut, setIsTimeOut }}>
      {props.children}
    </GameStateContext.Provider>
  );
};

export default GameStateContextProvider;
