import { useContext, useRef, useEffect } from 'react';
import classes from './css/Timer.module.css';
import Timer from 'react-compound-timer';
import { ScoreContext } from '../../context/ScoreContext';
import { WordsContext } from '../../context/WordsContext';
import { GameStateContext } from '../../context/GameStateContext';

const Countdown = () => {
  const { setScore } = useContext(ScoreContext);
  const { setSubstring, setToHighlight } = useContext(WordsContext);
  const { isTimeOut, setIsTimeOut, setShowPopup } =
    useContext(GameStateContext);

  const button = useRef(null);

  useEffect(() => {
    if (button.current) {
      button.current.focus();
    }
  }, [isTimeOut]);

  return (
    <div>
      <Timer
        initialTime={3000}
        startImmediately={false}
        lastUnit='s'
        direction='backward'
        timeToUpdate={100}
        checkpoints={[
          {
            time: 0,
            callback: () => {
              setIsTimeOut(true);
              setShowPopup(true);
            },
          },
        ]}
      >
        {({ start, reset }) => (
          <>
            <div>
              <Timer.Seconds />
            </div>
            <div>
              {isTimeOut && (
                <button
                  ref={button}
                  onClick={() => {
                    // Resetting the timer and the game state //
                    reset();
                    start();
                    setIsTimeOut(false);
                    setScore(0);
                    setSubstring('');
                    setToHighlight('');
                  }}
                  type='button'
                >
                  Start
                </button>
              )}
            </div>
          </>
        )}
      </Timer>
    </div>
  );
};

export default Countdown;
