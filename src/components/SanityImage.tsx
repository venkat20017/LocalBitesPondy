import type { ImgHTMLAttributes } from 'react';
import { urlFor } from '../lib/sanity';
import type { SanityImage as SanityImageType } from '../types/sanity';

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  image?: SanityImageType | null;
  fallbackSrc?: string;
  width?: number;
  height?: number;
};

export function SanityImage({
  image,
  fallbackSrc,
  width = 1200,
  height,
  alt = '',
  loading = 'lazy',
  className,
  ...rest
}: Props) {
  let src = fallbackSrc;
  if (image?.asset?._ref) {
    let builder = urlFor(image).width(width).auto('format').fit('max');
    if (height) builder = builder.height(height);
    src = builder.url();
  }

  if (!src) return null;

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      className={className}
      {...rest}
    />
  );
}
