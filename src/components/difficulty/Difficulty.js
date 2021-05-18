import React, { useContext } from 'react';
import classes from './css/Difficulty.module.scss';
import { GameStateContext } from '../../context/GameStateContext';

const Difficulty = () => {
  const { isTimeOut, setDifficulty } = useContext(GameStateContext);

  const handleClick = (e) => {
    setDifficulty(e.target.value);
  };

  return (
    <>
      {isTimeOut && (
        <div className={`${classes.difficulty} ${classes.fadeIn}`}>
          <button className={classes.button} onClick={handleClick} value='easy'>
            easy
          </button>
          <button
            className={classes.button}
            onClick={handleClick}
            value='medium'
          >
            medium
          </button>
          <button className={classes.button} onClick={handleClick} value='hard'>
            hard
          </button>
        </div>
      )}
    </>
  );
};

export default Difficulty;
