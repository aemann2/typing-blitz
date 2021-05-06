import './App.css';
import { useState } from 'react';
import Score from './components/Score';
import Countdown from './components/Timer';
import WordChanger from './components/WordChanger';
import WordPreview from './components/WordPreview';
import ScoreContextProvider from './context/ScoreContext';
import WordsContextProvider from './context/WordsContext';

function App() {
  const [isGameOver, setIsGameOver] = useState(false);

  return (
    <div className='app'>
      <WordsContextProvider>
        <ScoreContextProvider>
          <Score />
          <Countdown isGameOver={isGameOver} setIsGameOver={setIsGameOver} />
          <WordChanger />
          <WordPreview />
        </ScoreContextProvider>
      </WordsContextProvider>
    </div>
  );
}

export default App;
