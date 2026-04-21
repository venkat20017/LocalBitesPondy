import React from 'react';
import { UtensilsCrossed } from 'lucide-react';

export const LoadingOverlay: React.FC = () => {
    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-white">
            <div className="flex flex-col items-center">
                {/* Animated Logo */}
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-orange-200 rounded-full blur-xl animate-pulse"></div>
                    <div className="relative bg-white p-6 rounded-full shadow-2xl border border-orange-100 animate-bounce">
                        <UtensilsCrossed className="h-12 w-12 text-orange-600" />
                    </div>
                </div>

                {/* Text Loader */}
                <h2 className="text-2xl font-bold text-gray-900 mb-2">LocalBitesPondy</h2>
                <div className="flex items-center gap-1.5">
                    <span className="text-gray-500 font-medium">Fetching fresh local secrets</span>
                    <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
