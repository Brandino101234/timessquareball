/**
 * Reads the FAQ Markdown (src/content/pages/faq.md): each "## " heading is a
 * question and the text under it is the answer.
 */
export interface FaqItem {
  question: string;
  /** The answer, still in Markdown. */
  answer: string;
}

export function faqItems(body: string): FaqItem[] {
  return body
    .split(/^## /m)
    .slice(1)
    .map((block) => {
      const [question, ...rest] = block.split('\n');
      return { question: question.trim(), answer: rest.join('\n').trim() };
    });
}

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Simple Markdown for short answers: paragraphs, [links](url), **bold** and *italic*. */
export function answerHtml(markdown: string): string {
  return markdown
    .split(/\n{2,}/)
    .map((para) => {
      const html = escapeHtml(para.trim())
        .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>');
      return `<p>${html}</p>`;
    })
    .join('');
}

/** Plain text (for search engines' FAQ data). */
export function answerText(markdown: string): string {
  return markdown.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`]/g, '').replace(/\s+/g, ' ').trim();
}
