import { useContext, useRef, useEffect } from 'react';
import { WordsContext } from '../../context/WordsContext';
import { GameStateContext } from '../../context/GameStateContext';
import { ScoreContext } from '../../context/ScoreContext';
import classes from './css/Popup.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { getRank } from '../../utils/helpers';
import axios from 'axios';

const backdropVariants = {
	visible: { opacity: 1 },
	hidden: { opacity: 0 },
	exit: { opacity: 1 },
};

const Popup = () => {
	const { showPopup, setShowPopup } = useContext(GameStateContext);
	const { score, setScore, dbData } = useContext(ScoreContext);
	const { currentWord, wordArray, setCurrentWord } = useContext(WordsContext);

	const button = useRef(null);

	async function postData() {
		try {
			await axios.post('/api/v1/scores', {
				player: 'TST2',
				score: score,
			});
		} catch (error) {
			console.log(error);
		}
	}

	const handleClose = () => {
		postData();
		setShowPopup(false);
		const wordIndex = wordArray.indexOf(currentWord);
		setCurrentWord(wordArray[wordIndex + 1]);
		setScore(0);
	};

	useEffect(() => {
		if (button.current) {
			button.current.focus();
		}
	}, []);

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
						<p>Your score is: {score}</p>
						<p>{`Rank: ${getRank(dbData, score)} out of ${dbData.length}`}</p>
						{getRank(dbData, score) <= 20 && (
							<div>
								<p>Yay, you're in the top 20! </p>
								<p>Enter your initials:</p>
								<input placeholder={'ABC'} maxLength={3}></input>
							</div>
						)}
						<div className={classes.buttons}>
							<button
								className={classes.button}
								ref={button}
								onClick={handleClose}
							>
								Play Again
							</button>
							<button
								className={classes.button}
								ref={button}
								onClick={handleClose}
							>
								High Scores
							</button>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Popup;

// dbData.findIndex((entry) => entry.score <= score) + 1
