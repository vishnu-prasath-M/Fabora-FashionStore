import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-secondary-800 to-secondary-900 text-white mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <h2 className="text-2xl font-heading font-bold text-white mb-4">FABORA</h2>
                        <p className="text-white/70 mb-4">Wear Your Story.</p>
                        <p className="text-white/70 text-sm">
                            Premium fashion for those who dare to be different.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/shop" className="text-white/70 hover:text-white transition-colors">
                                    Shop
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-white/70 hover:text-white transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-white/70 hover:text-white transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="font-semibold mb-4 text-white">Customer Service</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/orders" className="text-white/70 hover:text-white transition-colors">
                                    Track Order
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="text-white/70 hover:text-white transition-colors">
                                    Returns
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white/70 hover:text-white transition-colors">
                                    Shipping Info
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white/70 hover:text-white transition-colors">
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-semibold mb-4 text-white">Stay Connected</h3>
                        <p className="text-white/70 text-sm mb-4">
                            Subscribe to get special offers and updates.
                        </p>
                        <form className="mb-4">
                            <div className="flex bg-white/10 rounded-full p-1 focus-within:bg-white/20 transition-all">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="flex-1 px-4 py-2 bg-transparent text-white placeholder:text-white/50 outline-none border-none focus:ring-0 focus:ring-offset-0 text-sm"
                                />
                                <button
                                    type="submit"
                                    className="bg-white text-secondary-900 px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors"
                                >
                                    Join
                                </button>
                            </div>
                        </form>
                        <div className="flex space-x-4">
                            <a href="#" className="text-white/70 hover:text-white transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-white/70 hover:text-white transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-white/70 hover:text-white transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/70 text-sm">
                    <p>&copy; {new Date().getFullYear()} FABORA. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
