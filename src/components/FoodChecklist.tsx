import { useState } from 'react';

export const FoodChecklist = () => {
    const [items, setItems] = useState([
        { id: 1, text: "Try authentic Pondicherry Breakfast", checked: false },
        { id: 2, text: "Eat fresh seafood by the beach", checked: false },
        { id: 3, text: "Visit a hidden street food stall", checked: false },
        { id: 4, text: "Drink traditional Filter Coffee", checked: false },
    ]);

    const toggleItem = (id: number) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    return (
        <section className="bg-orange-50 py-16 px-4">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="mb-2 text-3xl font-bold text-gray-900">Your Food Bucket List</h2>
                <p className="mb-8 text-gray-600">Tap to check off the experiences you want to have!</p>

                <div className="space-y-3">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => toggleItem(item.id)}
                            className={`cursor-pointer rounded-lg border p-4 text-left transition-all ${item.checked
                                ? 'bg-green-50 border-green-200 shadow-sm'
                                : 'bg-white border-gray-200 hover:border-orange-300'
                                }`}
                        >
                            <div className="flex items-center">
                                <div className={`mr-4 flex h-6 w-6 items-center justify-center rounded border ${item.checked ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'
                                    }`}>
                                    {item.checked && (
                                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                                <span className={`text-lg ${item.checked ? 'text-green-800 line-through decoration-green-500' : 'text-gray-800'}`}>
                                    {item.text}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
