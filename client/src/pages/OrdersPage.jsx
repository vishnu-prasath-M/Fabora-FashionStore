import { listMyOrders, cancelOrder } from '../redux/slices/orderSlice';
import Loader from '../components/Loader';
import { Package, XCircle, AlertCircle, ChevronRight, Calendar, ShoppingBag, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const OrdersPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const { userInfo } = useSelector((state) => state.auth);
    const { orders, loading } = useSelector((state) => state.order);

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            dispatch(listMyOrders());
        }
    }, [dispatch, navigate, userInfo]);

    const handleCancelClick = (orderId, itemId) => {
        setSelectedOrderId(orderId);
        setSelectedItemId(itemId);
        setShowCancelModal(true);
    };

    const confirmCancel = async () => {
        try {
            await dispatch(cancelOrder({ orderId: selectedOrderId, itemId: selectedItemId })).unwrap();
            toast.success('Item terminated successfully', {
                icon: '🛡️',
                style: {
                    borderRadius: '1rem',
                    background: '#111827',
                    color: '#fff',
                },
            });
            setShowCancelModal(false);
        } catch (err) {
            toast.error(err || 'Failed to process termination');
            setShowCancelModal(false);
        }
    };

    const isOrderFullyCancelled = (order) => {
        return (order.orderItems || []).every((i) => i && i.isCancelled);
    };

    const getStatusColor = (order) => {
        if (isOrderFullyCancelled(order)) return 'bg-red-50 text-red-600 border-red-100';
        if (order.isDelivered) return 'bg-emerald-50 text-emerald-600 border-emerald-100';
        return 'bg-blue-50 text-blue-600 border-blue-100';
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <Loader />
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FDFDFD] py-20">
            <div className="max-w-5xl mx-auto px-6 lg:px-10">
                {/* Header Section */}
                <div className="mb-16">
                    <div className="flex items-center gap-3 text-gray-400 uppercase tracking-[0.3em] text-[10px] font-bold mb-4">
                        <Package className="w-3 h-3" />
                        <span>Customer Account</span>
                    </div>
                    <h1 className="text-5xl font-heading font-bold text-gray-900 tracking-tighter mb-4">Purchase History</h1>
                    <p className="text-gray-500 font-light">Manage and track your premium fashion acquisitions.</p>
                </div>

                {orders && orders.length === 0 ? (
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 p-20 text-center shadow-sm">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
                            <ShoppingBag className="w-10 h-10 text-gray-300" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Your vault is empty</h2>
                        <p className="text-gray-500 mb-10 max-w-sm mx-auto">Explore our latest curated collections and start your journey into luxury fashion.</p>
                        <Link to="/shop" className="inline-flex items-center gap-2 bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-all hover:scale-105 shadow-xl shadow-gray-200">
                            Begin Exploration
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {(orders || []).filter(order => order && order._id).map((order) => (
                            <div key={order._id} className="group">
                                {/* Order Metadata Card */}
                                <div className={`bg-white rounded-[2.5rem] border overflow-hidden shadow-sm transition-all duration-500
                                    ${isOrderFullyCancelled(order) ? 'border-gray-100 opacity-70 grayscale' : 'border-gray-100 hover:shadow-xl hover:shadow-gray-100'}`}>
                                    {/* Order Upper Bar */}
                                    <div className={`px-10 py-8 border-b flex flex-col md:flex-row md:items-center justify-between gap-6
                                        ${isOrderFullyCancelled(order) ? 'bg-gray-50 border-gray-100 text-gray-400' : 'border-gray-50'}`}>
                                        <div className="flex items-center gap-8">
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Reference ID</p>
                                                <h3 className="text-sm font-mono font-bold text-gray-900">#{order._id.slice(-8).toUpperCase()}</h3>
                                            </div>
                                            <div className="w-px h-10 bg-gray-100 hidden sm:block"></div>
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Acquired On</p>
                                                <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                                                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                                    {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6">
                                            <div className={`px-5 py-2.5 rounded-full border text-[10px] font-bold uppercase tracking-widest ${getStatusColor(order)}`}>
                                                {order.isDelivered ? 'Delivered' : 'Processing'}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Items Section */}
                                    <div className="px-10 py-10">
                                        <div className="space-y-8">
                                            {(order.orderItems || []).filter(item => item).map((item, index) => (
                                                <div key={index} className={`flex flex-col sm:flex-row sm:items-center gap-8 group/item ${item.isCancelled ? 'opacity-70' : ''}`}>
                                                    <div className={`w-24 h-32 rounded-2xl overflow-hidden flex-shrink-0 border shadow-sm transition-transform duration-500 group-hover/item:scale-105
                                                        ${item.isCancelled ? 'bg-gray-100 border-gray-100' : 'bg-gray-50 border-gray-100'}`}>
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className={`text-xl font-heading font-bold mb-2 tracking-tight line-clamp-1 ${item.isCancelled ? 'text-gray-400' : 'text-gray-900'}`}>{item.name}</h4>
                                                        <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                                                            <span>PRICE: ₹{item.price.toLocaleString()}</span>
                                                            <span className="w-1 h-1 bg-gray-200 rounded-full self-center"></span>
                                                            <span>QTY: {item.qty} UNITS</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className={`text-xl font-heading font-bold mb-4 ${item.isCancelled ? 'text-gray-400' : 'text-gray-900'}`}>₹{(item.price * item.qty).toLocaleString()}</p>
                                                        {item.isCancelled ? (
                                                            <div className="w-full text-center">
                                                                <span className="text-red-500 font-bold text-sm uppercase tracking-widest">Item terminated successfully</span>
                                                            </div>
                                                        ) : !order.isDelivered && (
                                                            <button
                                                                onClick={() => handleCancelClick(order._id, item._id)}
                                                                disabled={loading && selectedOrderId === order._id && selectedItemId === item._id}
                                                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border font-bold text-[10px] uppercase tracking-widest transition-all
                                                                    ${loading && selectedOrderId === order._id && selectedItemId === item._id
                                                                        ? 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed opacity-60'
                                                                        : 'bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-600 border-gray-100 hover:border-red-100'}`}
                                                                title="Cancel Item"
                                                            >
                                                                <XCircle className="w-3.5 h-3.5" />
                                                                <span>{loading && selectedOrderId === order._id && selectedItemId === item._id ? 'Cancelling...' : 'Cancel Item'}</span>
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Footer Section */}
                                    <div className={`px-10 py-8 border-t flex flex-col sm:flex-row items-center justify-between gap-6
                                        ${isOrderFullyCancelled(order) ? 'bg-gray-50 border-gray-100 text-gray-400' : 'bg-gray-50/50 border-gray-50'}`}>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Financial Summary</p>
                                            <div className="flex items-baseline gap-2">
                                                <span className={`text-2xl font-heading font-bold ${isOrderFullyCancelled(order) ? 'text-gray-400' : 'text-gray-900'}`}>₹{(order.totalPrice || 0).toLocaleString()}</span>
                                                <span className="text-xs font-bold text-gray-400">TOTAL</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 w-full sm:w-auto">
                                            <Link
                                                to={`/order-success/${order._id}`}
                                                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white border border-gray-200 rounded-2xl text-xs font-bold uppercase tracking-widest text-gray-900 hover:border-gray-900 transition-all duration-300 shadow-sm"
                                            >
                                                Detailed Report
                                                <ChevronRight className="w-3.5 h-3.5" />
                                            </Link>
                                            <button className="hidden sm:flex w-12 h-12 bg-gray-900 rounded-2xl items-center justify-center text-white hover:bg-black transition-all hover:translate-x-1">
                                                <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Premium Cancellation Modal */}
            {showCancelModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-xl transition-all duration-500 animate-in fade-in">
                    <div className="bg-white rounded-[3rem] shadow-2xl p-12 max-w-sm w-full transform transition-all duration-500 animate-in zoom-in-95 scale-100 border border-gray-100">
                        <div className="text-center">
                            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-white shadow-lg">
                                <AlertCircle className="w-10 h-10 text-red-500" />
                            </div>
                            <h2 className="text-3xl font-heading font-bold mb-4 text-gray-900 tracking-tighter leading-tight">Terminate Acquisition?</h2>
                            <p className="text-gray-500 mb-10 leading-relaxed font-light text-lg tracking-tight underline-offset-4 decoration-gray-100">
                                This action will permanently cancel the selected acquisition. Are you absolutely certain?
                            </p>
                            <div className="flex flex-col gap-4">
                                <button
                                    onClick={confirmCancel}
                                    disabled={loading}
                                    className={`w-full px-8 py-4 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all shadow-xl
                                        ${loading ? 'bg-red-300 text-white cursor-not-allowed shadow-red-100' : 'bg-red-500 text-white hover:bg-red-600 shadow-red-200'}`}
                                >
                                    {loading ? 'Processing...' : 'Yes'}
                                </button>
                                <button
                                    onClick={() => setShowCancelModal(false)}
                                    className="w-full px-8 py-4 rounded-2xl bg-gray-50 text-gray-900 text-sm font-bold uppercase tracking-widest hover:bg-gray-100 transition-all"
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrdersPage;
