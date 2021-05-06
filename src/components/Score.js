import React, { useState, useContext } from 'react';
import { ScoreContext } from '../context/ScoreContext';

const Score = () => {
  const { score } = useContext(ScoreContext);
  return (
    <>
      <h2>Score:{score} </h2>
    </>
  );
};

export default Score;
