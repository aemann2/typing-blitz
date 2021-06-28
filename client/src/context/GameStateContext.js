import React, { createContext, useState } from 'react';

export const GameStateContext = createContext();

const GameStateContextProvider = (props) => {
  const [isTimeOut, setIsTimeOut] = useState(true);
  const [difficulty, setDifficulty] = useState('easy');
  const [showPopup, setShowPopup] = useState(false);

  return (
    <GameStateContext.Provider
      value={{
        isTimeOut,
        setIsTimeOut,
        difficulty,
        setDifficulty,
        showPopup,
        setShowPopup,
      }}
    >
      {props.children}
    </GameStateContext.Provider>
  );
};

export default GameStateContextProvider;
