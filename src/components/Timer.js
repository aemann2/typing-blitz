import { useContext } from 'react';
import Timer from 'react-compound-timer';
import { ScoreContext } from '../context/ScoreContext';
import { WordsContext } from '../context/WordsContext';
import { GameStateContext } from '../context/GameStateContext';

const Countdown = () => {
  const { setScore } = useContext(ScoreContext);
  const {
    wordArray,
    currentWord,
    setCurrentWord,
    setSubstring,
    setToHighlight,
  } = useContext(WordsContext);
  const { isTimeOut, setIsTimeOut } = useContext(GameStateContext);

  return (
    <div>
      <Timer
        initialTime={5000}
        startImmediately={false}
        lastUnit='s'
        direction='backward'
        timeToUpdate={100}
        checkpoints={[
          {
            time: 0,
            callback: () => {
              // setIsGameOver(true);
              setIsTimeOut(true);
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
              {!isTimeOut ? (
                <button
                  onClick={() => {
                    // Resetting the timer and the game state //
                    reset();
                    start();
                    // setIsGameOver(false);
                    setIsTimeOut(false);
                    setScore(0);
                    setCurrentWord(
                      wordArray[wordArray.indexOf(currentWord) + 1]
                    );
                    setSubstring(wordArray[wordArray.indexOf(currentWord) + 1]);
                    setToHighlight('');
                  }}
                >
                  Reset
                </button>
              ) : (
                <button
                  onClick={() => {
                    start();
                    setIsTimeOut(false);
                  }}
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
