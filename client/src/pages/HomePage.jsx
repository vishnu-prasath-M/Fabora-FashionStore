import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';
import SkeletonProductCard from '../components/SkeletonProductCard';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Mail } from 'lucide-react';
import gsap from 'gsap';
import toast from 'react-hot-toast';

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const heroRef = useRef(null);
    const productsRef = useRef(null);
    const [email, setEmail] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    const { products, loading, error } = useSelector((state) => state.product);

    useEffect(() => {
        // Fetch all products from local backend
        dispatch(listProducts({ category: activeCategory }));
    }, [dispatch, activeCategory]);

    useEffect(() => {
        // GSAP Hero Animation
        const ctx = gsap.context(() => {
            gsap.from('.hero-title', {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out',
            });
            gsap.from('.hero-subtitle', {
                opacity: 0,
                y: 30,
                duration: 1,
                delay: 0.3,
                ease: 'power3.out',
            });
            gsap.from('.hero-cta', {
                opacity: 0,
                y: 20,
                duration: 1,
                delay: 0.6,
                ease: 'power3.out',
            });
            gsap.from('.hero-image', {
                opacity: 0,
                scale: 0.9,
                stagger: 0.2,
                duration: 1,
                delay: 0.4,
                ease: 'power3.out',
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (products.length > 0) {
            const ctx = gsap.context(() => {
                // Section Reveals
                gsap.from('.section-reveal', {
                    opacity: 0,
                    y: 40,
                    stagger: 0.2,
                    duration: 1,
                    delay: 0.2,
                    ease: 'power3.out',
                });

                // Product Card Stagger
                gsap.from('.product-card-reveal', {
                    opacity: 0,
                    y: 30,
                    stagger: 0.1,
                    duration: 0.8,
                    delay: 0.4,
                    ease: 'power3.out',
                });
            }, productsRef);

            return () => ctx.revert();
        }
    }, [products]);

    const handleCategoryFilter = (category) => {
        setActiveCategory(category);
        dispatch(listProducts({ category }));
    };

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (email) {
            toast.success('Thank you for subscribing!');
            setEmail('');
        }
    };

    const handleRetry = () => {
        dispatch(listProducts({ category: activeCategory }));
    };

    // Get featured products (first 12 for denser grid)
    const featuredProducts = products.slice(0, 12);

    // Get best sellers (products with rating > 4 or last 6 products)
    const bestSellers = products.filter(p => p.rating?.rate > 4).slice(0, 6);
    const displayBestSellers = bestSellers.length > 0 ? bestSellers : products.slice(-6);

    return (
        <div>
            {/* Festival Sale Poster - Hero Section */}
            <section
                ref={heroRef}
                className="relative min-h-[90vh] flex items-center bg-[#0a0a0a] overflow-hidden"
            >
                {/* Background Texture & Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2274&auto=format&fit=crop"
                        alt="Fashion Background"
                        className="w-full h-full object-cover opacity-40 hidden md:block" // Desktop Image
                    />
                    <img
                        src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop"
                        alt="Fashion Background Mobile"
                        className="w-full h-full object-cover opacity-50 md:hidden" // Mobile Image
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                </div>

                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-12 md:py-0">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">

                        {/* Left Content - Poster Style */}
                        <div className="w-full md:w-1/2 text-center md:text-left space-y-8">

                            {/* Festival Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#D4AF37] rounded-sm bg-black/50 backdrop-blur-md mx-auto md:mx-0">
                                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
                                <span className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase font-heading">
                                    Festival Edit 2024
                                </span>
                            </div>

                            {/* Main Typography */}
                            <div className="space-y-4">
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-medium text-white leading-[0.9] tracking-tight">
                                    GRAND <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F1C40F] to-[#B7950B] italic font-serif">
                                        SEASON SALE
                                    </span>
                                </h1>
                                <p className="text-gray-300 text-lg md:text-xl font-light tracking-wide max-w-lg mx-auto md:mx-0">
                                    Elevate your wardrobe with our exclusive festival collection.
                                    Timeless elegance meets modern luxury.
                                </p>
                            </div>

                            {/* Offer Box */}
                            <div className="flex flex-col md:flex-row items-center gap-6 mt-8">
                                <div className="border-l-4 border-[#D4AF37] pl-6 text-left bg-gradient-to-r from-white/5 to-transparent p-4 rounded-r-xl">
                                    <p className="text-white text-sm uppercase tracking-widest mb-1">Limited Time Offer</p>
                                    <p className="text-4xl font-bold text-white">
                                        FLAT <span className="text-[#D4AF37]">50% OFF</span>
                                    </p>
                                    <p className="text-gray-400 text-xs mt-1">*On selected premium brands</p>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center md:justify-start">
                                <Link
                                    to="/shop"
                                    className="relative px-8 py-4 bg-[#D4AF37] text-black font-bold text-lg uppercase tracking-widest hover:bg-white hover:text-black hover:ring-2 hover:ring-[#D4AF37] transition-all duration-300"
                                >
                                    <span className="flex items-center gap-2">
                                        Shop The Sale <ArrowRight className="w-5 h-5" />
                                    </span>
                                </Link>
                                <a
                                    href="#featured"
                                    className="px-8 py-4 border border-white/30 text-white font-medium text-lg uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
                                >
                                    View Lookbook
                                </a>
                            </div>
                        </div>

                        {/* Right Content - Visual Showcase (Desktop Only, Mobile uses bg) */}
                        <div className="hidden md:block w-full md:w-1/2 relative h-[600px]">
                            {/* Central Floating Image with Gold Frame */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[500px] border border-[#D4AF37]/30 p-4 animate-float-subtle">
                                <div className="w-full h-full relative">
                                    <div className="absolute inset-0 border border-[#D4AF37] transform translate-x-4 translate-y-4 z-0"></div>
                                    <div className="absolute inset-0 bg-gray-900 overflow-hidden z-10 shadow-2xl">
                                        <img
                                            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop"
                                            alt="Fashion Model"
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000 grayscale hover:grayscale-0"
                                        />

                                        {/* Floating Tag */}
                                        <div className="absolute top-4 right-4 bg-black/80 backdrop-blur text-white px-4 py-2 border border-[#D4AF37]">
                                            <span className="text-xs font-bold uppercase tracking-widest">Premium</span>
                                        </div>

                                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-6">
                                            <p className="text-[#D4AF37] font-serif italic text-xl">The Royal Edition</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -top-10 right-10 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse"></div>
                            <div className="absolute bottom-10 left-10 w-40 h-40 bg-purple-900/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                        </div>
                    </div>
                </div>

                {/* Bottom Ticker/Banner using marquee-like effect */}
                <div className="absolute bottom-0 w-full bg-[#D4AF37] py-2 overflow-hidden whitespace-nowrap">
                    <div className="animate-marquee inline-block">
                        <span className="text-black font-bold uppercase tracking-widest text-sm mx-8">★ FREE SHIPPING ON ALL ORDERS ABOVE ₹999</span>
                        <span className="text-black font-bold uppercase tracking-widest text-sm mx-8">★ EXTRA 10% OFF WITH HDFC CARDS</span>
                        <span className="text-black font-bold uppercase tracking-widest text-sm mx-8">★ 30-DAY EASY RETURNS</span>
                        <span className="text-black font-bold uppercase tracking-widest text-sm mx-8">★ NEW STYLES ADDED DAILY</span>
                        <span className="text-black font-bold uppercase tracking-widest text-sm mx-8">★ FREE SHIPPING ON ALL ORDERS ABOVE ₹999</span>
                        <span className="text-black font-bold uppercase tracking-widest text-sm mx-8">★ EXTRA 10% OFF WITH HDFC CARDS</span>
                        <span className="text-black font-bold uppercase tracking-widest text-sm mx-8">★ 30-DAY EASY RETURNS</span>
                        <span className="text-black font-bold uppercase tracking-widest text-sm mx-8">★ NEW STYLES ADDED DAILY</span>
                    </div>
                </div>
            </section>

            {/* Premium Category Visuals - Replaces simple buttons */}
            <section className="section-reveal py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="text-sm font-bold tracking-[0.2em] text-primary uppercase">Collections</span>
                        <h2 className="text-4xl font-heading font-bold text-gray-900 mt-2">Curated For You</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                id: 'T-Shirts',
                                title: "Premium Tees",
                                img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2600&auto=format&fit=crop",
                                link: '/shop?category=T-Shirts'
                            },
                            {
                                id: 'Dresses',
                                title: "Women's Couture",
                                img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2600&auto=format&fit=crop",
                                link: '/shop?category=Dresses'
                            },
                            {
                                id: 'Accessories',
                                title: "Designer Trinkets",
                                img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2600&auto=format&fit=crop",
                                link: '/shop?category=Accessories'
                            }
                        ].map((cat) => (
                            <div
                                key={cat.id}
                                onClick={() => navigate(cat.link)}
                                className="group cursor-pointer relative aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-2xl shadow-lg border border-gray-100"
                            >
                                <img
                                    src={cat.img}
                                    alt={cat.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity group-hover:opacity-100"></div>
                                <div className="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-500 group-hover:-translate-y-2">
                                    <h3 className="text-2xl font-heading font-bold text-white mb-2 tracking-tight">{cat.title}</h3>
                                    <span className="inline-flex items-center text-white/90 text-sm font-bold border-b-2 border-primary pb-1 group-hover:text-white transition-colors">
                                        Shop Now <ArrowRight className="w-4 h-4 ml-2" />
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Collection - Grid Perfection */}
            <section className="section-reveal bg-gray-50 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">Featured Drops</h2>
                            <p className="text-gray-500 mt-2 max-w-lg">Exclusive pieces selected for the modern trendsetter.</p>
                        </div>
                        <Link to="/shop" className="btn-outline hidden md:flex">View All Products</Link>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {[...Array(5)].map((_, i) => <SkeletonProductCard key={i} />)}
                        </div>
                    ) : (
                        <div ref={productsRef} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {(featuredProducts || []).filter(p => p && (p._id || p.id)).map((product) => (
                                <div key={product._id || product.id} className="product-card-reveal product-card h-full">
                                    <ProductCard product={product} isFakestoreProduct={!product._id} />
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-12 text-center md:hidden">
                        <Link to="/shop" className="btn-outline w-full">View All</Link>
                    </div>
                </div>
            </section>

            {/* Festival / Seasonal Banner (HD Poster Style) */}
            <section className="section-reveal relative h-[500px] md:h-[600px] w-full overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80"
                        alt="Festival Sale"
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>
                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center">
                    <span className="text-primary-400 font-bold tracking-[0.3em] uppercase mb-4 animate-pulse">Limited Time Offer</span>
                    <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 drop-shadow-lg">
                        FESTIVAL SALE
                    </h2>
                    <p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-10 font-light">
                        Celebrate the season with up to <span className="font-bold text-white">50% OFF</span> on premium collections.
                    </p>
                    <Link to="/shop" className="bg-white text-gray-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-primary hover:text-white transition-all duration-300 shadow-2xl transform hover:-translate-y-1">
                        Access Sale
                    </Link>
                </div>
            </section>

            {/* Trending Now */}
            <section className="section-reveal py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-heading font-bold text-gray-900">Trending Now</h2>
                        <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {(displayBestSellers || []).slice(0, 5).filter(p => p && (p._id || p.id)).map((product) => (
                            <div key={product._id || product.id} className="product-card-reveal h-full">
                                <ProductCard product={product} isFakestoreProduct={!product._id} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Brand Highlights */}
            <section className="section-reveal py-16 border-t border-gray-100 bg-gray-50/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-gray-400 text-sm font-semibold uppercase tracking-widest mb-10">Trusted by Global Brands</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {['VOGUE', 'ELLE', 'Gucci', 'Prada', 'Zara'].map((brand) => (
                            <span key={brand} className="text-2xl md:text-4xl font-heading font-bold text-gray-800 cursor-default">
                                {brand}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Badges - Premium Grid */}
            <section className="section-reveal bg-gray-900 text-white py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
                        {[
                            { icon: ShieldCheck, title: "Secure Payment", desc: "256-bit SSL Encrypted" },
                            { icon: Truck, title: "Global Shipping", desc: "Free delivery over $100" },
                            { icon: RefreshCw, title: "30-Day Returns", desc: "No questions asked" },
                            { icon: Mail, title: "24/7 Support", desc: "Dedicated stylist support" }
                        ].map((item, idx) => (
                            <div key={idx} className="flex flex-col md:flex-row items-center md:items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                <item.icon className="w-8 h-8 text-primary-400 shrink-0" />
                                <div>
                                    <h4 className="font-bold text-lg">{item.title}</h4>
                                    <p className="text-gray-400 text-sm">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sophisticated Newsletter Section */}
            <section className="section-reveal relative py-32 bg-white overflow-hidden">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary-50 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-3xl opacity-50"></div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-xs font-bold text-gray-500 uppercase tracking-widest mb-8">
                        <Mail className="w-4 h-4" /> Newsletter
                    </div>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6 tracking-tight">
                        Elevate your inbox.
                    </h2>
                    <p className="text-gray-500 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
                        Join our exclusive circle for early access to curated collections,
                        industry insights, and private invitations.
                    </p>
                    <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-0 max-w-xl mx-auto bg-gray-50 p-1.5 rounded-[2rem] shadow-sm">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email address"
                            required
                            className="flex-1 px-8 py-4 bg-transparent text-gray-900 focus:outline-none focus:ring-0 focus:ring-offset-0 placeholder:text-gray-400 border-none"
                        />
                        <button
                            type="submit"
                            className="px-10 py-4 bg-gray-900 text-white rounded-[1.75rem] font-bold hover:bg-gray-800 transition-all shadow-lg active:scale-95"
                        >
                            Join Now
                        </button>
                    </form>
                    <p className="text-gray-400 text-sm mt-8">
                        Privacy priority. Unsubscribe with one click.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
