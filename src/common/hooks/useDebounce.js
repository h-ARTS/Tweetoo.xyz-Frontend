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

  // use latest function that's passed
  ref.current.func = func;

  const debounce = useCallback(
    (...args) => {
      ref.current.promise = new Promise((resolve, reject) => {
        // Keep track of resolve and reject
        ref.current.resolve = resolve;
        ref.current.reject = reject;
      });

      if (ref.current.timeout) {
        clearTimeout(ref.current.timeout);
      }

      ref.current.timeout = setTimeout(async () => {
        ref.current.timeout = undefined;

        const id = ref.current.id + 1;
        ref.current.id = id;

        // Make a checkLatest function
        const checkLatest = () => id === ref.current.id;

        if (checkLatest()) {
          ref.current.resolve(ref.current.func(...args));
        } else {
          ref.current.reject('Function could not be executed');
        }
      }, delay);

      return ref.current.promise;
    },
    [delay]
  );

  return debounce;
}
