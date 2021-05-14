import './App.css';
import Score from './components/score/Score';
import Countdown from './components/timer/Timer';
import WordChanger from './components/wordChanger/WordChanger';
import WordPreview from './components/wordPreview/WordPreview';
import Difficulty from './components/difficulty/Difficulty';
import Popup from './components/popup/Popup';
import GameStateContextProvider from './context/GameStateContext';
import WordsContextProvider from './context/WordsContext';
import ScoreContextProvider from './context/ScoreContext';

function App() {
  return (
    <div className='app'>
      <GameStateContextProvider>
        <WordsContextProvider>
          <ScoreContextProvider>
            <Score />
            <Countdown />
            <WordChanger />
            <WordPreview />
            <Difficulty />
            <Popup />
          </ScoreContextProvider>
        </WordsContextProvider>
      </GameStateContextProvider>
    </div>
  );
}

export default App;
