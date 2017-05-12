import test from '../src';

test.only('only this test is executed', t => {
  t.plan(1);
  t.pass();
});

test('not executed', t => {
  t.fail();
});
