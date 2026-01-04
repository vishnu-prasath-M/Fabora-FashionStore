import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, Globe } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Message sent! We\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row">

                {/* Visual / Info Side - Premium Dark Theme */}
                <div className="lg:w-5/12 bg-gray-900 p-12 text-white relative flex flex-col justify-between overflow-hidden">
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary-600 rounded-full opacity-20 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-72 h-72 bg-indigo-500 rounded-full opacity-20 blur-3xl"></div>

                    <div className="relative z-10">
                        <h2 className="text-4xl font-heading font-bold mb-6">Contact Us</h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-12">
                            Have questions or need styling advice? Our concierge team is ready to assist you.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                <Mail className="w-6 h-6 text-primary-400 mt-1" />
                                <div>
                                    <h3 className="font-bold text-lg">Email Support</h3>
                                    <p className="text-gray-400">concierge@fabora.com</p>
                                    <p className="text-gray-500 text-sm mt-1">Response within 2 hours</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                <Phone className="w-6 h-6 text-primary-400 mt-1" />
                                <div>
                                    <h3 className="font-bold text-lg">VIP Line</h3>
                                    <p className="text-gray-400">+1 (888) FAB-LUXE</p>
                                    <p className="text-gray-500 text-sm mt-1">Mon-Fri, 9am - 6pm EST</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                <MapPin className="w-6 h-6 text-primary-400 mt-1" />
                                <div>
                                    <h3 className="font-bold text-lg">Headquarters</h3>
                                    <p className="text-gray-400">123 Fashion Ave, Design District</p>
                                    <p className="text-gray-500 text-sm mt-1">New York, NY 10001</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 lg:mt-0 relative z-10">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition-all">
                                <Globe className="w-5 h-5" />
                            </div>
                            {/* Add social icons if needed */}
                        </div>
                    </div>
                </div>

                {/* Form Side - Clean & Modern */}
                <div className="lg:w-7/12 p-12 lg:p-16">
                    <h3 className="text-3xl font-bold text-gray-900 mb-8">Send a Message</h3>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="peer w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-300 rounded-xl focus:border-gray-900 focus:outline-none placeholder-transparent"
                                    placeholder="Name"
                                />
                                <label className="absolute left-2 -top-3.5 px-1 bg-white text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:px-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:left-2 peer-focus:px-1 peer-focus:text-sm peer-focus:text-gray-900">
                                    Your Name
                                </label>
                            </div>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    className="peer w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-300 rounded-xl focus:border-gray-900 focus:outline-none placeholder-transparent"
                                    placeholder="Email"
                                />
                                <label className="absolute left-2 -top-3.5 px-1 bg-white text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:px-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:left-2 peer-focus:px-1 peer-focus:text-sm peer-focus:text-gray-900">
                                    Email Address
                                </label>
                            </div>
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                required
                                className="peer w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-300 rounded-xl focus:border-gray-900 focus:outline-none placeholder-transparent"
                                placeholder="Subject"
                            />
                            <label className="absolute left-2 -top-3.5 px-1 bg-white text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:px-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:left-2 peer-focus:px-1 peer-focus:text-sm peer-focus:text-gray-900">
                                Subject
                            </label>
                        </div>

                        <div className="relative">
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                required
                                rows={4}
                                className="peer w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-300 rounded-xl focus:border-gray-900 focus:outline-none placeholder-transparent resize-none"
                                placeholder="Message"
                            ></textarea>
                            <label className="absolute left-2 -top-3.5 px-1 bg-white text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:px-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:left-2 peer-focus:px-1 peer-focus:text-sm peer-focus:text-gray-900">
                                How can we help?
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="group relative w-full overflow-hidden rounded-xl bg-gray-900 px-8 py-4 text-white hover:bg-gray-800 transition-all duration-300"
                        >
                            <span className="relative z-10 font-bold tracking-wider flex items-center justify-center gap-2">
                                SEND MESSAGE <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
