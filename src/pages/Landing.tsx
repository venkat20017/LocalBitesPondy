import { Hero } from '../components/Hero';
import { ValueProps } from '../components/ValueProps';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { FeaturedContent } from '../components/FeaturedContent';
import { FAQ } from '../components/FAQ';
import { LeadCTA } from '../components/LeadCTA';
import { PageSEO } from '../components/PageSEO';
import { useSanityDoc } from '../hooks/useSanityDoc';
import type { FaqDoc, SiteSettings } from '../types/sanity';
import { faqJsonLd, organizationJsonLd, websiteJsonLd } from '../lib/jsonLd';
import { imageToOgUrl } from '../lib/sanity';

export default function Landing() {
  const { data: faq } = useSanityDoc<FaqDoc>('faq', { items: [] });
  const { data: site } = useSanityDoc<SiteSettings>('siteSettings', {});

  const title = site.defaultSeo?.metaTitle ?? 'Famous Food in Pondicherry — The Local Guide';
  const description =
    site.defaultSeo?.metaDescription ??
    "The local food guide tourists never find. Hand-picked restaurants, French heritage cafés, and street food spots in Pondicherry — with Google Maps links to every place.";

  const lds = [websiteJsonLd(site.siteName), organizationJsonLd(site.siteName), faqJsonLd(faq)].filter(
    Boolean,
  ) as object[];

  return (
    <>
      <PageSEO
        title={title}
        description={description}
        canonicalPath="/"
        ogImage={imageToOgUrl(site.defaultSeo?.ogImage)}
        siteName={site.siteName ?? 'LocalBitesPondy'}
        jsonLd={lds}
      />
      <main>
        <Hero />
        <ValueProps />
        <WhyChooseUs />
        <FeaturedContent />
        <FAQ />
        <LeadCTA />
      </main>
    </>
  );
}
