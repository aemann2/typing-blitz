import { useContext, useRef, useEffect } from 'react';
import { WordsContext } from '../../context/WordsContext';
import { GameStateContext } from '../../context/GameStateContext';
import { ScoreContext } from '../../context/ScoreContext';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Popup = () => {
  const { showPopup, setShowPopup } = useContext(GameStateContext);
  const { score, setScore } = useContext(ScoreContext);
  const { currentWord, wordArray, setCurrentWord } = useContext(WordsContext);

  const button = useRef(null);

  const handleClose = () => {
    setShowPopup(false);
    const wordIndex = wordArray.indexOf(currentWord);
    setCurrentWord(wordArray[wordIndex + 1]);
    setScore(0);
  };

  // setting modal button autofocus on showPopup state change
  useEffect(() => {
    if (button.current) {
      button.current.focus();
    }
  }, [showPopup]);

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
          <Button variant='primary' ref={button} onClick={handleClose}>
            Play Again
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Popup;
