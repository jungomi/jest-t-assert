import test from '../src';

test.only.cb('cb can be chained after only', t => {
  t.plan(1);
  t.pass();
  t.end();
});

test('not executed', t => {
  t.fail();
});
