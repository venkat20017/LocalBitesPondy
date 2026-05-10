import { useState, type FormEvent, useEffect } from 'react';
import { X, Mail, User, Phone, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { useLeadPopup } from '../context/LeadPopupContext';
import { saveLeadToSheets } from '../services/googleSheets';
import { trackConversion, trackEvent } from '../services/analytics';
import { useNavigate } from 'react-router-dom';

export const LeadPopup = () => {
    const { isOpen, closePopup, source } = useLeadPopup();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [website, setWebsite] = useState(''); // Honeypot field
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    // Reset form when opened
    useEffect(() => {
        if (isOpen) {
            setIsSuccess(false);
            setIsSubmitting(false);
            setName('');
            setEmail('');
            setPhone('');
            setWebsite('');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        // Spam protection: If honeypot is filled, ignore submission
        if (website) {
            console.warn('Bot detected');
            setIsSuccess(true); // Pretend success to the bot
            setTimeout(() => {
                closePopup();
                navigate('/thank-you');
            }, 1000);
            return;
        }

        if (!email || !email.includes('@')) {
            alert('Please enter a valid email address.');
            return;
        }

        setIsSubmitting(true);
        try {
            await saveLeadToSheets({ 
                name, 
                email, 
                phone, 
                source: `popup_${source}` 
            });
            
            trackConversion(`lead_popup_${source}`);
            trackEvent('Form Submitted', 'lead_generation', source);
            
            setIsSuccess(true);
            
            // Immediately open/download the PDF
            window.open('/famous-food-in-pondicherry.pdf', '_blank');
            
            // Redirect after a short delay to show success state
            setTimeout(() => {
                closePopup();
                navigate('/thank-you');
            }, 800);

        } catch (error) {
            console.error('Submission failed', error);
            alert('Something went wrong. Please try again.');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
                onClick={closePopup}
            ></div>

            {/* Modal */}
            <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-scale-in max-h-[90vh] flex flex-col">
                <button 
                    onClick={closePopup}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-20"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header Image/Pattern - Reduced height */}
                <div className="bg-orange-600 h-24 relative flex items-center justify-center shrink-0">
                    <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 bg-black/10 rounded-full blur-xl"></div>
                    <Mail className="w-10 h-10 text-white opacity-20 absolute top-3 left-3" />
                    <h2 className="text-white text-xl font-bold px-8 text-center relative z-10">
                        Get Your Free Guide
                    </h2>
                </div>

                {/* Scrollable Content Area */}
                <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar">
                    {isSuccess ? (
                        <div className="flex flex-col items-center justify-center text-center py-6 animate-fade-in">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle2 className="w-10 h-10 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">Success!</h3>
                            <p className="text-gray-600">Taking you to your download...</p>
                        </div>
                    ) : (
                        <>
                            <p className="text-gray-600 mb-8 text-center text-lg">
                                Enter your details below to instantly download the 15+ spots locals love in Pondicherry.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Honeypot field - hidden from humans */}
                                <div className="hidden" aria-hidden="true">
                                    <input
                                        type="text"
                                        name="website"
                                        tabIndex={-1}
                                        autoComplete="off"
                                        value={website}
                                        onChange={(e) => setWebsite(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="popup-name" className="block text-sm font-semibold text-gray-700 mb-1">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="popup-name"
                                            required
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-900"
                                            placeholder="John Doe"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="popup-email" className="block text-sm font-semibold text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            id="popup-email"
                                            required
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-900"
                                            placeholder="john@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="popup-phone" className="block text-sm font-semibold text-gray-700 mb-1">
                                        Phone Number <span className="text-gray-400 font-normal">(Optional)</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Phone className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="tel"
                                            id="popup-phone"
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-900"
                                            placeholder="+91 98765 43210"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full mt-4 flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-orange-200 transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Get Free Guide Now
                                            <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </form>

                            <p className="mt-6 text-xs text-gray-500 text-center flex items-center justify-center gap-1">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                Instant PDF access. We value your privacy.
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
