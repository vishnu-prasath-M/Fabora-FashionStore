import { X } from 'lucide-react';
import { useState } from 'react';

const AddressModal = ({ isOpen, onClose, onSave, initialAddress = null }) => {
    const [address, setAddress] = useState(
        initialAddress || {
            street: '',
            city: '',
            postalCode: '',
            country: '',
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(address);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <X className="w-6 h-6" />
                </button>

                <h2 className="text-2xl font-heading font-bold mb-6">
                    {initialAddress ? 'Edit Address' : 'Add New Address'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Street Address
                        </label>
                        <input
                            type="text"
                            value={address.street}
                            onChange={(e) => setAddress({ ...address, street: e.target.value })}
                            required
                            className="input-field"
                            placeholder="123 Main St"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                        <input
                            type="text"
                            value={address.city}
                            onChange={(e) => setAddress({ ...address, city: e.target.value })}
                            required
                            className="input-field"
                            placeholder="New York"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Postal Code
                        </label>
                        <input
                            type="text"
                            value={address.postalCode}
                            onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                            required
                            className="input-field"
                            placeholder="10001"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                        <input
                            type="text"
                            value={address.country}
                            onChange={(e) => setAddress({ ...address, country: e.target.value })}
                            required
                            className="input-field"
                            placeholder="United States"
                        />
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 btn-outline">
                            Cancel
                        </button>
                        <button type="submit" className="flex-1 btn-primary">
                            Save Address
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddressModal;
