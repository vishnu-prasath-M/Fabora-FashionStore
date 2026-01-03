import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromWishlist } from '../redux/slices/wishlistSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { Trash2, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

const WishlistPage = () => {
    const dispatch = useDispatch();
    const { wishlistItems } = useSelector((state) => state.wishlist);

    const handleRemove = (id) => {
        dispatch(removeFromWishlist(id));
        toast.success('Removed from wishlist');
    };

    const handleAddToCart = (item) => {
        dispatch(
            addToCart({
                product: item._id,
                name: item.name,
                image: item.image,
                price: item.price,
                countInStock: item.countInStock,
                qty: 1,
            })
        );
        toast.success('Added to cart!');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-heading font-bold text-secondary mb-8">My Wishlist</h1>

            {wishlistItems.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-lg mb-6">Your wishlist is empty</p>
                    <Link to="/shop" className="btn-primary">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {wishlistItems.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                            <Link to={`/product/${item._id}`}>
                                <div className="relative overflow-hidden aspect-[3/4]">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                            </Link>

                            <div className="p-4">
                                <Link to={`/product/${item._id}`}>
                                    <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors">
                                        {item.name}
                                    </h3>
                                </Link>
                                <p className="text-gray-500 text-sm mb-2">{item.category}</p>
                                <p className="text-xl font-bold text-primary mb-4">₹{item.price}</p>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleAddToCart(item)}
                                        disabled={item.countInStock === 0}
                                        className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:bg-gray-300"
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={() => handleRemove(item._id)}
                                        className="p-2 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>

                                {item.countInStock === 0 && (
                                    <p className="text-red-500 text-sm mt-2">Out of Stock</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;
