import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import Loader from '../components/Loader';
import { ShoppingCart, Heart, Minus, Plus, ChevronLeft, Share2, Star } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [qty, setQty] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    const { product, loading } = useSelector((state) => state.product);
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(listProductDetails(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (product.sizes && product.sizes.length > 0) {
            setSelectedSize(product.sizes[0]);
        }
        if (product.colors && product.colors.length > 0) {
            setSelectedColor(product.colors[0]);
        }
    }, [product]);

    const addToCartHandler = () => {
        dispatch(
            addToCart({
                product: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                countInStock: product.countInStock,
                qty: Math.max(1, qty || 1),
                size: selectedSize,
                color: selectedColor,
            })
        );
        toast.success('Added to cart!');
    };

    const buyNowHandler = () => {
        addToCartHandler();
        // Requirement: Buy Now should redirect DIRECTLY to Ordering page
        navigate('/ordering');
    };

    if (loading) return <Loader />;

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10">
                {/* Back Link */}
                <button
                    onClick={() => navigate(-1)}
                    className="group flex items-center gap-3 text-gray-400 hover:text-gray-900 mb-12 transition-all font-bold text-sm tracking-widest uppercase"
                >
                    <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-gray-50 transition-colors">
                        <ChevronLeft className="w-4 h-4" />
                    </div>
                    <span>Go Back</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Visual Section */}
                    <div className="lg:col-span-7">
                        <div className="sticky top-32 space-y-8">
                            <div className="relative aspect-[4/5] bg-[#F9F9F9] rounded-[3rem] overflow-hidden group shadow-sm">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                                />
                                <div className="absolute top-8 left-8 bg-black text-white px-5 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase">
                                    {product.brand || 'Original Piece'}
                                </div>
                            </div>

                            {/* Secondary Gallery */}
                            {product.images && product.images.length > 0 && (
                                <div className="grid grid-cols-4 gap-4">
                                    {product.images.map((img, idx) => (
                                        <button key={idx} className="aspect-square rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-900 transition-all p-2 bg-[#F9F9F9]">
                                            <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-contain mix-blend-multiply" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Information Section */}
                    <div className="lg:col-span-5 flex flex-col pt-4">
                        <div className="flex-1">
                            {/* Brand / Title */}
                            <div className="mb-6">
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-3">{product.category}</p>
                                <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gray-900 tracking-tighter leading-[1.1]">
                                    {product.name}
                                </h1>
                            </div>

                            {/* Rating & Social Proof */}
                            <div className="flex items-center gap-6 mb-10 pb-8 border-b border-gray-100">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-3.5 h-3.5 ${i < Math.round(product.rating || 5)
                                                    ? 'fill-gray-900 text-gray-900'
                                                    : 'text-gray-200'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs font-bold text-gray-900">{product.rating || 5.0}</span>
                                </div>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.numReviews} Verified Reviews</span>
                            </div>

                            {/* Pricing */}
                            <div className="mb-10">
                                <div className="flex items-baseline gap-4 mb-2">
                                    <span className="text-5xl font-heading font-bold text-gray-900 tracking-tighter">
                                        ₹{product.price?.toLocaleString()}
                                    </span>
                                    {product.oldPrice && (
                                        <span className="text-2xl text-gray-300 line-through font-light italic decoration-gray-200">
                                            ₹{product.oldPrice.toLocaleString()}
                                        </span>
                                    )}
                                </div>
                                <p className="text-emerald-600 text-xs font-bold tracking-wider uppercase">Available for immediate delivery</p>
                            </div>

                            {/* Selections Group */}
                            <div className="space-y-12 mb-12">
                                {/* Size Selection */}
                                {product.sizes && product.sizes.length > 0 && (
                                    <div>
                                        <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-widest mb-5">Select Size</h3>
                                        <div className="flex flex-wrap gap-3">
                                            {product.sizes.map((size) => (
                                                <button
                                                    key={size}
                                                    onClick={() => setSelectedSize(size)}
                                                    className={`h-14 w-14 flex items-center justify-center rounded-2xl font-bold text-sm transition-all ${selectedSize === size
                                                        ? 'bg-gray-900 text-white shadow-xl scale-105'
                                                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                                                        }`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Color Selection */}
                                {product.colors && product.colors.length > 0 && (
                                    <div>
                                        <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-widest mb-5">Select Tone</h3>
                                        <div className="flex flex-wrap gap-4">
                                            {product.colors.map((color) => (
                                                <button
                                                    key={color}
                                                    onClick={() => setSelectedColor(color)}
                                                    className={`group relative flex flex-col items-center gap-2 transition-all p-1`}
                                                >
                                                    <div className={`w-10 h-10 rounded-full border-2 p-0.5 transition-all ${selectedColor === color ? 'border-gray-900' : 'border-transparent'}`}>
                                                        <div className={`w-full h-full rounded-full border border-gray-100 shadow-inner group-hover:scale-90 transition-transform`} style={{ backgroundColor: color.toLowerCase() }}></div>
                                                    </div>
                                                    <span className={`text-[9px] font-bold uppercase tracking-widest transition-opacity ${selectedColor === color ? 'opacity-100' : 'opacity-0'}`}>
                                                        {color}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Quantity Selector */}
                                <div>
                                    <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-widest mb-5">Units</h3>
                                    <div className="inline-flex items-center bg-gray-50 rounded-2xl p-1.5 border border-gray-100 shadow-sm">
                                        <button
                                            onClick={() => setQty(Math.max(1, qty - 1))}
                                            className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white text-gray-600 hover:text-gray-900 hover:shadow-md transition-all active:scale-95"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-14 text-center font-bold text-lg">{qty}</span>
                                        <button
                                            onClick={() => setQty(Math.min(product.countInStock, qty + 1))}
                                            className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white text-gray-600 hover:text-gray-900 hover:shadow-md transition-all active:scale-95"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Summary & Purchase Actions */}
                        <div className="sticky bottom-10 space-y-8 pt-10 border-t border-gray-100 bg-white/80 backdrop-blur-md">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={buyNowHandler}
                                    disabled={product.countInStock === 0}
                                    className="flex-[3] bg-gray-900 text-white py-5 px-10 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-black hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 disabled:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg flex items-center justify-center gap-3 active:scale-95"
                                >
                                    <span>Initiate Checkout</span>
                                    <ShoppingCart className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => {
                                        addToCartHandler();
                                        navigate('/cart');
                                    }}
                                    disabled={product.countInStock === 0}
                                    className="flex-[2] bg-white border-2 border-gray-900 text-gray-900 py-5 px-10 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none active:scale-95"
                                >
                                    <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    Bag It
                                </button>
                                <button className="w-16 h-16 sm:w-20 sm:h-auto flex items-center justify-center rounded-2xl border-2 border-gray-100 text-gray-300 hover:border-gray-900 hover:text-gray-900 transition-all active:scale-90 group">
                                    <Heart className="w-6 h-6 group-hover:fill-current" />
                                </button>
                            </div>

                            {/* Service Badges */}
                            <div className="flex items-center justify-between py-6 px-10 bg-[#FBFBFB] rounded-3xl border border-gray-50">
                                <div className="flex flex-col items-center gap-2 group cursor-help">
                                    <Truck className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-gray-900">Globally Linked</span>
                                </div>
                                <div className="w-[1px] h-8 bg-gray-200/50"></div>
                                <div className="flex flex-col items-center gap-2 group cursor-help">
                                    <RefreshCw className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-gray-900">Lifetime Care</span>
                                </div>
                                <div className="w-[1px] h-8 bg-gray-200/50"></div>
                                <div className="flex flex-col items-center gap-2 group cursor-help">
                                    <Share2 className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-gray-900">Insight</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
