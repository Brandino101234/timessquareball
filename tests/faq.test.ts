import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { faqItems, answerHtml, answerText } from '../src/scripts/faq.ts';

const md = `Intro line.\n\n## First?\n\nAnswer with a [link](/x).\n\n## Second?\n\nTwo <b>paragraphs</b>.\n\nSecond **one**.\n`;

test('splits questions and answers', () => {
  const items = faqItems(md);
  assert.deepEqual(items.map((i) => i.question), ['First?', 'Second?']);
  assert.equal(items[0].answer, 'Answer with a [link](/x).');
});

test('renders links and bold, and escapes HTML', () => {
  assert.equal(answerHtml('Answer with a [link](/x).'), '<p>Answer with a <a href="/x">link</a>.</p>');
  assert.equal(answerHtml('Two <b>paragraphs</b>.\n\nSecond **one**.'), '<p>Two &lt;b&gt;paragraphs&lt;/b&gt;.</p><p>Second <strong>one</strong>.</p>');
});

test('plain text drops link syntax', () => {
  assert.equal(answerText('See [the facts](/ball-facts).'), 'See the facts.');
});
