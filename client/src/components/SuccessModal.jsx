import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/slices/cartSlice';

const SuccessModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isOpen) {
            // Auto redirect after 3 seconds
            const timer = setTimeout(() => {
                handleClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleClose = () => {
        dispatch(clearCart());
        onClose();
        navigate('/orders');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full transform transition-all scale-100 animate-in fade-in zoom-in duration-300">
                <div className="text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-10 h-10 text-green-600 animate-[bounce_1s_ease-in-out_infinite]" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Payment Successful!
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Your order has been placed successfully.
                    </p>

                    <button
                        onClick={handleClose}
                        className="w-full btn-primary py-3 rounded-xl font-semibold shadow-lg shadow-primary/20"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;
