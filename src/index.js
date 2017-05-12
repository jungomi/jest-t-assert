export const t = {
  pass: () => expect(true).toBe(true),
  fail: () => {
    throw new Error('Test failed via `t.fail()`');
  },
  true: actual => expect(actual).toBe(true),
  false: actual => expect(actual).toBe(false),
  truthy: actual => expect(actual).toBeTruthy(),
  falsy: actual => expect(actual).toBeFalsy(),
  is: (actual, expected) => expect(actual).toBe(expected),
  not: (actual, expected) => expect(actual).not.toBe(expected),
  deepEqual: (actual, expected) => expect(actual).toEqual(expected),
  notDeepEqual: (actual, expected) => expect(actual).not.toEqual(expected),
  throws: (actual, error) => expect(actual).toThrow(error),
  notThrows: actual => expect(actual).not.toThrow(),
  regex: (actual, regex) => expect(actual).toMatch(regex),
  notRegex: (actual, regex) => expect(actual).not.toMatch(regex),
  plan: count => expect.assertions(count),
  snapshot: actual => expect(actual).toMatchSnapshot()
};

function testArgs(args) {
  if (typeof args[0] === 'function') {
    return { fn: args[0] };
  }

  return {
    message: args[0],
    fn: args[1]
  };
}

function runTest(testFn, args) {
  const { message, fn } = testArgs(args);
  if (typeof fn === 'function') {
    testFn(message, () => fn(t));
  } else {
    testFn(message, () => {
      throw new TypeError(`Expected a function - got ${typeof fn}`);
    });
  }
}

function runTestWithCallback(testFn, args) {
  const { message, fn } = testArgs(args);
  if (typeof fn === 'function') {
    testFn(message, done => fn(Object.assign({ end: done }, t)));
  } else {
    testFn(message, () => {
      throw new TypeError(`Expected a function - got ${typeof fn}`);
    });
  }
}

function tTest(...args) {
  runTest(test, args);
}

function testCb(...args) {
  runTestWithCallback(test, args);
}

function testOnly(...args) {
  runTest(test.only, args);
}

function testCbOnly(...args) {
  runTestWithCallback(test.only, args);
}

tTest.cb = testCb;
tTest.only = testOnly;
tTest.cb.only = testCbOnly;
tTest.only.cb = testCbOnly;

export default tTest;
