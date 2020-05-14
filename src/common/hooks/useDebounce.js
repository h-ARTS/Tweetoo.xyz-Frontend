/**
 * Basic implementation of debounce
 */
// export default function(func, timeout) {
//   let timer;
//   return (...args) => {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       console.log('debounce executed');
//       func(...args);
//     }, timeout);
//   };
// }

import { useRef, useCallback } from 'react';

export default function useDebounce(func, delay = 100) {
  // Keep track of the state
  const ref = useRef({ id: 0 });

  // Use latest function that's passed
  ref.current.func = func;

  // Make sure we are not calling this function too often!
  const debounce = useCallback(
    (...args) => {
      if (ref.current.timeout) {
        clearTimeout(ref.current.timeout);
      }

      ref.current.timeout = setTimeout(() => {
        ref.current.timeout = undefined;

        const id = ref.current.id + 1;
        ref.current.id = id;

        // Check if it's the latest id
        const checkLatest = () => id === ref.current.id;

        if (checkLatest()) {
          ref.current.func(...args);
        } else {
          console.error('Function in debounced could not be executed!');
        }
      }, delay);
    },
    [delay]
  );

  return debounce;
}
