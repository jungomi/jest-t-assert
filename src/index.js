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

function runHook(hookFn, fn) {
  hookFn(() => fn(t));
}

function runHookWithCallback(hookFn, fn) {
  hookFn(done => fn(Object.assign({ end: done }, t)));
}

function tTest(...args) {
  runTest(test, args);
}

tTest.cb = (...args) => runTestWithCallback(test, args);
tTest.only = (...args) => runTest(test.only, args);
tTest.only.cb = (...args) => runTestWithCallback(test.only, args);
tTest.cb.only = tTest.only.cb;
tTest.skip = (...args) => runTest(test.skip, args);
tTest.skip.cb = (...args) => runTestWithCallback(test.skip, args);
tTest.cb.skip = tTest.skip.cb;
tTest.after = fn => runHook(afterAll, fn);
tTest.after.cb = fn => runHookWithCallback(afterAll, fn);
tTest.cb.after = tTest.after.cb;
tTest.afterEach = fn => runHook(afterEach, fn);
tTest.afterEach.cb = fn => runHookWithCallback(afterEach, fn);
tTest.cb.afterEach = tTest.afterEach.cb;
tTest.before = fn => runHook(beforeAll, fn);
tTest.before.cb = fn => runHookWithCallback(beforeAll, fn);
tTest.cb.before = tTest.before.cb;
tTest.beforeEach = fn => runHook(beforeEach, fn);
tTest.beforeEach.cb = fn => runHookWithCallback(beforeEach, fn);
tTest.cb.beforeEach = tTest.beforeEach.cb;

export default tTest;
