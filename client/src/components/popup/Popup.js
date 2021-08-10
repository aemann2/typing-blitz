import { useContext, useRef, useEffect } from 'react';
import { WordsContext } from '../../context/WordsContext';
import { GameStateContext } from '../../context/GameStateContext';
import { ScoreContext } from '../../context/ScoreContext';
import axios from 'axios';
import classes from './css/Popup.module.scss';
import Button from 'react-bootstrap/Button';
import { motion, AnimatePresence } from 'framer-motion';

const backdropVariants = {
	visible: { opacity: 1 },
	hidden: { opacity: 0 },
	exit: { opacity: 1 },
};

const Popup = () => {
	const { showPopup, setShowPopup } = useContext(GameStateContext);
	const { score, setScore } = useContext(ScoreContext);
	const { currentWord, wordArray, setCurrentWord } = useContext(WordsContext);

	const button = useRef(null);

	async function testPost() {
		try {
			const res = await axios.post('/api/v1/scores', {
				player: 'TST2',
				score: score,
			});

			const res2 = await axios.get('/api/v1/scores');
			const data = res2.data.data;
			console.log(data.slice(0, 20));
		} catch (error) {
			console.log(error);
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
		<AnimatePresence exitBeforeEnter>
			{showPopup && (
				// this div represents the semi-transparent BG
				<motion.div
					className={classes.backdrop}
					variants={backdropVariants}
					animate='visible'
					initial='hidden'
					exit={{ opacity: 0 }}
				>
					{/* the actual modal popup */}
					<motion.div
						className={classes.modal}
						initial={{ y: '-100vh', opacity: 0 }}
						animate={{ y: '200px', opacity: 1, transition: { delay: 0.51 } }}
						transition={{ type: 'spring', stiffness: 200 }}
						exit={{ y: '-100vh' }}
					>
						<h2>Time Up!</h2>
						<p>Score: {score}</p>
						<Button variant='primary' ref={button} onClick={handleClose}>
							Play Again
						</Button>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Popup;
