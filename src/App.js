import './App.css';
import { useState } from 'react';
import Score from './components/Score';
import Countdown from './components/Timer';
import WordChanger from './components/WordChanger';
import WordPreview from './components/WordPreview';
// import Restart from './components/Restart';
import ScoreContextProvider from './context/ScoreContext';
import WordsContextProvider from './context/WordsContext';

function App() {
  const [isGameOver, setIsGameOver] = useState(true);
  const [isTimeOut, setIsTimeOut] = useState(false);

  return (
    <div className='app'>
      <WordsContextProvider>
        <ScoreContextProvider>
          <Score />
          <Countdown
            isGameOver={isGameOver}
            setIsGameOver={setIsGameOver}
            isTimeOut={isTimeOut}
            setIsTimeOut={setIsTimeOut}
          />
          <WordChanger
            isGameOver={isGameOver}
            setIsGameOver={setIsGameOver}
            isTimeOut={isTimeOut}
          />
          <WordPreview />
          {/* {isTimeOut && (
            <Restart
              setIsTimeOut={setIsTimeOut}
              setIsGameOver={setIsGameOver}
            />
          )} */}
        </ScoreContextProvider>
      </WordsContextProvider>
    </div>
  );
}

export default App;
