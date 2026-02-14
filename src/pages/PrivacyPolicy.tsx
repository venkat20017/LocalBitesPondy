import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 pt-24">
            {/* Header Section */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Link to="/" className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Link>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Privacy Policy</h1>
                    <p className="mt-2 text-gray-600">Last updated: February 09, 2026</p>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-2xl shadow-sm p-8 sm:p-12 prose prose-orange prose-lg max-w-none hover:prose-a:text-orange-600">
                    <p className="lead text-gray-600">This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>

                    <p>We use Your Personal Data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the <a href="https://www.termsfeed.com/privacy-policy-generator/" target="_blank" rel="noreferrer">Privacy Policy Generator</a>.</p>

                    <h2 className="text-gray-900 border-b pb-2">Interpretation and Definitions</h2>
                    <h3>Interpretation</h3>
                    <p>The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>

                    <h3>Definitions</h3>
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 not-prose space-y-4 mb-8">
                        <p className="font-medium text-gray-900 mb-2">For the purposes of this Privacy Policy:</p>
                        <ul className="space-y-3 text-gray-700">
                            <li><strong className="text-gray-900">Account</strong> means a unique account created for You to access our Service or parts of our Service.</li>
                            <li><strong className="text-gray-900">Affiliate</strong> means an entity that controls, is controlled by, or is under common control with a party...</li>
                            <li><strong className="text-gray-900">Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Privacy Policy) refers to LocalBitesPondy.</li>
                            <li><strong className="text-gray-900">Cookies</strong> are small files that are placed on Your computer...</li>
                            <li><strong className="text-gray-900">Country</strong> refers to: Puducherry, India</li>
                            <li><strong className="text-gray-900">Device</strong> means any device that can access the Service such as a computer, a cell phone or a digital tablet.</li>
                            <li><strong className="text-gray-900">Personal Data</strong> (or "Personal Information") is any information that relates to an identified or identifiable individual.</li>
                            <li><strong className="text-gray-900">Service</strong> refers to the Website.</li>
                            <li><strong className="text-gray-900">Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company...</li>
                            <li><strong className="text-gray-900">Usage Data</strong> refers to data collected automatically...</li>
                            <li><strong className="text-gray-900">Website</strong> refers to LocalBitesPondy, accessible from <a href="https://localbitespondy.netlify.app" className="text-orange-600 hover:underline" rel="external nofollow noopener noreferrer" target="_blank">https://localbitespondy.netlify.app</a>.</li>
                            <li><strong className="text-gray-900">You</strong> means the individual accessing or using the Service...</li>
                        </ul>
                    </div>

                    <h2 className="text-gray-900 border-b pb-2">Collecting and Using Your Personal Data</h2>
                    <h3>Types of Data Collected</h3>

                    <div className="grid md:grid-cols-2 gap-8 my-8 not-prose">
                        <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                            <h4 className="text-lg font-bold text-gray-900 mb-3">Personal Data</h4>
                            <p className="text-gray-700 mb-4">While using Our Service, We may ask You to provide Us with certain personally identifiable information:</p>
                            <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                <li>Email address</li>
                                <li>First name and last name</li>
                            </ul>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                            <h4 className="text-lg font-bold text-gray-900 mb-3">Usage Data</h4>
                            <p className="text-gray-700">Usage Data is collected automatically when using the Service (IP address, browser type, etc.).</p>
                        </div>
                    </div>

                    <h4>Tracking Technologies and Cookies</h4>
                    <p>We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies We use include beacons, tags, and scripts to collect and track information and to improve and analyze Our Service.</p>

                    <div className="my-6 not-prose">
                        <div className="grid gap-4">
                            <div className="p-4 border border-gray-200 rounded-lg">
                                <h5 className="font-bold text-gray-900">Necessary / Essential Cookies</h5>
                                <p className="text-sm text-gray-600 mt-1">These Cookies are essential to provide You with services available through the Website.</p>
                            </div>
                            <div className="p-4 border border-gray-200 rounded-lg">
                                <h5 className="font-bold text-gray-900">Functionality Cookies</h5>
                                <p className="text-sm text-gray-600 mt-1">These Cookies allow Us to remember choices You make when You use the Website.</p>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-gray-900 border-b pb-2">Use of Your Personal Data</h2>
                    <p>The Company may use Personal Data for the following purposes:</p>
                    <ul className="marker:text-orange-500">
                        <li><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</li>
                        <li><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service.</li>
                        <li><strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract.</li>
                        <li><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms.</li>
                        <li><strong>To provide You</strong> with news, special offers, and general information about other goods.</li>
                        <li><strong>To manage Your requests:</strong> To attend and manage Your requests to Us.</li>
                        <li><strong>For business transfers:</strong> We may use Your Personal Data to evaluate or conduct a merger.</li>
                    </ul>

                    <h2 className="text-gray-900 border-b pb-2">Retention of Your Personal Data</h2>
                    <p>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy.</p>

                    <h2 className="text-gray-900 border-b pb-2">Delete Your Personal Data</h2>
                    <p>You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You.</p>
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4 not-prose">
                        <p className="text-red-700">You may update, amend, or delete Your information at any time by contacting Us.</p>
                    </div>

                    <h2 className="text-gray-900 border-b pb-2">Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, You can contact us:</p>
                    <ul className="not-prose mt-4">
                        <li className="flex items-center text-gray-700">
                            <span className="font-semibold w-24">By email:</span>
                            <a href="mailto:venkateshprasads.bs019@gmail.com" className="text-orange-600 hover:text-orange-700 hover:underline">venkateshprasads.bs019@gmail.com</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
