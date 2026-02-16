import { useEffect } from 'react';
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

export const HomeB = () => {
    useEffect(() => {
        const metaId = 'robots-noindex-home-b';
        let meta = document.getElementById(metaId);

        if (!meta) {
            meta = document.createElement('meta');
            meta.id = metaId;
            meta.name = 'robots';
            meta.content = 'noindex';
            document.head.appendChild(meta);
        }

        return () => {
            const existingMeta = document.getElementById(metaId);
            if (existingMeta) {
                document.head.removeChild(existingMeta);
            }
        };
    }, []);

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
