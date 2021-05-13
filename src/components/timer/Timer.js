import { useContext, useRef, useEffect } from 'react';
import classes from './css/Timer.module.css';
import useKeypress from '../../hooks/useKeypress';
import Timer from 'react-compound-timer';
import { ScoreContext } from '../../context/ScoreContext';
import { WordsContext } from '../../context/WordsContext';
import { GameStateContext } from '../../context/GameStateContext';

const Countdown = () => {
  const { setScore } = useContext(ScoreContext);
  const {
    wordArray,
    setCurrentWord,
    currentWord,
    substring,
    setSubstring,
    toHighlight,
    setToHighlight,
  } = useContext(WordsContext);
  const { isTimeOut, setIsTimeOut, showPopup, setShowPopup } =
    useContext(GameStateContext);

  const button = useRef(null);
  const timer = useRef(null);

  const changeCurrentWord = () => {
    setSubstring(null);
    const wordIndex = wordArray.indexOf(currentWord);
    setCurrentWord(wordArray[wordIndex + 1]);
  };

  useKeypress((e) => {
    if (e.key && isTimeOut && !showPopup) {
      timer.current.reset();
      timer.current.start();
      setIsTimeOut(false);
      setScore(0);
      setSubstring('');
      setToHighlight('');
    }
    if (substring && !showPopup) {
      // if it's the last character and the right letter...
      if (e.key === substring[0] && substring.length === 1) {
        changeCurrentWord();
        setToHighlight('');
        // elif it's the right letter...
      } else if (e.key === substring[0]) {
        setSubstring(substring.slice(1, currentWord.length));
        setToHighlight(toHighlight + e.key);
        // if it's the wrong letter
      } else {
        changeCurrentWord();
        setToHighlight('');
      }
    } else if (e.key === currentWord[0]) {
      // if it's the right character of the first letter, set the substring
      setSubstring(currentWord.slice(1, currentWord.length));
      setToHighlight(toHighlight + e.key);
    } else {
      //otherwise, switch the word out
      changeCurrentWord();
      setToHighlight('');
    }
  });

  // setting autofocus on the Timer button on isTimeOut state change
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
        ref={timer}
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
