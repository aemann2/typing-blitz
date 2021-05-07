import React from 'react';

const Restart = ({ setIsTimeOut, setIsGameOver }) => {
  return (
    <>
      <button
        onClick={() => {
          setIsTimeOut(false);
          setIsGameOver(false);
        }}
      >
        Restart
      </button>
    </>
  );
};

export default Restart;
