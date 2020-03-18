const functions = new Set();

const useFunctionCalls = fns => {
  fns.forEach(fn => {
    functions.add(fn);
  });
  const fnCounts = functions.size;
  const fnsCreated = functions;
  if (fnCounts > 2) {
    console.log(
      `%c🔥 WARNING! Too many functions created: ${fnCounts}`,
      'color: black; background-color: pink; border-radius:5px; padding: 2.5px;'
    );
  } else {
    console.log('Functions created: ', fnsCreated);
  }

  return [fnCounts, fnsCreated];
};

export default useFunctionCalls;
