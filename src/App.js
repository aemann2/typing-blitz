import './App.scss';
import Score from './components/score/Score';
import Countdown from './components/timer/Timer';
import WordChanger from './components/wordChanger/WordChanger';
import Difficulty from './components/difficulty/Difficulty';
import Popup from './components/popup/Popup';
import CombinedContextProvider from './context/CombinedContextProvider';

function App() {
  return (
    <div className='app'>
      <main>
        <CombinedContextProvider>
          <Countdown />
          <WordChanger />
          <Difficulty />
          <Score />
          <Popup />
        </CombinedContextProvider>
      </main>
    </div>
  );
}

export default App;
