import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, addToCart } from '../redux/slices/cartSlice';
import { Trash2, Plus, Minus } from 'lucide-react';

const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartItems } = useSelector((state) => state.cart);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const updateQuantity = (item, newQty) => {
        dispatch(
            addToCart({
                ...item,
                qty: newQty,
            })
        );
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    const checkoutHandler = () => {
        navigate('/ordering');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-heading font-bold text-secondary mb-8">Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-lg mb-6">Your cart is empty</p>
                    <Link to="/shop" className="btn-primary">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div
                                key={item.product}
                                className="bg-white rounded-lg shadow-sm p-6 flex flex-col sm:flex-row gap-6"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full sm:w-32 h-40 object-cover rounded-lg"
                                />

                                <div className="flex-1">
                                    <Link
                                        to={`/product/${item.product}`}
                                        className="text-xl font-semibold hover:text-primary transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                    {item.size && <p className="text-gray-600 mt-1">Size: {item.size}</p>}
                                    {item.color && <p className="text-gray-600">Color: {item.color}</p>}
                                    <p className="text-2xl font-bold text-primary mt-2">${item.price}</p>

                                    <div className="flex items-center gap-4 mt-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateQuantity(item, Math.max(1, item.qty - 1))}
                                                className="p-1 rounded border-2 border-gray-200 hover:border-primary transition-colors"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-12 text-center font-semibold">{item.qty}</span>
                                            <button
                                                onClick={() =>
                                                    updateQuantity(item, Math.min(item.countInStock, item.qty + 1))
                                                }
                                                className="p-1 rounded border-2 border-gray-200 hover:border-primary transition-colors"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeFromCartHandler(item.product)}
                                            className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-2"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                            <h2 className="text-2xl font-heading font-bold mb-6">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-semibold">
                                        {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tax</span>
                                    <span className="font-semibold">${tax.toFixed(2)}</span>
                                </div>
                                <div className="border-t pt-3 flex justify-between text-xl font-bold">
                                    <span>Total</span>
                                    <span className="text-primary">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <button onClick={checkoutHandler} className="w-full btn-primary">
                                Proceed to Checkout
                            </button>

                            <Link
                                to="/shop"
                                className="block text-center text-primary hover:underline mt-4"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
