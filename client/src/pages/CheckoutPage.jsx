import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, resetOrder } from '../redux/slices/orderSlice';
import { clearCart } from '../redux/slices/cartSlice';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);
    const { success, order } = useSelector((state) => state.order);

    const [shippingAddress, setShippingAddress] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: '',
    });

    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        }
        if (cartItems.length === 0) {
            navigate('/cart');
        }
    }, [userInfo, cartItems, navigate]);

    useEffect(() => {
        if (success && order) {
            setShowSuccess(true);
            dispatch(clearCart());
            // allow the modal to show while still keeping order in store for OrdersPage fetch
            const t = setTimeout(() => {
                dispatch(resetOrder());
                navigate('/shop');
            }, 2000);
            return () => clearTimeout(t);
        }
    }, [success, order, navigate, dispatch]);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shipping = 0; // Free delivery
    const tax = subtotal * 0.18; // GST 18%
    const total = subtotal + shipping + tax;

    const placeOrderHandler = () => {
        if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.country) {
            toast.error('Please fill in all shipping address fields');
            return;
        }

        dispatch(
            createOrder({
                orderItems: cartItems,
                shippingAddress,
                paymentMethod,
                itemsPrice: subtotal,
                shippingPrice: shipping,
                taxPrice: tax,
                totalPrice: total,
            })
        );
    };

    return (
        <>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-heading font-bold text-secondary mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Checkout Form */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Shipping Address */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-2xl font-heading font-bold mb-6">Shipping Address</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Street Address
                                </label>
                                <input
                                    type="text"
                                    value={shippingAddress.address}
                                    onChange={(e) =>
                                        setShippingAddress({ ...shippingAddress, address: e.target.value })
                                    }
                                    className="input-field"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                <input
                                    type="text"
                                    value={shippingAddress.city}
                                    onChange={(e) =>
                                        setShippingAddress({ ...shippingAddress, city: e.target.value })
                                    }
                                    className="input-field"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Postal Code
                                </label>
                                <input
                                    type="text"
                                    value={shippingAddress.postalCode}
                                    onChange={(e) =>
                                        setShippingAddress({ ...shippingAddress, postalCode: e.target.value })
                                    }
                                    className="input-field"
                                    required
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                                <input
                                    type="text"
                                    value={shippingAddress.country}
                                    onChange={(e) =>
                                        setShippingAddress({ ...shippingAddress, country: e.target.value })
                                    }
                                    className="input-field"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-2xl font-heading font-bold mb-6">Payment Method</h2>
                        <div className="space-y-3">
                            <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-primary transition-colors">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="PayPal"
                                    checked={paymentMethod === 'PayPal'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="w-5 h-5 text-primary"
                                />
                                <span className="font-medium">PayPal or Credit Card</span>
                            </label>
                            <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-primary transition-colors">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="Stripe"
                                    checked={paymentMethod === 'Stripe'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="w-5 h-5 text-primary"
                                />
                                <span className="font-medium">Stripe</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                        <h2 className="text-2xl font-heading font-bold mb-6">Order Summary</h2>

                        <div className="space-y-4 mb-6">
                            {cartItems.map((item) => (
                                <div key={item.product} className="flex gap-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <p className="font-semibold text-sm">{item.name}</p>
                                        <p className="text-gray-600 text-sm">
                                            {item.qty} x ₹{item.price}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4 space-y-3 mb-6">
                            <div className="flex justify-between">
                                <span className="text-gray-600">List Price</span>
                                <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Delivery</span>
                                <span className="font-semibold">FREE</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">GST (18%)</span>
                                <span className="font-semibold">₹{tax.toFixed(2)}</span>
                            </div>
                            <div className="border-t pt-3 flex justify-between text-xl font-bold">
                                <span>Total</span>
                                <span className="text-primary">₹{total.toFixed(2)}</span>
                            </div>
                        </div>

                        <button onClick={placeOrderHandler} className="w-full btn-primary">
                            Pay Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
        {/* Success Modal */}
        {showSuccess && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="bg-white rounded-2xl shadow-xl p-8 w-[90%] max-w-sm text-center">
                    <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                        <svg className="w-10 h-10 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path className="animate-[dash_0.6s_ease-in-out_forwards]" d="M20 6L9 17l-5-5" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-1">Order Placed Successfully</h3>
                    <p className="text-gray-600 mb-4">Redirecting to shop...</p>
                    <style>{`@keyframes dash{to{stroke-dashoffset:0}} svg path{stroke-dasharray:40;stroke-dashoffset:40}`}</style>
                </div>
            </div>
        )}
        </>
    );
};

export default CheckoutPage;
