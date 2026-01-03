import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFakestoreProductDetails, clearCurrentProduct } from '../redux/slices/fakestoreSlice';
import { addToWishlist, removeFromWishlist } from '../redux/slices/wishlistSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { Heart, ShoppingBag, Star, Truck, RefreshCw, ShieldCheck, ArrowLeft, Share2, Minus, Plus, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

const FakestoreProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const { currentProduct: product, productLoading: loading, productError: error } = useSelector(
        (state) => state.fakestore
    );
    const { wishlistItems } = useSelector((state) => state.wishlist);

    useEffect(() => {
        dispatch(fetchFakestoreProductDetails(id));

        return () => {
            dispatch(clearCurrentProduct());
        };
    }, [dispatch, id]);

    const isInWishlist = wishlistItems.some((item) => item.id === product?.id);

    const handleWishlistToggle = () => {
        if (!product) return;

        if (isInWishlist) {
            dispatch(removeFromWishlist(product.id));
            toast.success('Removed from wishlist');
        } else {
            dispatch(addToWishlist({
                id: product.id,
                title: product.title,
                image: product.image,
                price: product.price,
                category: product.category,
            }));
            toast.success('Added to wishlist!');
        }
    };

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                product: product.id,
                name: product.title,
                image: product.image,
                price: product.price,
                countInStock: 99, // FakeStore has no stock info, default to 99
                qty: quantity,
            })
        );
        toast.success(`Added ${quantity} item(s) to cart!`, {
            icon: '🛒',
        });
    };

    const handleBuyNow = () => {
        handleAddToCart();
        navigate('/ordering');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white py-12">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div className="aspect-[3/4] bg-gray-50 rounded-[2rem] animate-pulse"></div>
                        <div className="space-y-8 py-10">
                            <div className="h-4 bg-gray-50 rounded w-1/4"></div>
                            <div className="h-12 bg-gray-50 rounded w-3/4"></div>
                            <div className="h-6 bg-gray-50 rounded w-1/4"></div>
                            <div className="space-y-4">
                                <div className="h-4 bg-gray-50 rounded"></div>
                                <div className="h-4 bg-gray-50 rounded"></div>
                                <div className="h-4 bg-gray-50 rounded w-5/6"></div>
                            </div>
                            <div className="h-16 bg-gray-50 rounded-2xl w-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center p-12">
                    <h2 className="text-4xl font-heading font-bold mb-4">Product Not Found</h2>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">We couldn't find the piece you're looking for. It might be out of stock or moved.</p>
                    <Link to="/shop" className="inline-flex items-center text-gray-900 font-bold border-b-2 border-gray-900 pb-1">
                        Return to Shop <ArrowLeft className="w-4 h-4 ml-2" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10">
                {/* Back Link */}
                <button
                    onClick={() => navigate(-1)}
                    className="group flex items-center gap-3 text-gray-400 hover:text-gray-900 mb-12 transition-all font-bold text-sm tracking-widest uppercase"
                >
                    <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-gray-50 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span>Go Back</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Visual Section */}
                    <div className="lg:col-span-7">
                        <div className="sticky top-32 space-y-8">
                            <div className="relative aspect-[4/5] bg-[#F9F9F9] rounded-[3rem] overflow-hidden flex items-center justify-center p-12 sm:p-20 group">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-1000 ease-out"
                                />
                                {product.rating?.rate >= 4 && (
                                    <div className="absolute top-8 left-8 bg-black text-white px-5 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase">
                                        Editor's Choice
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Information Section */}
                    <div className="lg:col-span-5 flex flex-col pt-4">
                        <div className="flex-1">
                            {/* Brand / Category */}
                            <div className="mb-6">
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-3">{product.category}</p>
                                <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gray-900 tracking-tighter leading-[1.1]">
                                    {product.title}
                                </h1>
                            </div>

                            {/* Rating & Insights */}
                            <div className="flex items-center gap-6 mb-10 pb-8 border-b border-gray-100">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-3.5 h-3.5 ${i < Math.round(product.rating.rate)
                                                    ? 'fill-gray-900 text-gray-900'
                                                    : 'text-gray-200'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs font-bold text-gray-900">{product.rating.rate}</span>
                                </div>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.rating.count} Verified Reviews</span>
                            </div>

                            {/* Pricing */}
                            <div className="mb-10">
                                <div className="flex items-baseline gap-4 mb-2">
                                    <span className="text-5xl font-heading font-bold text-gray-900 tracking-tighter">
                                        ₹{product.price.toLocaleString()}
                                    </span>
                                    <span className="text-gray-400 text-sm font-medium">VAT Included</span>
                                </div>
                                <p className="text-emerald-600 text-xs font-bold tracking-wider uppercase">In Stock – Ready to Ship</p>
                            </div>

                            {/* Description */}
                            <div className="mb-12">
                                <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-[0.2em] mb-4">Insight</h3>
                                <p className="text-gray-500 text-lg font-light leading-relaxed tracking-tight underline-offset-8 decoration-gray-100 italic">
                                    "{product.description}"
                                </p>
                            </div>

                            {/* Selections Placeholder */}
                            <div className="space-y-10 mb-12">
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-widest">Quantity</h3>
                                    </div>
                                    <div className="inline-flex items-center bg-gray-50 rounded-2xl p-1.5 border border-gray-100 shadow-sm">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white text-gray-600 hover:text-gray-900 hover:shadow-md transition-all active:scale-95"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-14 text-center font-bold text-lg">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white text-gray-600 hover:text-gray-900 hover:shadow-md transition-all active:scale-95"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Actions */}
                        <div className="sticky bottom-10 space-y-6 pt-10 border-t border-gray-100 bg-white/80 backdrop-blur-md">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={handleBuyNow}
                                    className="flex-[3] bg-gray-900 text-white py-5 px-10 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-black hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 active:scale-95 shadow-lg flex items-center justify-center gap-3"
                                >
                                    <span>Buy Now</span>
                                    <ArrowLeft className="w-4 h-4 rotate-180" />
                                </button>
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-[2] bg-white border-2 border-gray-900 text-gray-900 py-5 px-10 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-3 group"
                                >
                                    <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    Add to Cart
                                </button>
                                <button
                                    onClick={handleWishlistToggle}
                                    className={`w-16 h-16 sm:w-20 sm:h-auto flex items-center justify-center rounded-2xl border-2 transition-all active:scale-90 ${isInWishlist
                                        ? 'border-red-500 bg-red-50 text-red-500'
                                        : 'border-gray-100 text-gray-300 hover:border-gray-900 hover:text-gray-900'
                                        }`}
                                >
                                    <Heart className={`w-6 h-6 ${isInWishlist ? 'fill-current' : ''}`} />
                                </button>
                            </div>

                            <div className="flex items-center justify-between py-6 px-10 bg-gray-50 rounded-3xl">
                                <div className="flex flex-col items-center gap-2 group cursor-help">
                                    <Truck className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-gray-900">Swift Ship</span>
                                </div>
                                <div className="w-[1px] h-8 bg-gray-200"></div>
                                <div className="flex flex-col items-center gap-2 group cursor-help">
                                    <RefreshCw className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-gray-900">30D Return</span>
                                </div>
                                <div className="w-[1px] h-8 bg-gray-200"></div>
                                <div className="flex flex-col items-center gap-2 group cursor-help">
                                    <Share2 className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-gray-900">Share</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FakestoreProductDetailsPage;
