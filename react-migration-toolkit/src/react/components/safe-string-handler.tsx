import type { SafeString } from '@ember/template';
import { type ReactElement } from 'react';

export const isSafeString = (content: unknown): content is SafeString => {
  return (
    typeof content === 'object' &&
    content !== null && // Ensure content is not null
    'toHTML' in content &&
    typeof content.toHTML === 'function'
  );
};

/**
 * React intl doesn't support HTML content in the message props. It would require using a different system for our translations with tags
 * @deprecated This is a temporary function to translate content that is not yet translated in the new system
 * @param content - The rich content to render
 * @returns A React element with the rendered content
 */
export function mapLegacyHTMLTranslatedContent(content: unknown): unknown {
  return isSafeString(content) ? (
    <LegacyHTMLTranslatedContent content={content} />
  ) : (
    content
  );
}

export function LegacyHTMLTranslatedContent({
  content,
}: {
  content: SafeString;
}): ReactElement {
  return <div dangerouslySetInnerHTML={{ __html: content.toHTML() }} />;
}
