import { ArrowRight, Check, Download } from 'lucide-react';
import { useLeadModal } from '../hooks/useLeadModal';

export const SecondEmailCapture = () => {
    const { openLeadModal } = useLeadModal();

    return (
        <section className="bg-orange-600 py-20 px-4 text-center">
            <div className="mx-auto max-w-2xl">
                <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Ready to Eat Like a Local?</h2>
                <p className="mb-10 text-lg text-orange-100">Download your free guide in 30 seconds</p>

                <div className="flex justify-center mb-8">
                    <button
                        type="button"
                        onClick={() => openLeadModal('footer_cta')}
                        className="flex items-center justify-center rounded-lg bg-gray-900 px-8 py-4 font-semibold text-white shadow-lg hover:bg-gray-800 transition-all transform hover:scale-[1.02]"
                    >
                        <Download className="mr-2 h-5 w-5" />
                        Get My Free Guide
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                </div>

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
