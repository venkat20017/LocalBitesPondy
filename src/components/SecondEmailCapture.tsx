import { useState, type FormEvent } from 'react';
import { ArrowRight, Check, CheckCircle2 } from 'lucide-react';
import { saveLeadToSheets } from '../services/googleSheets';
import { trackConversion } from '../services/analytics';

export const SecondEmailCapture = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes('@')) {
            alert('Please enter a valid email address.');
            return;
        }

        setIsSubmitting(true);

        try {
            await saveLeadToSheets({ email, source: 'footer_signup' });

            // Trigger PDF Download
            const link = document.createElement('a');
            link.href = '/famous-food-in-pondicherry.pdf';
            link.setAttribute('download', 'famous-food-in-pondicherry.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            trackConversion('footer_signup');
            setIsSuccess(true);
            setEmail('');
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

                {isSuccess ? (
                    <div className="bg-white/10 rounded-xl p-8 mb-8 backdrop-blur-sm animate-fade-in">
                        <CheckCircle2 className="h-12 w-12 text-white mx-auto mb-3" />
                        <h3 className="text-2xl font-bold text-white mb-2">Download Started! 🚀</h3>
                        <p className="text-orange-100">Enjoy your free food guide.</p>
                        <button
                            onClick={() => setIsSuccess(false)}
                            className="mt-4 text-sm text-white font-semibold hover:underline"
                        >
                            Reset Form
                        </button>
                    </div>
                ) : (
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
                            {isSubmitting ? 'Sending...' : 'Send Me the Guide'}
                            {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                        </button>
                    </form>
                )}

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
