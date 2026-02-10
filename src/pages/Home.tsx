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

export const Home = () => {
    return (
        <>
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
