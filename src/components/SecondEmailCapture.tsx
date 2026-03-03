import { useState, type FormEvent } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { saveLeadToSheets } from '../services/googleSheets';
import { trackConversion } from '../services/analytics';

export const SecondEmailCapture = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes('@')) {
            alert('Please enter a valid email address.');
            return;
        }

        setIsSubmitting(true);

        try {
            await saveLeadToSheets({ email, source: 'footer_signup' });
            trackConversion('footer_signup');
            // Automatically open PDF in a new tab
            window.open('/famous-food-in-pondicherry.pdf', '_blank');
            navigate('/thank-you');
        } catch (error) {
            console.error('Submission failed', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="bg-orange-600 py-20 px-4 text-center">
            <div className="mx-auto max-w-2xl">
                <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Ready to Eat Like a Local?</h2>
                <p className="mb-10 text-lg text-orange-100">Download your free guide in 30 seconds</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:justify-center mb-8">
                    <input
                        type="email"
                        required
                        className="w-full rounded-lg border-0 bg-white px-5 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white outline-none sm:max-w-xs "
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubmitting}
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex w-full items-center justify-center rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white shadow-lg hover:bg-gray-800 transition-all sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Sending...' : 'Get My Free Guide'}
                        {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                    </button>
                </form>

                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-orange-100 font-medium">
                    <div className="flex items-center">
                        <Check className="h-4 w-4 text-white mr-2" />
                        No credit card required
                    </div>
                    <div className="flex items-center">
                        <Check className="h-4 w-4 text-white mr-2" />
                        Unsubscribe anytime
                    </div>
                    <div className="flex items-center">
                        <Check className="h-4 w-4 text-white mr-2" />
                        2,500+ downloads
                    </div>
                </div>
            </div>
        </section>
    );
};
