import { ArrowLeft, ShieldCheck, CreditCard, Banknote, Smartphone } from 'lucide-react';
import SuccessModal from '../components/SuccessModal';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../redux/slices/orderSlice';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

const OrderingPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'upi', 'cod'

    // Calculate totals
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shipping = 0; // Free delivery
    const gstRate = 0.18;
    const gst = subtotal * gstRate;
    const total = subtotal + shipping + gst;

    const handlePayNow = () => {
        dispatch(createOrder({
            orderItems: cartItems.map(item => ({
                name: item.name,
                qty: item.qty,
                image: item.image,
                price: item.price,
                product: item.product
            })),
            shippingAddress: {
                address: '123 Fashion St',
                city: 'Chennai',
                postalCode: '600001',
                country: 'India'
            },
            paymentMethod: paymentMethod === 'card' ? 'Card' : paymentMethod,
            itemsPrice: subtotal,
            shippingPrice: shipping,
            taxPrice: gst,
            totalPrice: total
        }));
        setShowSuccessModal(true);
    };

    const handleModalClose = () => {
        setShowSuccessModal(false);
        navigate('/orders');
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                    <Link to="/shop" className="btn-primary">
                        Go to Shop
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fafafa] py-12">
            <SuccessModal
                isOpen={showSuccessModal}
                onClose={handleModalClose}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <button
                    onClick={() => navigate('/cart')}
                    className="group flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Cart
                </button>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Side: Details & Payment */}
                    <div className="flex-1 space-y-8">
                        <div>
                            <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2">Checkout</h1>
                            <p className="text-gray-500">Complete your purchase securely.</p>
                        </div>

                        {/* Order Items Preview */}
                        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm">1</span>
                                Order Review
                            </h2>
                            <div className="space-y-6">
                                {cartItems.map((item) => (
                                    <div key={item.product} className="flex gap-6 items-center">
                                        <div className="w-20 h-24 bg-gray-100 rounded-xl overflow-hidden shadow-inner flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900">{item.name}</h3>
                                            <p className="text-sm text-gray-500 mt-1">Qty: {item.qty} &times; ${item.price}</p>
                                        </div>
                                        <p className="font-bold text-gray-900">${(item.price * item.qty).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Payment Method Selection */}
                        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm">2</span>
                                Payment Method
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                <button
                                    onClick={() => setPaymentMethod('card')}
                                    className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-3 transition-all ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200'}`}
                                >
                                    <CreditCard className={`w-8 h-8 ${paymentMethod === 'card' ? 'text-primary' : 'text-gray-400'}`} />
                                    <span className={`font-semibold ${paymentMethod === 'card' ? 'text-primary' : 'text-gray-600'}`}>Card</span>
                                </button>
                                <button
                                    disabled
                                    className="p-4 rounded-xl border-2 border-gray-100 bg-gray-50 flex flex-col items-center justify-center gap-3 opacity-60 cursor-not-allowed group relative"
                                >
                                    <Smartphone className="w-8 h-8 text-gray-400" />
                                    <span className="font-semibold text-gray-500">UPI</span>
                                    <span className="absolute bottom-2 text-[10px] text-red-500 font-bold">Not Supported Now</span>
                                </button>
                                <button
                                    disabled
                                    className="p-4 rounded-xl border-2 border-gray-100 bg-gray-50 flex flex-col items-center justify-center gap-3 opacity-60 cursor-not-allowed group relative"
                                >
                                    <Banknote className="w-8 h-8 text-gray-400" />
                                    <span className="font-semibold text-gray-500">COD</span>
                                    <span className="absolute bottom-2 text-[10px] text-red-500 font-bold">Not Supported Now</span>
                                </button>
                            </div>

                            {/* Credit Card Form (Visual Only) */}
                            {paymentMethod === 'card' && (
                                <div className="space-y-6 animate-fade-in">
                                    <div className="relative">
                                        <input type="text" placeholder="Card Number" className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono" />
                                        <CreditCard className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <input type="text" placeholder="MM / YY" className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono" />
                                        <input type="text" placeholder="CVC" className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono" />
                                    </div>
                                    <input type="text" placeholder="Card Holder Name" className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Side: Summary Sticky */}
                    <div className="lg:w-96">
                        <div className="bg-gray-900 rounded-2xl p-8 text-white sticky top-8 shadow-xl">
                            <h2 className="text-2xl font-bold mb-8">Summary</h2>

                            <div className="space-y-4 mb-8 text-gray-300">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="text-white font-mono">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="text-green-400">Free</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>GST (18%)</span>
                                    <span className="text-white font-mono">${gst.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="border-t border-white/10 pt-6 mb-8 flex justify-between items-center">
                                <span className="text-lg font-bold">Total</span>
                                <span className="text-3xl font-bold font-mono">${total.toFixed(2)}</span>
                            </div>

                            <button
                                onClick={handlePayNow}
                                className="w-full bg-white text-gray-900 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 group"
                            >
                                Pay Now
                                <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <div className="mt-6 flex items-center justify-center gap-2 text-white/50 text-xs">
                                <ShieldCheck className="w-4 h-4" />
                                <span>256-bit SSL Secured Payment</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderingPage;
