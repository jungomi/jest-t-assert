import test from '../src';

let count = -1;
let message = '!';

test.before.cb(t => {
  t.is(count, -1);
  t.is(message, '!');
  count = 0;
  message = 'hello';
  t.end();
});

test.beforeEach.cb(t => {
  if (count === 0) {
    t.is(message, 'hello');
  }
  count += 1;
  t.end();
});

test.after.cb(t => {
  t.is(count, 3);
  t.is(message, 'hello!!!');
  t.end();
});

test.afterEach.cb(t => {
  message += '!';
  t.end();
});

test('cb and hooks can be chained', t => {
  t.true(count > 0);
  t.regex(message, /hello/);
});

test('2', t => {
  t.true(count > 0);
  t.regex(message, /hello/);
});

test('3', t => {
  t.true(count > 0);
  t.regex(message, /hello/);
});
