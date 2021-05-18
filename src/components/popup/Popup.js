import { useContext, useRef, useEffect } from 'react';
import { WordsContext } from '../../context/WordsContext';
import { GameStateContext } from '../../context/GameStateContext';
import { ScoreContext } from '../../context/ScoreContext';
import classes from './css/Popup.module.scss';
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
        className={classes.modal}
      >
        <Modal.Header closeButton>
          <Modal.Title className={classes.title}>Time Up!</Modal.Title>
        </Modal.Header>
        <Modal.Body className={classes.body}>Score: {score}</Modal.Body>
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
