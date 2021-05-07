import Timer from 'react-compound-timer';

const Countdown = ({ setIsGameOver, isTimeOut, setIsTimeOut }) => {
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
              setIsGameOver(true);
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
              {isTimeOut ? (
                <button
                  onClick={() => {
                    reset();
                    start();
                    setIsGameOver(false);
                    setIsTimeOut(false);
                  }}
                >
                  Reset
                </button>
              ) : (
                <button
                  onClick={() => {
                    start();
                    setIsGameOver(false);
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
