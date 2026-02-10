import { Mail, MapPin, Send } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { saveLeadToSheets } from '../services/googleSheets';

export const ContactUs = () => {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            await saveLeadToSheets({
                name: `${formData.firstName} ${formData.lastName}`.trim(),
                email: formData.email,
                message: formData.message,
                source: 'contact_form'
            });
            setStatus('success');
            setFormData({ firstName: '', lastName: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }));
    };

    return (
        <section id="contact" className="py-24 bg-gray-900 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-orange-500 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-500 blur-3xl"></div>
            </div>

            <div className="mx-auto max-w-7xl px-4 relative z-10">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-orange-400 font-bold tracking-wider uppercase text-sm">Get in Touch</span>
                        <h2 className="text-3xl font-bold md:text-5xl mt-2 mb-6 text-white">
                            We'd Love to Hear From You
                        </h2>
                        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                            Have questions about our food guide? Want to suggest a new spot? Or just want to say hello? Drop us a message!
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-orange-400">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email Us</p>
                                    <p className="font-medium text-white">venkateshprasads.bs019@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-orange-400">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Location</p>
                                    <p className="font-medium text-white">Pondicherry, India</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                                        placeholder="John"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                                        placeholder="Doe"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                                    placeholder="How can we help you?"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'submitting' || status === 'success'}
                                className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all transform ${status === 'success'
                                    ? 'bg-green-600 text-white'
                                    : 'bg-orange-600 text-white hover:bg-orange-700 hover:scale-[1.02]'
                                    }`}
                            >
                                {status === 'submitting' ? (
                                    'Sending...'
                                ) : status === 'success' ? (
                                    'Message Sent!'
                                ) : (
                                    <>
                                        Send Message <Send className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
