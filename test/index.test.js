import tTest, { t } from '../src';

tTest('all assertions are successful with t as callback', t => {
  const obj = { start: 'abc', end: 'xyz' };
  t.pass();
  expect(() => t.fail()).toThrow(/t\.fail/);
  t.true(true);
  t.false(false);
  t.truthy(obj);
  t.falsy(0);
  t.is(obj.start, 'abc');
  t.not(obj.start, 'xyz');
  t.deepEqual(obj, { start: 'abc', end: 'xyz' });
  t.notDeepEqual(obj, { start: 'abc', middle: 'lmn' });
  t.throws(() => {
    throw new Error('This function throws');
  });
  t.notThrows(() => {});
  t.regex(obj.start, /bc$/);
  t.notRegex(obj.start, /^bc$/);
  t.snapshot(obj);
  t.plan(15);
});

test('all assertions are successful with the imported t', () => {
  const obj = { start: 'abc', end: 'xyz' };
  t.pass();
  expect(() => t.fail()).toThrow(/t\.fail/);
  t.true(true);
  t.false(false);
  t.truthy(obj);
  t.falsy(0);
  t.is(obj.start, 'abc');
  t.not(obj.start, 'xyz');
  t.deepEqual(obj, { start: 'abc', end: 'xyz' });
  t.notDeepEqual(obj, { start: 'abc', middle: 'lmn' });
  t.throws(() => {
    throw new Error('This function throws');
  });
  t.notThrows(() => {});
  t.regex(obj.start, /bc$/);
  t.notRegex(obj.start, /^bc$/);
  t.snapshot(obj);
  t.plan(15);
});

function delayedMessage(msg, ms) {
  return new Promise(resolve => setTimeout(() => resolve(msg), ms));
}

tTest('returning a promise is handled correctly', t => {
  t.plan(1);
  return delayedMessage('hello', 500).then(t.snapshot);
});

tTest('async/await works correctly', async t => {
  t.plan(1);
  const msg = await delayedMessage('hello', 500);
  t.snapshot(msg);
});
