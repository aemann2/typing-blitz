import { useContext } from 'react';
import { WordsContext } from '../../context/WordsContext';
import { GameStateContext } from '../../context/GameStateContext';
import { ScoreContext } from '../../context/ScoreContext';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Popup = () => {
  const { showPopup, setShowPopup } = useContext(GameStateContext);
  const { score, setScore } = useContext(ScoreContext);
  const { currentWord, wordArray, setCurrentWord } = useContext(WordsContext);

  const handleClose = () => {
    setShowPopup(false);
    const wordIndex = wordArray.indexOf(currentWord);
    setCurrentWord(wordArray[wordIndex + 1]);
    setScore(0);
  };

  return (
    <>
      <Modal
        show={showPopup}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Time Up!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Score: {score}</Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleClose}>
            Play Again
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Popup;
