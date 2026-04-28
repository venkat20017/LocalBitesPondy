import { Hero } from '../components/Hero';
import { ValueProps } from '../components/ValueProps';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { FeaturedContent } from '../components/FeaturedContent';
import { FAQ } from '../components/FAQ';
import { LeadCTA } from '../components/LeadCTA';

export default function Landing() {
  return (
    <main>
      <Hero />
      <ValueProps />
      <WhyChooseUs />
      <FeaturedContent />
      <FAQ />
      <LeadCTA />
    </main>
  );
}
