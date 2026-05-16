import { useEffect } from 'react';

interface SchemaMarkupProps {
    schema: Record<string, any>;
}

export const SchemaMarkup = ({ schema }: SchemaMarkupProps) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schema);
        
        document.head.appendChild(script);

        return () => {
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
        };
    }, [schema]);

    return null;
};
