import { useState, useEffect } from 'react';
import './App.css';
import fetchArray from './utils/fetchArray';
import Score from './components/Score';
import Timer from './components/Timer';
import WordChanger from './components/WordChanger';
import WordPreview from './components/WordPreview';
import ScoreContextProvider from './context/ScoreContext';

function App() {
  const [wordArray, setWordArray] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);

  useEffect(() => {
    fetchArray(setWordArray);
  }, [setWordArray]);

  return (
    <div className='app'>
      <ScoreContextProvider>
        <Score />
        <Timer />
        <WordChanger
          wordArray={wordArray}
          setWordArray={setWordArray}
          currentWord={currentWord}
          setCurrentWord={setCurrentWord}
        />
        <WordPreview wordArray={wordArray} currentWord={currentWord} />
      </ScoreContextProvider>
    </div>
  );
}

export default App;
