import { Award, Users, Heart, Globe } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80"
                        alt="About Hero"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 text-center text-white">
                    <span className="text-primary-400 font-bold tracking-widest uppercase mb-4 block">Our Story</span>
                    <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">Redefining Modern Fashion</h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto font-light">
                        We believe style is a way to say who you are without having to speak.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">Driven by Passion, <br />Crafted for You.</h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            Founded in 2024, FABORA started with a simple idea: to make premium fashion accessible without compromising on quality or ethics.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Every piece in our collection is curated to ensure it meets our high standards of design, durability, and comfort. We aren't just selling clothes; we're offering a lifestyle of confidence and elegance.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4 translate-y-8">
                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80" alt="Fashion 1" className="rounded-2xl shadow-lg w-full h-64 object-cover" />
                            <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&q=80" alt="Fashion 2" className="rounded-2xl shadow-lg w-full h-48 object-cover" />
                        </div>
                        <div className="space-y-4">
                            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80" alt="Fashion 3" className="rounded-2xl shadow-lg w-full h-48 object-cover" />
                            <img src="https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=500&q=80" alt="Fashion 4" className="rounded-2xl shadow-lg w-full h-64 object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats / Values */}
            <section className="bg-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm text-center hover:-translate-y-1 transition-transform duration-300">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                                <Award className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-xl mb-2">Premium Quality</h3>
                            <p className="text-gray-500">Only the finest materials for lasting comfort.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm text-center hover:-translate-y-1 transition-transform duration-300">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                                <Globe className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-xl mb-2">Sustainable</h3>
                            <p className="text-gray-500">Ethically sourced and eco-friendly practices.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm text-center hover:-translate-y-1 transition-transform duration-300">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                                <Users className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-xl mb-2">Community</h3>
                            <p className="text-gray-500">Join 50,000+ fashion enthusiasts worldwide.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm text-center hover:-translate-y-1 transition-transform duration-300">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                                <Heart className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-xl mb-2">Customer First</h3>
                            <p className="text-gray-500">24/7 support dedicated to your satisfaction.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
