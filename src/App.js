import './App.css';
import Score from './components/Score';
import Timer from './components/Timer';
import WordChanger from './components/WordChanger';
import ScoreContextProvider from './context/ScoreContext';

function App() {
  return (
    <div className='app'>
      <ScoreContextProvider>
        <Score />
        <Timer />
        <WordChanger />
      </ScoreContextProvider>
    </div>
  );
}

export default App;
