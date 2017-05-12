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

export default (...args) => {
  let message;
  let fn;

  if (typeof args[0] === 'function') {
    fn = args[0];
  } else {
    message = args[0];
    fn = args[1];
  }

  if (typeof fn === 'function') {
    test(message, () => fn(t));
  } else {
    test(message, () => {
      throw new TypeError(`Expected a function - got ${typeof fn}`);
    });
  }
};
