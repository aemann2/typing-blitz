import Timer from 'react-compound-timer';

const Countdown = ({ setIsGameOver }) => {
  return (
    <div>
      <Timer
        initialTime={60000}
        startImmediately={false}
        lastUnit='s'
        direction='backward'
        timeToUpdate={100}
        checkpoints={[
          {
            time: 0,
            callback: () => setIsGameOver(true),
          },
        ]}
      >
        {({ start }) => (
          <>
            <div>
              <Timer.Seconds />
            </div>
            <div>
              <button onClick={start}>Start</button>
            </div>
          </>
        )}
      </Timer>
    </div>
  );
};

export default Countdown;
