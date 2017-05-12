import test from '../src';

test.cb.only('cb and only can be chained', t => {
  t.plan(1);
  t.pass();
  t.end();
});

test('not executed', t => {
  t.fail();
});
