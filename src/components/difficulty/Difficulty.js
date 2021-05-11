import React, { useContext } from 'react';
import classes from './css/Difficulty.module.css';
import { GameStateContext } from '../../context/GameStateContext';

const Difficulty = () => {
  const { isTimeOut, setDifficulty } = useContext(GameStateContext);

  const handleClick = (e) => {
    setDifficulty(e.target.value);
  };

  return (
    <>
      {isTimeOut && (
        <div>
          <button onClick={handleClick} value='easy'>
            Easy
          </button>
          <button onClick={handleClick} value='medium'>
            Medium
          </button>
          <button onClick={handleClick} value='hard'>
            Hard
          </button>
        </div>
      )}
    </>
  );
};

export default Difficulty;
