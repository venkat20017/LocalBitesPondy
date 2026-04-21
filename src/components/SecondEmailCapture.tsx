import { ArrowRight, Check } from 'lucide-react';
import { useLeadPopup } from '../context/LeadPopupContext';

export const SecondEmailCapture = () => {
    const { openPopup } = useLeadPopup();

    return (
        <section className="bg-orange-600 py-20 px-4 text-center">
            <div className="mx-auto max-w-2xl">
                <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Ready to Eat Like a Local?</h2>
                <p className="mb-10 text-lg text-orange-100">Download your free guide in 30 seconds</p>

                <div className="flex justify-center mb-12">
                    <button
                        onClick={() => openPopup('second_capture')}
                        className="flex w-full sm:w-auto items-center justify-center rounded-2xl bg-gray-900 px-10 py-5 font-bold text-xl text-white shadow-2xl hover:bg-gray-800 transition-all transform hover:scale-105"
                    >
                        Get My Free Guide
                        <ArrowRight className="ml-3 h-6 w-6" />
                    </button>
                </div>

                <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-orange-100 font-medium">
                    <div className="flex items-center">
                        <Check className="h-5 w-5 text-white mr-2" />
                        No spam, ever
                    </div>
                    <div className="flex items-center">
                        <Check className="h-5 w-5 text-white mr-2" />
                        Instant PDF access
                    </div>
                    <div className="flex items-center">
                        <Check className="h-5 w-5 text-white mr-2" />
                        2,500+ downloads
                    </div>
                </div>
            </div>
        </section>
    );
};

