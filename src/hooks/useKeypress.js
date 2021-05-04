import { useEffect, useState } from 'react';

export default function useKeypress(word, callback) {
  const [substring, setSubstring] = useState(word);

  useEffect(() => {
    if (word) {
      function onKeydown(e) {
        if (substring) {
          if (e.key === substring[0] && substring.length === 1) {
            setSubstring(null);
            callback();
          } else if (e.key === substring[0]) {
            setSubstring(substring.slice(1, word.length));
          } else {
            setSubstring(null);
            callback();
          }
        } else if (e.key === word[0]) {
          setSubstring(word.slice(1, word.length));
        } else {
          setSubstring(null);
          callback();
        }
      }
      window.addEventListener('keydown', onKeydown);
      return () => window.removeEventListener('keydown', onKeydown);
    }
  }, [word, substring, callback]);
}
