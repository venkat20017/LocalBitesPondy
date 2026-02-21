import { Hero } from '../components/Hero';
import { WhyGuide } from '../components/WhyGuide';
import { ValueProps } from '../components/ValueProps';
import { CategoryPreview } from '../components/CategoryPreview';
import { FoodChecklist } from '../components/FoodChecklist';
import { SocialProof } from '../components/SocialProof';
import { SecondEmailCapture } from '../components/SecondEmailCapture';
import { BestHotels } from '../components/BestHotels';
import { BestBiriyani } from '../components/BestBiriyani';
import { ContactUs } from '../components/ContactUs';
import { MetaTags } from '../components/MetaTags';

export const Home = () => {
    return (
        <>
            <MetaTags
                title="Famous Food in Pondicherry: Local's Guide 2026"
                description="Craving famous food in Pondicherry? Get our free guide to 15 authentic local eateries tourists miss. French-Tamil fusion, street food & seafood spots with exact locations."
                canonical="https://localbitespondy.netlify.app/"
            />
            <Hero />
            <CategoryPreview />
            <BestBiriyani />
            <BestHotels />
            <WhyGuide />
            <ValueProps />
            <FoodChecklist />
            <SocialProof />
            <SecondEmailCapture />
            <ContactUs />
        </>
    );
};
