import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../redux/slices/orderSlice';
import { CheckCircle } from 'lucide-react';
import Loader from '../components/Loader';

const OrderSuccessPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { order, loading } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(getOrderDetails(id));
    }, [dispatch, id]);

    if (loading) return <Loader />;

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h1 className="text-4xl font-heading font-bold text-secondary mb-2">
                    Order Placed Successfully!
                </h1>
                <p className="text-gray-600">
                    Thank you for your purchase. Your order has been confirmed.
                </p>
            </div>

            {order && (
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="mb-6 pb-6 border-b">
                        <h2 className="text-xl font-semibold mb-2">Order #{order._id}</h2>
                        <p className="text-gray-600">
                            Placed on {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-semibold text-lg mb-3">Shipping Address</h3>
                        <p className="text-gray-700">
                            {order.shippingAddress?.address}<br />
                            {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}<br />
                            {order.shippingAddress?.country}
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-semibold text-lg mb-3">Order Items</h3>
                        <div className="space-y-3">
                            {order.orderItems?.map((item, index) => (
                                <div key={index} className="flex gap-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-gray-600 text-sm">
                                            {item.qty} x ${item.price}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-semibold">${order.itemsPrice?.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Shipping</span>
                            <span className="font-semibold">${order.shippingPrice?.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Tax</span>
                            <span className="font-semibold">${order.taxPrice?.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold pt-2 border-t">
                            <span>Total</span>
                            <span className="text-primary">${order.totalPrice?.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                        <Link to="/orders" className="flex-1 btn-primary text-center">
                            View All Orders
                        </Link>
                        <Link to="/shop" className="flex-1 btn-outline text-center">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderSuccessPage;
