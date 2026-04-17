import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, User, X, Check } from 'lucide-react';
import { useLeadModal } from '../hooks/useLeadModal';
import { saveLeadToSheets } from '../services/googleSheets';
import { trackConversion } from '../services/analytics';

export const LeadModal = () => {
    const { isOpen, source, closeLeadModal } = useLeadModal();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isOpen) return;
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeLeadModal();
        };
        window.addEventListener('keydown', onKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, closeLeadModal]);

    if (!isOpen) return null;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!email || !email.includes('@')) {
            alert('Please enter a valid email address.');
            return;
        }
        setIsSubmitting(true);
        try {
            await saveLeadToSheets({ name, email, source });
            trackConversion(`${source}_signup`);
            sessionStorage.setItem('lbp_lead_submitted', '1');
            window.open('/famous-food-in-pondicherry.pdf', '_blank');
            closeLeadModal();
            setName('');
            setEmail('');
            navigate('/thank-you');
        } catch (error) {
            console.error('Submission failed', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-modal-title"
            onClick={closeLeadModal}
        >
            <div
                className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={closeLeadModal}
                    aria-label="Close"
                    className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="bg-orange-600 px-6 py-8 text-center text-white sm:px-10">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                        <Mail className="h-7 w-7 text-white" />
                    </div>
                    <h2 id="lead-modal-title" className="text-2xl font-bold sm:text-3xl">
                        Get the Free Pondicherry Food Guide
                    </h2>
                    <p className="mt-2 text-orange-100">
                        15 handpicked local spots · Google Maps links · What to order
                    </p>
                </div>

                <div className="px-6 py-6 sm:px-10 sm:py-8">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="lead-modal-name" className="sr-only">
                                Name (Optional)
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    id="lead-modal-name"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pl-10 text-gray-900 focus:border-orange-500 focus:ring-orange-500 outline-none"
                                    placeholder="Your Name (Optional)"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="lead-modal-email" className="sr-only">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    id="lead-modal-email"
                                    required
                                    autoFocus
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pl-10 text-gray-900 focus:border-orange-500 focus:ring-orange-500 outline-none"
                                    placeholder="Your Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-2 flex items-center justify-center rounded-lg bg-orange-600 px-6 py-4 text-center font-bold text-lg text-white hover:bg-orange-700 focus:ring-4 focus:ring-orange-300 transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sending...
                                </span>
                            ) : (
                                <>
                                    Get My Free Food Guide
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                            <Check className="h-3.5 w-3.5 text-green-500" /> Instant download
                        </span>
                        <span className="flex items-center gap-1">
                            <Check className="h-3.5 w-3.5 text-green-500" /> No spam, ever
                        </span>
                        <span className="flex items-center gap-1">
                            <Check className="h-3.5 w-3.5 text-green-500" /> 2,500+ food lovers
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
