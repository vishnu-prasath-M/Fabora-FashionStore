import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../redux/slices/wishlistSlice';
import toast from 'react-hot-toast';

/**
 * Compact Universal Product Card Component
 * Smaller, denser design for fashion eCommerce
 * Works with both FakeStore API and backend products
 */
const ProductCard = ({ product, isFakestoreProduct = false }) => {
    const dispatch = useDispatch();
    const { wishlistItems } = useSelector((state) => state.wishlist);

    // Normalize product data structure
    const productId = isFakestoreProduct ? product.id : product._id;
    const productName = isFakestoreProduct ? product.title : product.name;
    const productImage = product.image;
    const productPrice = product.price;
    const productCategory = product.category;
    const productOldPrice = product.oldPrice || null;
    const productStock = product.countInStock || 999;

    const isInWishlist = wishlistItems.some((item) =>
        isFakestoreProduct ? item.id === productId : item._id === productId
    );

    const handleAddToCart = () => {
        if (isFakestoreProduct) {
            toast.error('Please view product details to add to cart');
            return;
        }

        dispatch(
            addToCart({
                product: productId,
                name: productName,
                image: productImage,
                price: productPrice,
                countInStock: productStock,
                qty: 1,
            })
        );
        toast.success('Added to cart!');
    };

    const handleWishlistToggle = () => {
        if (isInWishlist) {
            dispatch(removeFromWishlist(productId));
            toast.success('Removed from wishlist');
        } else {
            const wishlistItem = isFakestoreProduct
                ? { id: productId, title: productName, image: productImage, price: productPrice, category: productCategory }
                : product;
            dispatch(addToWishlist(wishlistItem));
            toast.success('Added to wishlist!');
        }
    };

    const productLink = isFakestoreProduct
        ? `/fakestore-product/${productId}`
        : `/product/${productId}`;

    return (
        <div className="group relative bg-white rounded-2xl border border-gray-100/50 hover:border-transparent hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 h-full flex flex-col overflow-hidden">
            <div className="relative overflow-hidden aspect-[3/4] bg-gray-50">
                <Link to={productLink} className="block w-full h-full">
                    <img
                        src={productImage}
                        alt={productName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Badge Container */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {productOldPrice && (
                            <div className="bg-red-500 text-white px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full shadow-sm">
                                -{Math.round(((productOldPrice - productPrice) / productOldPrice) * 100)}%
                            </div>
                        )}
                        {isFakestoreProduct && (
                            <div className="bg-white/90 backdrop-blur-md text-gray-900 px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full shadow-sm border border-gray-100">
                                New Arrival
                            </div>
                        )}
                    </div>
                </Link>

                {/* Quick Action Overlay */}
                <div className="absolute top-4 right-4 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 flex flex-col gap-2">
                    <button
                        onClick={(e) => { e.preventDefault(); handleWishlistToggle(); }}
                        className={`p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-100 hover:bg-white transition-all ${isInWishlist ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                        title="Add to Wishlist"
                    >
                        <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
                    </button>
                    {!isFakestoreProduct && (
                        <button
                            onClick={(e) => { e.preventDefault(); handleAddToCart(); }}
                            disabled={productStock === 0}
                            className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-100 hover:bg-gray-900 hover:text-white transition-all disabled:opacity-50"
                            title="Add to Cart"
                        >
                            <ShoppingCart className="w-4 h-4" />
                        </button>
                    )}
                    <Link
                        to={productLink}
                        className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-100 hover:bg-gray-900 hover:text-white transition-all"
                        onClick={(e) => e.stopPropagation()}
                        title="Quick View"
                    >
                        <Eye className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            <div className="p-6 flex-1 flex flex-col bg-white">
                <div className="mb-auto">
                    <p className="text-[11px] text-primary/60 font-bold uppercase tracking-[0.2em] mb-2">{productCategory}</p>
                    <Link to={productLink}>
                        <h3 className="font-heading font-semibold text-[16px] text-gray-900 mb-3 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                            {productName}
                        </h3>
                    </Link>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-gray-900">₹{productPrice.toLocaleString()}</span>
                        {productOldPrice && (
                            <span className="text-sm text-gray-400 line-through font-light">
                                ₹{productOldPrice.toLocaleString()}
                            </span>
                        )}
                    </div>

                    {/* Desktop Button - Subtle underline trigger */}
                    <Link
                        to={productLink}
                        className="text-[11px] font-bold uppercase tracking-wider text-gray-400 group-hover:text-gray-900 border-b border-transparent group-hover:border-gray-900 transition-all py-1 hidden sm:block"
                    >
                        Discover
                    </Link>
                </div>

                {!isFakestoreProduct && productStock === 0 && (
                    <div className="mt-4 flex items-center gap-2 text-red-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                        <p className="text-[10px] font-bold uppercase tracking-widest">Out of Stock</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
