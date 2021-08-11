import { useContext, useRef, useEffect } from 'react';
import classes from './css/Timer.module.scss';
import Timer from 'react-compound-timer';
import { ScoreContext } from '../../context/ScoreContext';
import { WordsContext } from '../../context/WordsContext';
import { GameStateContext } from '../../context/GameStateContext';
import { motion } from 'framer-motion';
import axios from 'axios';

const timerVariants = {
	hidden: {
		y: '-100vh',
	},
	show: {
		y: 1,
		transition: {
			type: 'tween',
			duration: 1.2,
		},
	},
};

const Countdown = () => {
	const { setScore, setDbData } = useContext(ScoreContext);
	const { setSubstring, setToHighlight } = useContext(WordsContext);
	const { isTimeOut, setIsTimeOut, setShowPopup } =
		useContext(GameStateContext);

	const button = useRef(null);
	const timer = useRef(null);

	async function getData() {
		try {
			const res = await axios.get('/api/v1/scores');
			console.log(res.data.data);
			setDbData(res.data.data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		if (button.current) {
			button.current.focus();
		}
	}, [isTimeOut]);

	return (
		<motion.div variants={timerVariants} initial='hidden' animate='show'>
			<Timer
				// initialTime={30000}
				initialTime={5000}
				ref={timer}
				startImmediately={false}
				lastUnit='s'
				direction='backward'
				timeToUpdate={100}
				checkpoints={[
					{
						time: 0,
						callback: () => {
							getData();
							setIsTimeOut(true);
							setShowPopup(true);
						},
					},
				]}
			>
				{({ start, reset }) => (
					<>
						<div
							className={
								timer.current && timer.current.getTime() > 10000
									? classes.timer
									: classes.timerLow
							}
						>
							<Timer.Seconds />
						</div>
						<div>
							{isTimeOut && (
								<button
									className={classes.timerBtn}
									ref={button}
									onClick={() => {
										// Resetting the timer and the game state //
										reset();
										start();
										setIsTimeOut(false);
										setSubstring('');
										setToHighlight('');
										setScore(0);
									}}
									type='button'
								>
									Start
								</button>
							)}
						</div>
					</>
				)}
			</Timer>
		</motion.div>
	);
};

export default Countdown;
