// Display a random word and a button on the screen. When you click the button, it displays a new random word.
const endpoint = 'http://random-word-api.herokuapp.com/word?number=100';
const h1 = document.querySelector('h1');
const button = document.querySelector('button');
let words = [];

const getRandomWordArray = async function () {
  // getting words from the API and setting the h1 to the first word in the array
  await fetch(endpoint)
    .then((res) => res.json())
    .then((data) => (words = [...data]));
  h1.innerHTML = words[0];
};

getRandomWordArray();

const wordArrayIterator = () => {
  // setting up a closure so the counter isn't global
  let counter = 1;

  function inner() {
    // using our counter to traverse the words array without mutating it
    h1.innerHTML = words.slice(counter, counter + 1);
    return counter++;
  }

  return inner;
};

const handleClick = wordArrayIterator();

button.addEventListener('click', () => handleClick());
