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
            {/* Classic Premium Hero Section */}
            <section
                ref={heroRef}
                className="relative min-h-screen flex items-center overflow-hidden bg-white"
            >
                {/* Elegant Background Pattern */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-amber-50/30"></div>
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>
                </div>

                {/* Decorative Lines */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left Content */}
                        <div className="space-y-10">
                            {/* Elegant Badge */}
                            <div className="hero-subtitle inline-block">
                                <div className="relative group">
                                    <div className="flex items-center gap-3 px-6 py-3 border border-gray-900/10 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse"></div>
                                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-900">
                                            New Collection 2024
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Sophisticated Title */}
                            <div className="hero-title space-y-6">
                                <h1 className="text-6xl md:text-7xl lg:text-8xl font-heading font-bold leading-[0.95] tracking-tight">
                                    <span className="block text-gray-900">
                                        Timeless
                                    </span>
                                    <span className="block text-gray-900 relative inline-block">
                                        Elegance
                                        <svg className="absolute -bottom-2 left-0 w-full h-3 text-amber-600/20" viewBox="0 0 200 12" preserveAspectRatio="none">
                                            <path d="M0,7 Q50,0 100,7 T200,7" fill="none" stroke="currentColor" strokeWidth="3" />
                                        </svg>
                                    </span>
                                </h1>
                            </div>

                            {/* Refined Description */}
                            <p className="hero-subtitle text-xl md:text-2xl text-gray-600 max-w-lg leading-relaxed font-light">
                                Discover curated fashion that transcends trends.
                                <span className="text-gray-900 font-normal"> Premium quality</span>, exceptional craftsmanship.
                            </p>

                            {/* Sophisticated CTA */}
                            <div className="hero-cta flex flex-col sm:flex-row gap-4 pt-4">
                                <Link
                                    to="/shop"
                                    className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 text-base font-semibold overflow-hidden bg-gray-900 text-white transition-all duration-300 hover:bg-gray-800 hover:shadow-2xl hover:shadow-gray-900/20"
                                >
                                    <span className="relative uppercase tracking-[0.15em]">Explore Collection</span>
                                    <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <a
                                    href="#featured"
                                    className="group inline-flex items-center justify-center gap-3 px-10 py-5 text-base font-semibold border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
                                >
                                    <span className="uppercase tracking-[0.15em]">View Lookbook</span>
                                    <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </a>
                            </div>

                            {/* Refined Stats */}
                            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-gray-200">
                                {[
                                    { value: `${products.length}+`, label: 'Curated Pieces', icon: '◆' },
                                    { value: '10k+', label: 'Global Clients', icon: '◆' },
                                    { value: '4.8★', label: 'Excellence', icon: '◆' }
                                ].map((stat, index) => (
                                    <div key={index} className="group">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-amber-600 text-xs">{stat.icon}</span>
                                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                                                    {stat.label}
                                                </p>
                                            </div>
                                            <p className="text-4xl md:text-5xl font-heading font-bold text-gray-900 tracking-tight">
                                                {stat.value}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right - Elegant Image Composition */}
                        <div className="relative lg:h-[700px] hidden lg:block">
                            {/* Main Featured Image */}
                            <div className="hero-image absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-[500px] animate-float-subtle">
                                <div className="relative group h-full">
                                    <div className="absolute -inset-4 bg-gradient-to-br from-amber-100/50 to-gray-100/50 blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                                    <div className="relative h-full bg-white shadow-2xl overflow-hidden border border-gray-100">
                                        <img
                                            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80"
                                            alt="Featured Fashion"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                            <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 mb-3">
                                                <span className="text-xs font-bold uppercase tracking-[0.2em]">
                                                    Signature Collection
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-heading font-bold mb-2">Premium Essentials</h3>
                                            <p className="text-white/80 text-sm font-light">From ₹2,999</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Accent Image 1 - Top Left */}
                            <div className="hero-image absolute top-0 left-0 w-52 h-64 animate-float-subtle animation-delay-1000">
                                <div className="relative group h-full">
                                    <div className="absolute -inset-2 bg-gray-100 blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                                    <div className="relative h-full bg-white shadow-xl overflow-hidden border border-gray-100">
                                        <img
                                            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80"
                                            alt="Fashion Item"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 right-4">
                                            <div className="w-12 h-12 bg-white/90 backdrop-blur-sm flex items-center justify-center border border-gray-200">
                                                <span className="text-xs font-bold text-gray-900">NEW</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Accent Image 2 - Top Right */}
                            <div className="hero-image absolute top-20 right-0 w-48 h-60 animate-float-subtle animation-delay-2000">
                                <div className="relative group h-full">
                                    <div className="absolute -inset-2 bg-amber-100 blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                                    <div className="relative h-full bg-white shadow-xl overflow-hidden border border-gray-100">
                                        <img
                                            src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80"
                                            alt="Fashion Item"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Accent Image 3 - Bottom Left */}
                            <div className="hero-image absolute bottom-0 left-16 w-44 h-56 animate-float-subtle animation-delay-3000">
                                <div className="relative group h-full">
                                    <div className="absolute -inset-2 bg-gray-100 blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                                    <div className="relative h-full bg-white shadow-xl overflow-hidden border border-gray-100">
                                        <img
                                            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80"
                                            alt="Fashion Item"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Accent Image 4 - Bottom Right */}
                            <div className="hero-image absolute bottom-16 right-20 w-40 h-52 animate-float-subtle animation-delay-4000">
                                <div className="relative group h-full">
                                    <div className="absolute -inset-2 bg-amber-100 blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                                    <div className="relative h-full bg-white shadow-xl overflow-hidden border border-gray-100">
                                        <img
                                            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80"
                                            alt="Fashion Item"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute top-1/3 right-1/3 w-24 h-24 border border-amber-600/10 animate-spin-slow"></div>
                            <div className="absolute bottom-1/3 left-1/3 w-20 h-20 border border-gray-900/10 animate-spin-slow animation-delay-2000"></div>
                        </div>
                    </div>
                </div>

                {/* Elegant Scroll Indicator */}
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
                    <div className="flex flex-col items-center gap-3 animate-bounce-subtle">
                        <div className="w-px h-16 bg-gradient-to-b from-transparent via-gray-400 to-transparent"></div>
                        <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">Scroll</span>
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
