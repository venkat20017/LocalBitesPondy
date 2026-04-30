// Seed all Sanity schemas with sample content so editors have a clear
// structure to work from. Re-runnable: every doc uses createOrReplace
// so this is idempotent (running twice doesn't duplicate).
//
// USAGE
//   1. Generate a write token at https://sanity.io/manage → project
//      4mclrukh → API → Tokens → "Add API token", scope: Editor.
//   2. Add to .env (NOT committed — already gitignored is recommended,
//      though .env is currently tracked):
//        SANITY_AUTH_TOKEN=sk...
//   3. Run:  node scripts/seed-sanity.mjs
//
// The script seeds:
//   - 12 singletons (siteSettings, navbar, hero, valueProps, whyChooseUs,
//     featuredContent, faq, leadCapture, contactForm, footer,
//     thankYouPage, aboutUs)
//   - 2 legal pages (privacy-policy, terms-of-use)
//   - 3 sample restaurants
//   - 3 sample blog posts
//
// Re-running OVERWRITES the documents with the seed defaults, so don't
// run after editors have customized content unless you want to reset.

import { createClient } from '@sanity/client';
import { randomUUID } from 'node:crypto';

const projectId = process.env.VITE_SANITY_PROJECT_ID || '4mclrukh';
const dataset = process.env.VITE_SANITY_DATASET || 'production';
const apiVersion = process.env.VITE_SANITY_API_VERSION || '2025-04-28';
const token = process.env.SANITY_AUTH_TOKEN;

