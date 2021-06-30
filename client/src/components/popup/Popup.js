import { useContext, useRef, useEffect } from 'react';
import { WordsContext } from '../../context/WordsContext';
import { GameStateContext } from '../../context/GameStateContext';
import { ScoreContext } from '../../context/ScoreContext';
import axios from 'axios';
import classes from './css/Popup.module.scss';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Popup = () => {
  const { showPopup, setShowPopup } = useContext(GameStateContext);
  const { score, setScore } = useContext(ScoreContext);
  const { currentWord, wordArray, setCurrentWord } = useContext(WordsContext);

  const button = useRef(null);
  
  async function testPost() {
    try {
      const res = await axios.post('/api/v1/scores', { player: "TST2", score: score});

      console.log(res);

    } catch (error) {
      console.log(error)
    }
  }

  const handleClose = () => {
    setShowPopup(false);
    const wordIndex = wordArray.indexOf(currentWord);
    setCurrentWord(wordArray[wordIndex + 1]);
    testPost();
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
        // setting animation to false to avoid findDOMNode error
        animation={false}
        centered
        className={`${classes.modal} ${classes.fadeIn}`}
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
