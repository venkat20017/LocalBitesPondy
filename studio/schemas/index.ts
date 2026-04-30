// Reusable objects
import seoFields from './objects/seoFields';
import ctaButton from './objects/ctaButton';
import linkItem from './objects/linkItem';
import socialLink from './objects/socialLink';

// Singletons (one document per type)
import siteSettings from './singletons/siteSettings';
import navbar from './singletons/navbar';
import hero from './singletons/hero';
import valueProps from './singletons/valueProps';
import whyChooseUs from './singletons/whyChooseUs';
import featuredContent from './singletons/featuredContent';
import faq from './singletons/faq';
import leadCapture from './singletons/leadCapture';
import contactForm from './singletons/contactForm';
import footer from './singletons/footer';
import thankYouPage from './singletons/thankYouPage';
import aboutUs from './singletons/aboutUs';

// Collections
import legalPage from './documents/legalPage';
import restaurant from './documents/restaurant';
import blogPost from './documents/blogPost';

export const schemaTypes = [
  // Objects
  seoFields,
  ctaButton,
  linkItem,
  socialLink,
  // Singletons
  siteSettings,
  navbar,
  hero,
  valueProps,
  whyChooseUs,
  featuredContent,
  faq,
  leadCapture,
  contactForm,
  footer,
  thankYouPage,
  aboutUs,
  // Collections
  legalPage,
  restaurant,
  blogPost,
];
