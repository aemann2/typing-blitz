import React, { useState, useEffect, useRef } from 'react';

const WordChanger = () => {
  const [wordArray, setWordArray] = useState([]);
  const h1 = useRef(null);

  const endpoint = 'http://random-word-api.herokuapp.com/word?number=100';

  useEffect(() => {
    async function getRandomWordArray() {
      // getting words from the API and setting the h1 to the first word in the array
      await fetch(endpoint)
        .then((res) => res.json())
        .then((data) => setWordArray([...data]));
    }
    getRandomWordArray();
  }, []);

  const handleClick = () => {
    console.log(h1.current);
    const wordIndex = wordArray.indexOf(h1.current);
    h1.current = wordArray[wordIndex + 1];
  };

  return (
    <main>
      <h1 ref={h1}>{wordArray[0]}</h1>
      <button onClick={handleClick}>New word</button>
    </main>
  );
};

export default WordChanger;
