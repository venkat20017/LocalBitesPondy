import { PortableText as PT, type PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/react';
import { SanityImage } from './SanityImage';

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="mt-10 text-2xl font-bold text-gray-900">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 text-xl font-semibold text-gray-900">{children}</h3>,
    h4: ({ children }) => <h4 className="mt-6 text-lg font-semibold text-gray-900">{children}</h4>,
    normal: ({ children }) => <p className="mt-4 text-base leading-relaxed text-gray-700">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-4 border-orange-500 bg-orange-50 px-5 py-3 italic text-gray-800">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">{children}</ul>,
    number: ({ children }) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-gray-700">{children}</ol>,
  },
  marks: {
    link: ({ value, children }) => {
      const href = (value as { href?: string })?.href ?? '#';
      const external = (value as { external?: boolean })?.external;
      return (
        <a
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="text-orange-600 underline hover:text-orange-700"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
  },
  types: {
    image: ({ value }) => (
      <div className="my-8 overflow-hidden rounded-2xl">
        <SanityImage image={value} className="w-full" width={1200} />
      </div>
    ),
  },
};

export function PortableText({ value }: { value?: PortableTextBlock[] }) {
  if (!value || value.length === 0) return null;
  return <PT value={value} components={components} />;
}
