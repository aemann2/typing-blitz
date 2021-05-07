import './App.css';
import Score from './components/Score';
import Countdown from './components/Timer';
import WordChanger from './components/WordChanger';
import WordPreview from './components/WordPreview';
// import Restart from './components/Restart';
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
            {/* {isTimeOut && (
            <Restart
              setIsTimeOut={setIsTimeOut}
              setIsGameOver={setIsGameOver}
            />
          )} */}
          </ScoreContextProvider>
        </WordsContextProvider>
      </GameStateContextProvider>
    </div>
  );
}

export default App;