if (!token) {
  console.error(
    'Missing SANITY_AUTH_TOKEN. Generate a write token at\n' +
    '  https://sanity.io/manage → project ' + projectId + ' → API → Tokens\n' +
    'and add it to .env as SANITY_AUTH_TOKEN=sk...',
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

/* ----------------------------- Helpers ----------------------------------- */

const k = () => randomUUID().slice(0, 8);

/** Build a Portable Text block from plain text. */
function block(text, style = 'normal') {
  return {
    _type: 'block',
    _key: k(),
    style,
    markDefs: [],
    children: [{ _type: 'span', text, marks: [], _key: k() }],
  };
}

function bullets(items) {
  return items.map((t) => ({
    _type: 'block',
    _key: k(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    markDefs: [],
    children: [{ _type: 'span', text: t, marks: [], _key: k() }],
  }));
}

/* ----------------------------- Singletons -------------------------------- */

const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  siteName: 'LocalBitesPondy',
  tagline: 'The local food guide tourists never find',
  primaryDomain: 'https://localbitespondy.com',
  defaultSeo: {
    metaTitle: 'Famous Food in Pondicherry — LocalBitesPondy',
    metaDescription:
      'Hand-picked restaurants, French heritage cafés, and street food spots in Pondicherry — locally vetted with Google Maps links.',
  },
  gtmId: 'GTM-PSSSM8R6',
  ga4Id: 'G-7K5JPSBRQ2',
  adsId: 'AW-17775750153',
  adsConversionLabel: 'AW-17775750153/2dW3CNjE9eEbEInYkZxC',
};

const navbar = {
  _id: 'navbar',
  _type: 'navbar',
  logoText: 'LocalBitesPondy',
  links: [
    { _key: k(), label: 'Restaurants', url: '/restaurants', external: false },
    { _key: k(), label: 'Blog', url: '/blog', external: false },
    { _key: k(), label: 'About', url: '/about-us', external: false },
    { _key: k(), label: 'Contact', url: '/#contact', external: false },
  ],
  ctaButton: { label: 'Get the Free Guide', url: '#lead', external: false },
};

const hero = {
  _id: 'hero',
  _type: 'hero',
  eyebrow: 'The local food guide tourists never find',
  heading: "Discover Pondicherry's best-kept food secrets",
  subheading:
    'Hand-picked restaurants, French heritage cafés, and street food spots — written by locals, with Google Maps links to every place.',
  primaryCta: { label: 'Get the Free Guide', url: '#lead', external: false },
  secondaryCta: { label: 'Browse Restaurants', url: '/restaurants', external: false },
  trustBadges: ['15 hand-picked spots', 'Updated weekly', 'Free, no signup tricks'],
};

const valueProps = {
  _id: 'valueProps',
  _type: 'valueProps',
  heading: 'Why food lovers in Pondicherry trust this guide',
  subheading: 'Skip the tourist traps. Eat where locals eat — every spot vetted, mapped, and tasted.',
  items: [
    { _key: k(), icon: 'MapPin', title: 'Hand-picked by locals', body: 'Every spot is personally visited and vetted by long-time Pondicherry residents — no paid placements, no algorithms.' },
    { _key: k(), icon: 'Compass', title: 'Real Google Maps links', body: 'No vague "near the beach" directions. Tap, drive, eat. Each restaurant comes with the exact map pin.' },
    { _key: k(), icon: 'Coffee', title: 'French heritage to street food', body: 'From 100-year-old boulangeries to 5am breakfast carts — the full range of what makes Pondy food unique.' },
    { _key: k(), icon: 'Clock', title: 'Updated every week', body: 'New openings, closures, and tasting notes added regularly. We delete what no longer deserves the list.' },
  ],
};

const whyChooseUs = {
  _id: 'whyChooseUs',
  _type: 'whyChooseUs',
  heading: 'Built for travellers and locals — not for ad revenue',
  subheading: "We don't take payments from restaurants. We don't run ads. The only goal is to put you in front of food worth driving across Pondicherry for.",
  benefits: [
    { _key: k(), title: 'Zero pay-to-play listings', body: 'No restaurant has ever paid to be featured. Every recommendation passes a personal taste test.' },
    { _key: k(), title: 'Local Tamil + French + Creole expertise', body: 'Our team grew up eating here. We know which kuzhipaniyaram is worth the wait and which croissant is from frozen dough.' },
    { _key: k(), title: 'Honest dish-level recommendations', body: 'We tell you exactly what to order — and which best-sellers to skip — at each restaurant.' },
    { _key: k(), title: 'Mobile-first directions', body: 'Every entry has a working Google Maps link. No copying addresses or asking three rickshaw drivers.' },
  ],
};

const featuredContent = {
  _id: 'featuredContent',
  _type: 'featuredContent',
  heading: 'A food guide for every kind of hunger',
  subheading: "Whether you have one morning or one week — we'll send you to the right table.",
  cards: [
    { _key: k(), title: 'French Heritage Cafés', body: '100-year-old boulangeries, slow-pour espresso, and the croissants worth queuing for.', link: { label: 'Browse cafés', url: '/restaurants', external: false } },
    { _key: k(), title: 'Tamil Breakfast Spots', body: 'Idiyappam, paniyaram, soft idlis — where locals actually eat at 6am.', link: { label: 'Browse breakfasts', url: '/restaurants', external: false } },
    { _key: k(), title: 'Beach & Sunset Dining', body: "Seaside tables that don't cost ₹3000 a head — fresh seafood, real prices.", link: { label: 'Browse seaside', url: '/restaurants', external: false } },
  ],
};

const faq = {
  _id: 'faq',
  _type: 'faq',
  heading: 'Frequently asked questions',
  subheading: 'Everything tourists email us about — answered.',
  items: [
    { _key: k(), question: 'Is the guide really free?', answer: [block('Yes. We send the full PDF to your email after a single form. No paywalls, no upsell.')] },
    { _key: k(), question: 'How is this different from TripAdvisor or Google Maps?', answer: [block('TripAdvisor and Google reflect tourist behaviour — long queues at average places. We list where Pondicherry residents actually eat, ranked by food quality, not foot traffic.')] },
    { _key: k(), question: 'How often is it updated?', answer: [block('Every week. We add new openings, remove closures, and re-test established spots quarterly. The PDF you download is always the latest version.')] },
    { _key: k(), question: 'Does it work offline / on mobile?', answer: [block('Yes — the guide is a downloadable PDF you can keep on your phone. Each restaurant has a Google Maps link that works the second you have signal again.')] },
  ],
};

const leadCapture = {
  _id: 'leadCapture',
  _type: 'leadCapture',
  heading: 'Get the Free Pondicherry Food Guide',
  subheading: '15 hand-picked spots · Google Maps links · What to order',
  buttonLabel: 'Send me the guide',
  successMessage: "You're on the list — your guide is downloading.",
  source: 'landing_modal',
  netlifyFormName: 'lead-capture',
  fields: [
    { _key: k(), name: 'name', label: 'Your name (optional)', placeholder: 'Your name', type: 'text', required: false },
    { _key: k(), name: 'email', label: 'Email address', placeholder: 'you@example.com', type: 'email', required: true },
  ],
};

const contactForm = {
  _id: 'contactForm',
  _type: 'contactForm',
  heading: 'Get in touch',
  subheading: 'Restaurant recommendations, content corrections, partnerships — drop us a line and we reply within 24-48 hours.',
  buttonLabel: 'Send message',
  successMessage: "Thanks — we'll reply within 24-48 hours.",
  fields: [
    { _key: k(), name: 'name', label: 'Your name', placeholder: 'Full name', required: true },
    { _key: k(), name: 'email', label: 'Email', placeholder: 'you@example.com', required: true },
    { _key: k(), name: 'phone', label: 'Phone (optional)', placeholder: '+91 ...', required: false },
    { _key: k(), name: 'message', label: 'Message', placeholder: 'How can we help?', required: true },
  ],
};

const footer = {
  _id: 'footer',
  _type: 'footer',
  logoText: 'LocalBitesPondy',
  tagline: 'The local food guide tourists never find.',
  columns: [
    { _key: k(), heading: 'Explore', links: [
      { _key: k(), label: 'Restaurants', url: '/restaurants' },
      { _key: k(), label: 'Blog', url: '/blog' },
      { _key: k(), label: 'FAQ', url: '/#faq' },
    ] },
    { _key: k(), heading: 'Company', links: [
      { _key: k(), label: 'About us', url: '/about-us' },
      { _key: k(), label: 'Contact', url: '/#contact' },
      { _key: k(), label: 'Privacy Policy', url: '/privacy-policy' },
      { _key: k(), label: 'Terms of Use', url: '/terms-of-use' },
    ] },
    { _key: k(), heading: 'Get the guide', links: [
      { _key: k(), label: 'Free PDF download', url: '#lead' },
    ] },
  ],
  socialLinks: [
    { _key: k(), platform: 'instagram', url: 'https://instagram.com/localbitespondy' },
  ],
  copyright: '© {year} LocalBitesPondy. All rights reserved.',
};

const thankYouPage = {
  _id: 'thankYouPage',
  _type: 'thankYouPage',
  heading: "You're all set",
  subheading: 'Your Pondicherry food guide is ready. Tap the button below if the download did not start automatically.',
  pdfUrl: '/famous-food-in-pondicherry.pdf',
  pdfDownloadLabel: "Download didn't start?",
  nextStepsHeading: 'What happens next',
  nextStepsBody: "We'll send a short follow-up email with our top picks, plus updates whenever we add new spots. Keep an eye on your inbox (and spam folder, just in case).",
  ctaButton: { label: 'Browse restaurants', url: '/restaurants', external: false },
};

const aboutUs = {
  _id: 'aboutUs',
  _type: 'aboutUs',
  heading: 'About LocalBitesPondy',
  subheading: 'A food guide built by Pondicherry locals, for everyone tired of TripAdvisor.',
  mission: "We exist to put you in front of food worth driving across town for. No paid placements, no sponsored content, no SEO-spam listicles. Just a small team of locals tasting and writing.",
  body: [
    block('How this started', 'h2'),
    block("LocalBitesPondy began as a Google Doc shared between three friends in 2022. Tourists kept asking us 'where should we eat?' and the existing review sites kept pointing them to the wrong places — places that were great for Instagram and bad for actually eating."),
    block("So we started writing it down. Every spot we'd take a visiting friend to. Every dish worth ordering. Every place we'd warn people away from. Three years later it's a full guide, still hand-curated, still free."),
    block('How we choose what to feature', 'h2'),
    ...bullets([
      'Personal visit + paid meal — we never accept comps from restaurants.',
      'At least 3 visits across the year before we publish.',
      'Specific dish recommendations — not vague stars or scores.',
      'Re-tested every quarter; closures and decline are removed promptly.',
    ]),
  ],
  team: [
    { _key: k(), name: 'Venkatesh Prasad', role: 'Founder & lead reviewer', bio: 'Pondicherry resident since 2009. Eats out four nights a week, never takes free meals from restaurants.' },
  ],
};

/* ----------------------------- Collections ------------------------------- */

const legalPages = [
  {
    _id: 'legalPage.privacy-policy',
    _type: 'legalPage',
    title: 'Privacy Policy',
    slug: { _type: 'slug', current: 'privacy-policy' },
    lastUpdated: new Date().toISOString(),
    body: [
      block('What we collect', 'h2'),
      block('When you submit our lead form or contact form, we collect your name, email, phone (if provided), and message. That data goes into a Google Sheet and triggers an automated email confirmation. We do not sell, trade, or share this data with third parties.'),
      block('Cookies and analytics', 'h2'),
      block('We use Google Analytics 4 and Google Ads with Consent Mode v2. Cookies are denied by default until you accept them via the consent banner at the bottom of the page.'),
      block('Your rights', 'h2'),
      block('You can request deletion of your data at any time by emailing hello@localbitespondy.com. We will remove it from our records within 7 days.'),
    ],
  },
  {
    _id: 'legalPage.terms-of-use',
    _type: 'legalPage',
    title: 'Terms of Use',
    slug: { _type: 'slug', current: 'terms-of-use' },
    lastUpdated: new Date().toISOString(),
    body: [
      block('Use of content', 'h2'),
      block('All content on LocalBitesPondy — including restaurant reviews, photographs, and the downloadable PDF guide — is for personal, non-commercial use. You may not republish, redistribute, or use our content for paid services without written permission.'),
      block('No warranty', 'h2'),
      block('Restaurants change. Menus shift. Prices climb. We update the guide weekly but cannot guarantee every detail is current. Call ahead if it matters.'),
      block('Contact', 'h2'),
      block('Questions? Email hello@localbitespondy.com.'),
    ],
  },
];

const restaurants = [
  {
    _id: 'restaurant.baker-street',
    _type: 'restaurant',
    name: 'Baker Street',
    slug: { _type: 'slug', current: 'baker-street' },
    shortDescription: 'A French boulangerie on Bussy Street with the best almond croissant in Pondicherry, full stop.',
    cuisines: ['French', 'Bakery'],
    priceRange: 'mid',
    location: 'White Town',
    address: '123 Rue Bussy\nPondicherry 605001',
    googleMapsUrl: 'https://maps.app.goo.gl/example1',
    mustTry: ['Almond croissant', 'Pain au chocolat', 'Quiche lorraine'],
    body: [
      block('Why we keep going back', 'h2'),
      block("The almond croissant is laminated 27 times — you can count the layers. They open at 7:30am and the first batch is reliably gone by 9. Get there before 8 if you want one warm."),
      block('What to skip'),
      block("The savoury sandwiches are fine but not the reason to come. Walk five minutes to Surguru if you want lunch instead — Baker Street is for the morning."),
    ],
  },
  {
    _id: 'restaurant.surguru',
    _type: 'restaurant',
    name: 'Surguru',
    slug: { _type: 'slug', current: 'surguru' },
    shortDescription: 'A Pondicherry institution since 1968. Best Tamil thali in town, served on banana leaves.',
    cuisines: ['South Indian', 'Tamil', 'Vegetarian'],
    priceRange: 'budget',
    location: 'White Town',
    address: '99 Mission Street\nPondicherry 605001',
    googleMapsUrl: 'https://maps.app.goo.gl/example2',
    mustTry: ['South Indian thali', 'Filter coffee', 'Mysore masala dosa'],
    body: [
      block('Why we keep going back', 'h2'),
      block('₹180 thali. Banana leaf. Three sambars, four chutneys, dessert. The waiters refill you until you wave them off. We bring every visiting in-law here.'),
    ],
  },
  {
    _id: 'restaurant.le-cafe',
    _type: 'restaurant',
    name: 'Le Café',
    slug: { _type: 'slug', current: 'le-cafe' },
    shortDescription: 'On the Rock Beach promenade — sunset coffee with the Bay of Bengal at your feet.',
    cuisines: ['Café', 'French'],
    priceRange: 'mid',
    location: 'Goubert Avenue',
    address: 'Goubert Avenue (the promenade)\nPondicherry 605001',
    googleMapsUrl: 'https://maps.app.goo.gl/example3',
    mustTry: ['Cold coffee', 'French toast', 'Cinnamon roll'],
    body: [
      block('Why we keep going back', 'h2'),
      block("It's open 24 hours. The cold coffee is the right level of sweet. At sunrise the promenade fills with joggers and the place is calmer than you'd expect. Avoid weekend nights — it's chaos."),
    ],
  },
];

const blogPosts = [
  {
    _id: 'blogPost.where-locals-eat-breakfast',
    _type: 'blogPost',
    title: 'Where Pondicherry locals actually eat breakfast (it\'s not a café)',
    slug: { _type: 'slug', current: 'where-locals-eat-breakfast' },
    excerpt: 'Tourists head to French cafés. Locals head to street carts. Here are the four breakfast spots residents actually queue for.',
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['breakfast', 'tamil-food', 'street-food'],
    body: [
      block("If you're standing on Mission Street at 7am wondering where to eat, the answer is: not where the guidebook says."),
      block('Surguru', 'h2'),
      block('₹40 for two soft idlis with sambar and three chutneys. They open at 6am sharp, and by 7:30 the queue stretches outside.'),
      block('Idli Mahal', 'h2'),
      block('A 10-stool place near the bus stand. The kuzhipaniyaram (₹50 for 8 pieces) is reason enough to skip your hotel breakfast.'),
    ],
  },
  {
    _id: 'blogPost.french-cafe-myth',
    _type: 'blogPost',
    title: "The Pondicherry 'French café' scene is mostly fake — here are the real ones",
    slug: { _type: 'slug', current: 'french-cafe-myth' },
    excerpt: 'Half the cafés in White Town are using frozen dough from Bangalore. Here are the three that aren\'t.',
    publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['french-cafe', 'opinion', 'baking'],
    body: [
      block('White Town has more than 30 places calling themselves a "French café". Maybe four of them actually bake their own pastries. The rest source frozen dough from a wholesaler in Bangalore.'),
      block('How to tell the difference'),
      block("Walk in at 7:30am. If they're already fully stocked, the pastries were defrosted overnight. Real bakers are still pulling things out of the oven at that hour."),
    ],
  },
  {
    _id: 'blogPost.beach-seafood-guide',
    _type: 'blogPost',
    title: 'Beach seafood in Pondicherry: a no-rip-off guide',
    slug: { _type: 'slug', current: 'beach-seafood-guide' },
    excerpt: 'How to eat fresh fish on the Pondicherry coast without paying tourist prices. The five-rule guide.',
    publishedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['seafood', 'beach', 'budget'],
    body: [
      block("If a beach restaurant doesn't list prices on the menu, walk away. That's the rule."),
      block('Rule 2: ask the catch of the day', 'h2'),
      block("Whatever they push as the special is what's freshest — usually pomfret, sometimes mackerel. Anything frozen or imported costs three times more for half the flavour."),
    ],
  },
];

/* ----------------------------- Run --------------------------------------- */

async function upsert(doc) {
  await client.createOrReplace(doc);
  console.log('  ✓', doc._type, doc._id);
}

async function main() {
  console.log('Seeding Sanity (' + projectId + ' / ' + dataset + ')…');

  const singletons = [
    siteSettings, navbar, hero, valueProps, whyChooseUs, featuredContent,
    faq, leadCapture, contactForm, footer, thankYouPage, aboutUs,
  ];
  console.log('\nSingletons (' + singletons.length + '):');
  for (const d of singletons) await upsert(d);

  console.log('\nLegal pages (' + legalPages.length + '):');
  for (const d of legalPages) await upsert(d);

  console.log('\nRestaurants (' + restaurants.length + '):');
  for (const d of restaurants) await upsert(d);

  console.log('\nBlog posts (' + blogPosts.length + '):');
  for (const d of blogPosts) await upsert(d);

  console.log('\n✓ Done. Open https://' + projectId + '.sanity.studio (or local studio) to edit.');
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
