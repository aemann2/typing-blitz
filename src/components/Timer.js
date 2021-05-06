import { useRef } from 'react';
import Countdown, { zeroPad } from 'react-countdown';

const Timer = () => {
  const renderer = ({ minutes, seconds }) => (
    <span>
      {zeroPad(minutes, 1)}:{zeroPad(seconds)}
    </span>
  );

  const CountdownRef = useRef(null);

  const startTimer = () => {
    const startTimer = CountdownRef.current.getApi().start;
    // ^ using the getApi() function, as the documentation suggests
    // const startTimer = CountdownRef.current.api.start;
    startTimer();
  };

  return (
    <div>
      <div>
        <Countdown
          ref={CountdownRef}
          date={Date.now() + 60000}
          autoStart={false}
          renderer={renderer}
        />
      </div>
      <button onClick={startTimer}>Start</button>
    </div>
  );
};

export default Timer;
