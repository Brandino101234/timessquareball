import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { countdownState, newYearInstant } from '../src/scripts/countdown.ts';

test('midnight in New York is 05:00 UTC on January 1', () => {
  assert.equal(newYearInstant(2027).toISOString(), '2027-01-01T05:00:00.000Z');
});

test('counts down to next New Year from October', () => {
  const s = countdownState(new Date('2026-10-21T21:19:24Z'));
  assert.equal(s.kind, 'counting');
  if (s.kind !== 'counting') return;
  assert.equal(s.targetYear, 2027);
  assert.equal(s.days, 71);
});

test('one second before midnight ET', () => {
  const s = countdownState(new Date('2027-01-01T04:59:59Z'));
  assert.deepEqual(
    s.kind === 'counting' && [s.targetYear, s.days, s.hours, s.minutes, s.seconds],
    [2027, 0, 0, 0, 1],
  );
});

test('a visitor in Tokyo (UTC+9) on Jan 1 local time still counts down to New York midnight', () => {
  // 2027-01-01 10:00 in Tokyo = 2027-01-01 01:00 UTC = Dec 31 20:00 in New York
  const s = countdownState(new Date('2027-01-01T01:00:00Z'));
  assert.equal(s.kind, 'counting');
  if (s.kind === 'counting') assert.deepEqual([s.targetYear, s.hours], [2027, 4]);
});

test('celebrates at midnight and for 24 hours after', () => {
  assert.deepEqual(countdownState(new Date('2027-01-01T05:00:00Z')), { kind: 'celebrating', year: 2027 });
  assert.deepEqual(countdownState(new Date('2027-01-02T04:59:59Z')), { kind: 'celebrating', year: 2027 });
});

test('after the celebration, counts down to the following year', () => {
  const s = countdownState(new Date('2027-01-02T05:00:00Z'));
  assert.equal(s.kind === 'counting' && s.targetYear, 2028);
});
