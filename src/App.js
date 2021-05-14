import './App.css';
import Score from './components/score/Score';
import Countdown from './components/timer/Timer';
import WordChanger from './components/wordChanger/WordChanger';
import WordPreview from './components/wordPreview/WordPreview';
import Difficulty from './components/difficulty/Difficulty';
import Popup from './components/popup/Popup';
import { CombinedContextProvider } from './context/CombinedContextProvider';

function App() {
  return (
    <div className='app'>
      <CombinedContextProvider>
        <Score />
        <Countdown />
        <WordChanger />
        <WordPreview />
        <Difficulty />
        <Popup />
      </CombinedContextProvider>
    </div>
  );
}

export default App;
