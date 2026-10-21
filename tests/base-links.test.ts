import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { prefixRootLinks } from '../src/integrations/base-links.ts';

const base = '/timessquareball/';

test('prefixes root-relative links', () => {
  assert.equal(prefixRootLinks('<a href="/ball-facts">', base), '<a href="/timessquareball/ball-facts">');
  assert.equal(prefixRootLinks('<a href="/">', base), '<a href="/timessquareball/">');
  assert.equal(prefixRootLinks('<a data-original="/x.jpg">', base), '<a data-original="/timessquareball/x.jpg">');
});

test('leaves absolute, protocol-relative, anchor and already-prefixed links alone', () => {
  for (const html of [
    '<a href="https://x.com/a">',
    '<script src="//cdn.example.com/a.js">',
    '<a href="#main">',
    '<img src="/timessquareball/_astro/a.webp">',
    '<a href="/timessquareball">',
  ]) {
    assert.equal(prefixRootLinks(html, base), html);
  }
});

test('does not touch paths that only start with the folder name', () => {
  assert.equal(prefixRootLinks('<a href="/timessquareball-old">', base), '<a href="/timessquareball/timessquareball-old">');
});
