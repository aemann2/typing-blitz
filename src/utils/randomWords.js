import randomWords from 'random-words';

const generateWords = (difficulty) => {
  if (difficulty === 'easy') {
    return randomWords({ exactly: 200, maxLength: 6 });
  } else if (difficulty === 'medium') {
    const wordArray = randomWords({ exactly: 10000, maxLength: 8 });
    return wordArray.filter((word) => word.length >= 6);
  } else if (difficulty === 'hard') {
    const wordArray = randomWords({ exactly: 10000, maxLength: 15 });
    return wordArray.filter((word) => word.length >= 8);
  }
};

export default generateWords;
