import type { PortableTextBlock } from '@portabletext/react';

export type SanityImage = {
  _type?: 'image';
  asset?: { _ref?: string; _type?: 'reference' };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string;
};

export type CtaButton = {
  label?: string;
  url?: string;
  external?: boolean;
};

export type LinkItem = {
  label?: string;
  url?: string;
  external?: boolean;
};

export type SocialLink = {
  platform?: 'instagram' | 'facebook' | 'youtube' | 'twitter' | 'whatsapp' | 'linkedin';
  url?: string;
};

export type SeoFields = {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
  canonicalUrl?: string;
  noindex?: boolean;
};

export type SiteSettings = {
  siteName?: string;
  tagline?: string;
  logo?: SanityImage;
  primaryDomain?: string;
  defaultSeo?: SeoFields;
  gtmId?: string;
  ga4Id?: string;
  adsId?: string;
  adsConversionLabel?: string;
};

export type NavbarDoc = {
  logoText?: string;
  logoImage?: SanityImage;
  links?: LinkItem[];
  ctaButton?: CtaButton;
};

export type HeroDoc = {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  backgroundImage?: SanityImage;
  primaryCta?: CtaButton;
  secondaryCta?: CtaButton;
  trustBadges?: string[];
};

export type ValuePropItem = { icon?: string; title?: string; body?: string };
export type ValuePropsDoc = {
  heading?: string;
  subheading?: string;
  items?: ValuePropItem[];
};

export type WhyChooseUsBenefit = { title?: string; body?: string };
export type WhyChooseUsDoc = {
  heading?: string;
  subheading?: string;
  image?: SanityImage;
  benefits?: WhyChooseUsBenefit[];
};

export type FeaturedCard = {
  image?: SanityImage;
  title?: string;
  body?: string;
  link?: CtaButton;
};
export type FeaturedContentDoc = {
  heading?: string;
  subheading?: string;
  cards?: FeaturedCard[];
};

export type FaqItem = { question?: string; answer?: PortableTextBlock[] };
export type FaqDoc = {
  heading?: string;
  subheading?: string;
  items?: FaqItem[];
};

export type LeadCaptureField = {
  name?: string;
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'tel';
  required?: boolean;
};
export type LeadCaptureDoc = {
  heading?: string;
  subheading?: string;
  buttonLabel?: string;
  successMessage?: string;
  source?: string;
  netlifyFormName?: string;
  fields?: LeadCaptureField[];
};

export type FooterColumn = { heading?: string; links?: LinkItem[] };
export type FooterDoc = {
  logoText?: string;
  tagline?: string;
  columns?: FooterColumn[];
  socialLinks?: SocialLink[];
  copyright?: string;
};

export type ThankYouPageDoc = {
  heading?: string;
  subheading?: string;
  pdfUrl?: string;
  pdfDownloadLabel?: string;
  nextStepsHeading?: string;
  nextStepsBody?: string;
  ctaButton?: CtaButton;
  seo?: SeoFields;
};

export type LegalPageDoc = {
  title?: string;
  slug?: { current?: string };
  lastUpdated?: string;
  body?: PortableTextBlock[];
  seo?: SeoFields;
};

export type RestaurantDoc = {
  _id?: string;
  name?: string;
  slug?: { current?: string };
  shortDescription?: string;
  heroImage?: SanityImage;
  gallery?: SanityImage[];
  cuisines?: string[];
  priceRange?: 'budget' | 'mid' | 'premium';
  location?: string;
  address?: string;
  googleMapsUrl?: string;
  mustTry?: string[];
  body?: PortableTextBlock[];
  seo?: SeoFields;
};

export type BlogPostDoc = {
  _id?: string;
  title?: string;
  slug?: { current?: string };
  excerpt?: string;
  coverImage?: SanityImage;
  publishedAt?: string;
  tags?: string[];
  body?: PortableTextBlock[];
  seo?: SeoFields;
};
