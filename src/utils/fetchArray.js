export default async function getRandomWordArray(setState) {
  const endpoint = 'http://random-word-api.herokuapp.com/word?number=1000';

  await fetch(endpoint)
    .then((res) => res.json())
    .then((data) => setState([...data]));
}
