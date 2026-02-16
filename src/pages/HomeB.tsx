import { useEffect } from 'react';
import { HeroB } from '../components/HeroB';
import { SEOSections } from '../components/SEOSections';
import { SecondEmailCapture } from '../components/SecondEmailCapture';
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
            <HeroB />
            <SEOSections />
            <SecondEmailCapture />
            <ContactUs />
        </>
    );
};
