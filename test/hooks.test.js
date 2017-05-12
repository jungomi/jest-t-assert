import test from '../src';

let count = -1;
let message = '!';

test.before(t => {
  t.is(count, -1);
  t.is(message, '!');
  count = 0;
  message = 'hello';
});

test.beforeEach(t => {
  if (count === 0) {
    t.is(message, 'hello');
  }
  count += 1;
});

test.after(t => {
  t.is(count, 3);
  t.is(message, 'hello!!!');
});

test.afterEach(() => {
  message += '!';
});

test('1', t => {
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
